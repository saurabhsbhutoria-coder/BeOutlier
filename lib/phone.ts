/** Indian mobile numbers: 10 digits starting 6 to 9. Accepts +91, 91, 0 prefixes and spaces. */
export function normaliseIndianMobile(input: string): string {
  let d = (input || "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

export function isIndianMobile(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits);
}

/** +919876543210 */
export function toE164(digits: string): string {
  return `+91${digits}`;
}
