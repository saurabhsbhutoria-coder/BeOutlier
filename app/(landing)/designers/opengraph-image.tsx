import { ogCard, ogSize } from "@/lib/og";

export const alt = "Design and Architecture Residential. Four days in Goa.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "HOUSE OF DESIGNERS · GOA", lines: ["FOUR DAYS IN GOA.", "LEARN ARCHITECTURE", "BY BUILDING IT."], dark: false });
}