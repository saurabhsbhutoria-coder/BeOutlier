import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { Section } from "@/components/ui/bits";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";

export const metadata: Metadata = {
  title: "The Code",
  description: "How BeOutlier selects. Every campus, same bar.",
  alternates: { canonical: "/the-code" },
};

export default function TheCodePage() {
  return (
    <PlaceholderPage
      eyebrow="The Code"
      title="The Code"
      blocks={[
        "[THE CODE: WHAT WE BELIEVE, TO BE WRITTEN]",
        "[HOW SELECTION WORKS: TO BE WRITTEN]",
        "[WHAT WE EXPECT FROM AN OUTLIER: TO BE WRITTEN]",
        "[WHAT YOU CAN EXPECT FROM US: TO BE WRITTEN]",
      ]}
    >
      <Section tone="deep">
        <AdmissionSteps variant="full" />
      </Section>
    </PlaceholderPage>
  );
}
