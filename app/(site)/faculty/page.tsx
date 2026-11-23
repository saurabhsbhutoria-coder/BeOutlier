import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { MentorRail } from "@/components/sections/MentorRail";
import { people } from "@/content/people";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Not teachers. People who have done it.",
  alternates: { canonical: "/faculty" },
};

export default function FacultyPage() {
  const mentors = people.filter((p) => p.role === "mentor" || p.role === "faculty");
  const partners = people.filter((p) => p.role === "partner");
  return (
    <PlaceholderPage eyebrow="Faculty" title="Faculty" blocks={["[FACULTY INTRO: TO BE WRITTEN]", "[PARTNERS: TO BE WRITTEN]"]}>
      <Section tone="linen">
        <Eyebrow label="Mentors" />
        <Stack lines={["Not teachers.", "People who have done it."]} className="mt-4 mb-10 text-5xl sm:text-7xl" />
        {mentors.length ? <MentorRail people={mentors} /> : <FacesGrid people={mentors} />}
      </Section>
      <Section tone="white">
        <Eyebrow label="Partners" />
        <p className="mt-6 mb-12 text-2xl text-ink-muted">The Houses of Goa team, founded by architect Gerard da Cunha.</p>
        <FacesGrid people={partners} />
      </Section>
    </PlaceholderPage>
  );
}
