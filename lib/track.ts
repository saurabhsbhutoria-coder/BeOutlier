/**
 * Client tracking wrappers. Every call is guarded: a blocked or missing
 * script can never throw into the form.
 */
type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

function safe(fn: () => void) {
  try {
    fn();
  } catch {
    /* tracking must never break the page */
  }
}

export function trackViewContent(programId: string, title: string) {
  safe(() => window.fbq?.("track", "ViewContent", { content_name: title, content_ids: [programId] }));
  safe(() => window.gtag?.("event", "view_item", { program: programId }));
}

export function trackLead(programId: string, title: string, leadId: string) {
  safe(() =>
    window.fbq?.("track", "Lead", { content_name: title, content_ids: [programId] }, { eventID: leadId }),
  );
  safe(() => window.gtag?.("event", "generate_lead", { program: programId }));
}

export function trackPageView() {
  safe(() => window.fbq?.("track", "PageView"));
}
