import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { ParentsBlock } from "@/components/sections/ParentsBlock";
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
      <Section tone="mint">
        <Eyebrow label="The facts" className="!text-navy" />
        <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-4 text-5xl sm:text-7xl" />
        <p className="heavy mt-5 mb-10 text-xl sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
        <ParentsBlock />
      </Section>
      <Section tone="light">
        <AdmissionSteps variant="full" />
      </Section>
    </PlaceholderPage>
  );
}
