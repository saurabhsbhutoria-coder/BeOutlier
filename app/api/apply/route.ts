import { NextResponse, after, type NextRequest } from "next/server";
import { getProgram, formatINR } from "@/content/programs";
import { buildSchemas, errorMap } from "@/lib/schema";
import { allow } from "@/lib/rateLimit";
import { istTimestamp } from "@/lib/format";
import { toE164 } from "@/lib/phone";
import { sendCapiLead } from "@/lib/capi";
import { microcopy } from "@/content/microcopy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 10_000;

type SheetLead = Record<string, string>;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function forwardOnce(url: string, secret: string, lead: SheetLead): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, lead }),
      redirect: "follow",
      signal: AbortSignal.timeout(9000),
      cache: "no-store",
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return data && data.ok === true ? { ok: true } : { ok: false, error: String(data?.error ?? "not ok") };
    } catch {
      return { ok: false, error: `bad response ${res.status}: ${text.slice(0, 200)}` };
    }
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") ?? "";

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return json(413, { ok: false, error: "too_large" });
    body = JSON.parse(text);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return json(400, { ok: false, error: "bad_request" });
  }

  // Honeypot: pretend success, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json(200, { ok: true, leadId: String(body.lead_id ?? "") });
  }

  if (!allow(ip)) {
    return json(429, { ok: false, error: "rate_limited", message: microcopy.form.rateLimited });
  }

  // The client only names the program. Everything else about it comes from programs.ts.
  const program = getProgram(String(body.program_id ?? ""));
  if (!program || program.status === "sold_out") {
    return json(400, { ok: false, error: "unknown_program" });
  }

  const parsed = buildSchemas(program).full.safeParse(body);
  if (!parsed.success) {
    return json(422, { ok: false, error: "invalid", fields: errorMap(parsed.error) });
  }
  const d = parsed.data;

  const paymentUrl = program.formType === "booking" ? process.env.NEXT_PUBLIC_HACKATHON_PAYMENT_URL || "" : "";

  // Column order matches the Leads tab (see google-apps-script/Code.gs).
  const lead: SheetLead = {
    lead_id: d.lead_id,
    submitted_at_ist: istTimestamp(),
    program: program.title,
    house: program.houseName ?? "",
    form_type: program.formType,
    student_name: d.student_name,
    grade: d.grade,
    age: d.age,
    school: d.school,
    board: d.board,
    city: d.city,
    preferred_campus: d.preferred_campus ?? "",
    friends: d.friends ?? "",
    parent_name: d.parent_name,
    parent_whatsapp: toE164(d.parent_whatsapp),
    parent_email: d.parent_email,
    consent: "Yes",
    utm_source: d.utm_source,
    utm_medium: d.utm_medium,
    utm_campaign: d.utm_campaign,
    utm_content: d.utm_content,
    utm_term: d.utm_term,
    fbclid: d.fbclid,
    page_url: d.page_url,
    referrer: d.referrer,
    // Not columns: used by the script for the emails only.
    _program_id: program.id,
    _fee: program.fee.kind === "fixed" ? formatINR(program.fee.amount) : "",
    _payment_url: paymentUrl,
  };

  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      console.info("LEAD_DEV_MODE (no APPS_SCRIPT_URL set, nothing forwarded)", JSON.stringify(lead));
      return json(200, { ok: true, leadId: d.lead_id, dev: true });
    }
    console.error("LEAD_FORWARD_FAILED missing APPS_SCRIPT_URL or APPS_SCRIPT_SECRET", JSON.stringify(lead));
    return json(502, { ok: false, error: "forward_failed", message: microcopy.form.failed });
  }

  let result = await forwardOnce(url, secret, lead);
  if (!result.ok) {
    console.warn("LEAD_FORWARD_RETRY", d.lead_id, result.error);
    result = await forwardOnce(url, secret, lead);
  }
  if (!result.ok) {
    // Full payload in the logs so no lead is ever lost silently.
    console.error("LEAD_FORWARD_FAILED", result.error, JSON.stringify(lead));
    return json(502, { ok: false, error: "forward_failed", message: microcopy.form.failed });
  }

  // Conversions API runs after the response is sent: zero wait for the parent.
  after(() =>
    sendCapiLead({
      leadId: d.lead_id,
      programId: program.id,
      programTitle: program.title,
      email: d.parent_email,
      phoneDigits: d.parent_whatsapp,
      city: d.city,
      ip,
      userAgent,
      fbp: d.fbp,
      fbc: d.fbc,
      sourceUrl: d.page_url,
    }),
  );

  return json(200, { ok: true, leadId: d.lead_id });
}

export function GET() {
  return json(405, { ok: false, error: "method_not_allowed" });
}
