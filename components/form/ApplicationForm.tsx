"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { campusOptions, getProgram, houses, type ProgramId } from "@/content/programs";
import { microcopy } from "@/content/microcopy";
import { whatsappLink } from "@/content/site";
import { BOARDS, ageOptions, buildSchemas, errorMap, gradeOptions, STUDENT_FIELDS } from "@/lib/schema";
import { generateLeadId } from "@/lib/leadId";
import { metaCookies, readAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckboxField, SelectField, TextField } from "./fields";

type Values = {
  student_name: string;
  age: string;
  grade: string;
  school: string;
  board: string;
  city: string;
  preferred_campus: string;
  friends: string;
  parent_name: string;
  parent_whatsapp: string;
  parent_email: string;
  consent: boolean;
};

const EMPTY: Values = {
  student_name: "",
  age: "",
  grade: "",
  school: "",
  board: "",
  city: "",
  preferred_campus: "",
  friends: "",
  parent_name: "",
  parent_whatsapp: "",
  parent_email: "",
  consent: false,
};

type Field = keyof Values;
const f = microcopy.form;

export interface ApplicationFormProps {
  /** apply: Summer 2027 programs. booking: the Hackathon. */
  mode: "apply" | "booking";
  /** Preset program (landing pages). Hidden from the user. */
  programId?: ProgramId;
  /** /apply: let the student pick a house first */
  showHousePicker?: boolean;
  initialHouse?: ProgramId;
}

