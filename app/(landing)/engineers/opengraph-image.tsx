import { ogCard, ogSize } from "@/lib/og";

export const alt = "Robotics Residential. Four days on a university campus. One robot you built yourself.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "HOUSE OF ENGINEERS · FLAME UNIVERSITY, PUNE", lines: ["FOUR DAYS ON A", "UNIVERSITY CAMPUS.", "ONE ROBOT YOU", "BUILT YOURSELF."], dark: true });
}