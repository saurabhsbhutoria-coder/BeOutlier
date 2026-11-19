/**
 * Client only. Captures UTMs, fbclid and the external referrer on the first
 * page of a visit and keeps them in sessionStorage, so they survive the click
 * from a landing page to /apply.
 */
const KEY = "bo_attr";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Record<(typeof UTM_KEYS)[number] | "fbclid" | "referrer" | "landing_page", string>;

const empty = (): Attribution => ({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  fbclid: "",
  referrer: "",
  landing_page: "",
});

function safeGet(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...empty(), ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

function safeSet(a: Attribution) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage blocked: attribution simply not kept */
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = empty();
  let hasCampaign = false;
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) {
      fromUrl[k] = v.slice(0, 300);
      hasCampaign = true;
    }
  }
  const fbclid = params.get("fbclid");
  if (fbclid) {
    fromUrl.fbclid = fbclid.slice(0, 500);
    hasCampaign = true;
  }

  const stored = safeGet();
  const storedHasCampaign = stored && (stored.utm_source || stored.fbclid);
  if (stored && (!hasCampaign || storedHasCampaign)) return;

  let referrer = "";
  try {
    if (document.referrer && new URL(document.referrer).host !== window.location.host) {
      referrer = document.referrer.slice(0, 500);
    }
  } catch {
    /* ignore */
  }
  fromUrl.referrer = referrer || stored?.referrer || "";
  fromUrl.landing_page = window.location.href.slice(0, 500);
  safeSet(fromUrl);

  // Meta click cookie, so the Conversions API can match ad clicks.
  if (fbclid && !readCookie("_fbc")) {
    const value = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${value}; path=/; max-age=${90 * 24 * 3600}; SameSite=Lax`;
  }
}

export function readAttribution(): Attribution {
  return safeGet() ?? empty();
}

function readCookie(name: string): string {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

export function metaCookies(): { fbp: string; fbc: string } {
  return { fbp: readCookie("_fbp"), fbc: readCookie("_fbc") };
}
