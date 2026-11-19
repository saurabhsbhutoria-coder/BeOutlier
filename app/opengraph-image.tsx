import { ogCard, ogSize } from "@/lib/og";

export const alt = "BeOutlier. A school beyond classrooms.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "SUMMER 2027 · MUMBAI · PUNE · GOA", lines: ["A SCHOOL", "BEYOND CLASSROOMS."] });
}
