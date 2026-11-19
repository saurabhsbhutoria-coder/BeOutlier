import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { Eyebrow, Section } from "@/components/ui/bits";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For Schools",
  description: "BeOutlier does not compete with schools. It adds the layer schools leave out.",
  alternates: { canonical: "/schools" },
};

export default function SchoolsPage() {
  return (
    <PlaceholderPage
      eyebrow="For Schools"
      title="For Schools"
      blocks={[
        "[HOW A PARTNERSHIP WORKS: TO BE WRITTEN]",
        "[WHAT THE SCHOOL PROVIDES: TO BE WRITTEN]",
        "[WHAT BEOUTLIER PROVIDES: TO BE WRITTEN]",
        "[PARTNER SCHOOL LOGOS: TO BE ADDED WITH PERMISSION]",
      ]}
    >
      <Section tone="deep">
        <Eyebrow label="Admissions" tone="mint" />
        <p className="heavy mt-4 max-w-3xl text-2xl leading-tight sm:text-3xl">
          BeOutlier decides admission at every campus. Partner schools only collect fees.
        </p>
        <Eyebrow label="Previously hosted at" tone="mint" className="mt-16" />
        <p className="heavy mt-4 max-w-3xl text-xl leading-snug">
          DSB International School. The Green Acres Academy. The NEXT School. Goregaon Sports Club.
        </p>
        <p className="mt-10 font-semibold">
          <a href={site.email.href} className="underline underline-offset-4">
            {site.email.display}
          </a>
        </p>
      </Section>
    </PlaceholderPage>
  );
}
