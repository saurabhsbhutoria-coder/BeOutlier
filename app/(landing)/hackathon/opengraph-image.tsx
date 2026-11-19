import { ogCard, ogSize } from "@/lib/og";

export const alt = "Robotics Hackathon. Build a working robot in two days.";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ eyebrow: "ROBOTICS HACKATHON · 26 AND 27 DECEMBER · MUMBAI", lines: ["BUILD A WORKING", "ROBOT IN TWO DAYS."], dark: true });
}