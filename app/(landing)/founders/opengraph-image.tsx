import { ogCard, ogSize } from "@/lib/og";

export const alt = "Founders Fellowship. Build a brand. Sell it live. Keep what you make.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "HOUSE OF FOUNDERS · SUMMER 2027", lines: ["BUILD A BRAND.", "SELL IT LIVE.", "KEEP WHAT YOU MAKE."], dark: false });
}