export function ApplicationForm({ mode, programId: preset, showHousePicker = false, initialHouse }: ApplicationFormProps) {
  const router = useRouter();
  const draftKey = `bo_draft_${preset ?? "apply"}`;
  const [programId, setProgramId] = useState<ProgramId | null>(preset ?? initialHouse ?? null);
  const program = getProgram(programId);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const leadIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const restored = useRef(false);

  const schemas = useMemo(() => (program ? buildSchemas(program) : null), [program]);
  const campuses = program ? campusOptions(program) : [];
  const isHackathon = program?.id === "hackathon";

  // Restore a draft so a refresh or failed step never loses data. Consent is never restored.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        setValues({ ...EMPTY, ...d.values, consent: false });
        if (!preset && d.programId && getProgram(d.programId)) setProgramId(d.programId);
        if (d.leadId) leadIdRef.current = d.leadId;
      }
    } catch {
      /* ignore */
    }
    restored.current = true;
  }, [draftKey, preset]);

  useEffect(() => {
    if (!restored.current) return;
    try {
      const { consent: _c, ...rest } = values;
      void _c;
      sessionStorage.setItem(draftKey, JSON.stringify({ values: rest, programId, leadId: leadIdRef.current }));
    } catch {
      /* ignore */
    }
  }, [values, programId, draftKey]);

  const set = (k: Field) => (v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateOne = (k: Field) => {
    if (!schemas) return;
    const obj = (STUDENT_FIELDS as readonly string[]).includes(k) ? schemas.student : schemas.parent;
    const shape = obj.shape as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }>;
    const fieldSchema = shape[k];
    if (!fieldSchema) return;
    const r = fieldSchema.safeParse(values[k]);
    setErrors((e) => ({ ...e, [k]: r.success ? "" : (r.error?.issues[0]?.message ?? "") }));
  };
  const blur = (k: Field) => () => {
    if (values[k] !== "" && values[k] !== false) validateOne(k);
  };

  const focusFirstError = (errs: Record<string, string>) => {
    requestAnimationFrame(() => {
      const first = Object.keys(errs).find((k) => errs[k]);
      if (!first) return;
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const choosePlan = (id: ProgramId) => {
    setProgramId(id);
    setErrors((e) => ({ ...e, house: "" }));
    const p = getProgram(id);
    if (!p) return;
    setValues((s) => ({
      ...s,
      age: ageOptions(p).includes(s.age) ? s.age : "",
      grade: gradeOptions(p).includes(s.grade) ? s.grade : "",
      preferred_campus: campusOptions(p).includes(s.preferred_campus) ? s.preferred_campus : "",
    }));
  };

  const goNext = () => {
    if (!program || !schemas) {
      const errs = { house: f.errors.house };
      setErrors(errs);
      return;
    }
    const r = schemas.student.safeParse(values);
    if (!r.success) {
      const errs = errorMap(r.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setErrors({});
    setStep(2);
    scrollToForm();
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="parent_name"]')?.focus());
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) return goNext();
    if (!program || !schemas || status === "sending") return;

    const r = schemas.parent.safeParse(values);
    if (!r.success) {
      const errs = errorMap(r.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    if (!leadIdRef.current) leadIdRef.current = generateLeadId();
    const leadId = leadIdRef.current;
    const attr = readAttribution();
    const cookies = metaCookies();

    const payload = {
      ...values,
      preferred_campus: campuses.length ? values.preferred_campus : "",
      friends: isHackathon ? values.friends : "",
      program_id: program.id,
      lead_id: leadId,
      page_url: window.location.href.slice(0, 1000),
      referrer: attr.referrer,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      utm_term: attr.utm_term,
      fbclid: attr.fbclid,
      fbp: cookies.fbp,
      fbc: cookies.fbc,
      company: honeypot,
    };

    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        trackLead(program.id, program.title, leadId);
        try {
          sessionStorage.removeItem(draftKey);
          sessionStorage.setItem("bo_last_lead", JSON.stringify({ leadId, programId: program.id }));
        } catch {
          /* ignore */
        }
        router.push(`/apply/thank-you?program=${program.id}`);
        return;
      }
      if (res.status === 422 && data.fields) {
        const errs = data.fields as Record<string, string>;
        setErrors(errs);
        const onStudentStep = Object.keys(errs).some((k) => (STUDENT_FIELDS as readonly string[]).includes(k));
        if (onStudentStep) setStep(1);
        setStatus("idle");
        focusFirstError(errs);
        return;
      }
      setStatus("error");
      setServerMsg(res.status === 429 ? f.rateLimited : f.failed);
    } catch {
      setStatus("error");
      setServerMsg(f.failed);
    }
  };

  if (program && program.status === "sold_out") {
    return (
      <div className="border border-ink bg-white p-8 text-ink">
        <p className="display text-4xl">{f.soldOut}</p>
      </div>
    );
  }

  const L = f.labels;
  const totalSteps = 2;
  const pickerHouses = houses();
  const whatsappText = `Hi BeOutlier. I tried to apply for ${program?.title ?? "Summer 2027"} for ${values.student_name || "my child"} and the form did not go through.`;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative scroll-mt-24 border border-ink bg-white p-6 text-ink sm:p-10"
      aria-describedby="form-status"
    >
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {showHousePicker && step === 1 ? (
        <fieldset className="mb-8">
          <legend className="text-xl font-semibold">{f.pickHouse}</legend>
          <p className="mt-1 text-sm text-ink-muted">{f.pickHouseHint}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {pickerHouses.map((h) => {
              const selected = programId === h.id;
              return (
                <label
                  key={h.id}
                  className={`flex cursor-pointer flex-col border p-4 transition-colors ${
                    selected ? "border-ink bg-ink text-white" : "border-ink/20 bg-white hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="house"
                    value={h.id}
                    checked={selected}
                    onChange={() => choosePlan(h.id)}
                    className="sr-only"
                  />
                  <span className={`display text-3xl ${selected ? "text-mint" : ""}`}>{h.houseShort}</span>
                  <span className="mt-1 text-sm font-semibold">{h.title}</span>
                </label>
              );
            })}
          </div>
          {errors.house ? <p className="mt-2 text-sm font-semibold text-[#b3261e]">{errors.house}</p> : null}
        </fieldset>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <p className="label text-ink-muted">
          {f.stepOf(step, totalSteps)} · {step === 1 ? f.stepStudent : f.stepParent}
        </p>
        {program && !preset ? <p className="label text-ink">{program.houseName}</p> : null}
      </div>
      <div className="mt-4 h-px overflow-hidden bg-ink/12" aria-hidden="true">
        <div className="h-full bg-ink transition-[width] duration-500" style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>

      {step === 1 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField id="student_name" label={L.student_name} value={values.student_name} onChange={set("student_name")} onBlur={blur("student_name")} error={errors.student_name} autoComplete="off" maxLength={80} />
          </div>
          <SelectField id="age" label={L.age} value={values.age} onChange={set("age")} onBlur={blur("age")} options={program ? ageOptions(program) : []} placeholder={f.placeholders.select} error={errors.age} />
          <SelectField id="grade" label={L.grade} value={values.grade} onChange={set("grade")} onBlur={blur("grade")} options={program ? gradeOptions(program) : []} placeholder={f.placeholders.select} error={errors.grade} />
          <div className="sm:col-span-2">
            <TextField id="school" label={L.school} value={values.school} onChange={set("school")} onBlur={blur("school")} error={errors.school} autoComplete="off" maxLength={120} />
          </div>
          <SelectField id="board" label={L.board} value={values.board} onChange={set("board")} onBlur={blur("board")} options={[...BOARDS]} placeholder={f.placeholders.select} error={errors.board} />
          <TextField id="city" label={L.city} value={values.city} onChange={set("city")} onBlur={blur("city")} error={errors.city} autoComplete="address-level2" maxLength={60} />
          {campuses.length ? (
            <div className="sm:col-span-2">
              <SelectField id="preferred_campus" label={L.preferred_campus} value={values.preferred_campus} onChange={set("preferred_campus")} onBlur={blur("preferred_campus")} options={campuses} placeholder={f.placeholders.select} error={errors.preferred_campus} />
            </div>
          ) : null}
          {isHackathon ? (
            <div className="sm:col-span-2">
              <TextField id="friends" label={L.friends} value={values.friends} onChange={set("friends")} hint={f.friendsHint} optional maxLength={300} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <Button type="submit" variant="ink" size="lg" className="w-full">
              {f.next}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          <TextField id="parent_name" label={L.parent_name} value={values.parent_name} onChange={set("parent_name")} onBlur={blur("parent_name")} error={errors.parent_name} autoComplete="name" maxLength={80} />
          <TextField id="parent_whatsapp" label={L.parent_whatsapp} value={values.parent_whatsapp} onChange={set("parent_whatsapp")} onBlur={blur("parent_whatsapp")} error={errors.parent_whatsapp} hint={f.phoneHint} type="tel" inputMode="tel" autoComplete="tel-national" prefix="+91" maxLength={14} placeholder="98765 43210" />
          <TextField id="parent_email" label={L.parent_email} value={values.parent_email} onChange={set("parent_email")} onBlur={blur("parent_email")} error={errors.parent_email} type="email" inputMode="email" autoComplete="email" maxLength={120} />
          <CheckboxField id="consent" checked={values.consent} onChange={(v) => set("consent")(v)} error={errors.consent}>
            {f.consent}{" "}
            <Link href="/privacy" target="_blank" className="underline underline-offset-2">
              {f.privacyLink}
            </Link>
            .
          </CheckboxField>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button type="button" variant="ghost" onClick={() => { setStep(1); setErrors({}); }} className="sm:w-40">
              {f.back}
            </Button>
            <Button type="submit" variant="ink" size="lg" className="flex-1" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? f.sending : mode === "booking" ? "Book a seat" : "Apply for Summer 2027"}
            </Button>
          </div>
        </div>
      )}

      <div id="form-status" aria-live="polite" className="mt-4">
        {status === "error" && serverMsg ? (
          <div className="border border-ink/15 bg-linen p-5">
            <p className="text-sm font-bold">{serverMsg}</p>
            <ButtonLink href={whatsappLink(whatsappText)} variant="ink" className="mt-4" target="_blank" rel="noopener">
              WhatsApp us
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </form>
  );
}
