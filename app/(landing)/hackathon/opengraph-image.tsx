import { ogCard, ogSize } from "@/lib/og";

export const alt = "Robotics and AI Hackathon. Two days to build a machine that thinks.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "ROBOTICS AND AI HACKATHON · 26 AND 27 DECEMBER · MUMBAI", lines: ["TWO DAYS TO BUILD", "A MACHINE THAT THINKS."], dark: true });
}