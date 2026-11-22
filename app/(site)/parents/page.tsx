import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { ParentsComparison } from "@/components/sections/ParentsComparison";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";

export const metadata: Metadata = {
  title: "For Parents",
  description: "Everything you'd ask us on a call. Fees. Safety. Supervision. What your child brings home.",
  alternates: { canonical: "/parents" },
};

export default function ParentsPage() {
  return (
    <PlaceholderPage
      eyebrow="For Parents"
      title="For Parents"
      blocks={["[PARENT QUESTIONS AND ANSWERS: TO BE WRITTEN]", "[PARENT TESTIMONIALS: TO BE ADDED]"]}
    >
      <Section tone="sand">
        <Eyebrow label="The facts" />
        <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-4 text-5xl sm:text-7xl" />
        <p className="mt-5 mb-12 text-xl sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
        <ParentsComparison />
      </Section>
      <Section tone="white">
        <AdmissionSteps variant="full" />
      </Section>
    </PlaceholderPage>
  );
}
