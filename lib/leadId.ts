const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** BO-YYMMDD-XXXXXX. Sheet key, retry dedupe key and Meta event_id. */
export function generateLeadId(now = new Date()): string {
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  const yymmdd =
    String(ist.getUTCFullYear()).slice(2) +
    String(ist.getUTCMonth() + 1).padStart(2, "0") +
    String(ist.getUTCDate()).padStart(2, "0");
  const bytes = new Uint8Array(6);
  globalThis.crypto.getRandomValues(bytes);
  const rand = Array.from(bytes, (b) => ALPHABET[b % 32]).join("");
  return `BO-${yymmdd}-${rand}`;
}

export const LEAD_ID_PATTERN = /^BO-\d{6}-[A-Z2-7]{6}$/;
