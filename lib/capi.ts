/**
 * Meta Conversions API: server side Lead event, deduplicated with the browser
 * Pixel through the shared event_id (the lead_id). Only parent contact data
 * is sent, hashed. Student data never leaves our systems.
 */
import { createHash } from "node:crypto";

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export interface CapiLead {
  leadId: string;
  programId: string;
  programTitle: string;
  email: string;
  phoneDigits: string;
  city: string;
  ip: string;
  userAgent: string;
  fbp: string;
  fbc: string;
  sourceUrl: string;
}

export async function sendCapiLead(l: CapiLead): Promise<void> {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;
  const version = process.env.META_GRAPH_VERSION || "v23.0";

  const user_data: Record<string, unknown> = {
    em: [sha(l.email)],
    ph: [sha("91" + l.phoneDigits)],
    ct: [sha(l.city.replace(/\s+/g, ""))],
    country: [sha("in")],
    external_id: [sha(l.leadId)],
    client_ip_address: l.ip || undefined,
    client_user_agent: l.userAgent || undefined,
  };
  if (l.fbp) user_data.fbp = l.fbp;
  if (l.fbc) user_data.fbc = l.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: l.leadId,
        action_source: "website",
        event_source_url: l.sourceUrl || undefined,
        user_data,
        custom_data: { content_name: l.programTitle, content_ids: [l.programId] },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${version}/${pixel}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) console.warn("CAPI_FAILED", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.warn("CAPI_ERROR", String(err));
  }
}
