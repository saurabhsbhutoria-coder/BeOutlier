/**
 * One schema, shared by the form (inline errors per step) and /api/apply (server check).
 * Built per program because age, grade and campus options differ.
 */
import { z } from "zod";
import { campusOptions, type Program } from "@/content/programs";
import { microcopy } from "@/content/microcopy";
import { isIndianMobile, normaliseIndianMobile } from "./phone";
import { LEAD_ID_PATTERN } from "./leadId";

const e = microcopy.form.errors;

export const BOARDS = [
  "CBSE",
  "ICSE or ISC",
  "IB",
  "Cambridge IGCSE or A Levels",
  "State board",
  "NIOS",
  "Other",
] as const;

type NonEmpty = [string, ...string[]];

export function ageOptions(p: Program): string[] {
  const [min, max] = p.eligibility.kind === "age" ? [p.eligibility.min, p.eligibility.max] : [10, 18];
  return Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
}

export function gradeOptions(p: Program): string[] {
  if (p.eligibility.kind === "grade") {
    const { min, max } = p.eligibility;
    return Array.from({ length: max - min + 1 }, (_, i) => `Grade ${min + i}`);
  }
  return ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Finished school"];
}

const req = (msg: string, max = 120) => z.string().trim().min(2, msg).max(max, msg);
const pick = (options: string[], msg: string) =>
  z.string().refine((v) => options.includes(v), { message: msg });

export const STUDENT_FIELDS = [
  "student_name",
  "age",
  "grade",
  "school",
  "board",
  "city",
  "preferred_campus",
  "friends",
] as const;

export const PARENT_FIELDS = ["parent_name", "parent_whatsapp", "parent_email", "consent"] as const;

export function buildSchemas(p: Program) {
  const campuses = campusOptions(p);

  const student = z.object({
    student_name: req(e.student_name, 80),
    age: pick(ageOptions(p), e.age),
    grade: pick(gradeOptions(p), e.grade),
    school: req(e.school),
    board: pick([...BOARDS], e.board),
    city: req(e.city, 60),
    preferred_campus: campuses.length
      ? pick(campuses, e.preferred_campus)
      : z.string().max(0).optional().default(""),
    friends: z.string().trim().max(300).optional().default(""),
  });

  const parent = z.object({
    parent_name: req(e.parent_name, 80),
    parent_whatsapp: z
      .string()
      .transform(normaliseIndianMobile)
      .refine(isIndianMobile, { message: e.parent_whatsapp }),
    parent_email: z.string().trim().toLowerCase().pipe(z.email({ message: e.parent_email })),
    consent: z.literal(true, { message: e.consent }),
  });

  const opt = z.string().max(1000).optional().default("");
  const meta = z.object({
    lead_id: z.string().regex(LEAD_ID_PATTERN),
    program_id: z.literal(p.id),
    page_url: opt,
    referrer: opt,
    utm_source: opt,
    utm_medium: opt,
    utm_campaign: opt,
    utm_content: opt,
    utm_term: opt,
    fbclid: opt,
    fbp: opt,
    fbc: opt,
  });

  const full = student.extend(parent.shape).extend(meta.shape);
  return { student, parent, full };
}

export type LeadInput = z.infer<ReturnType<typeof buildSchemas>["full"]>;

/** Field name to first error message. */
export function errorMap(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
