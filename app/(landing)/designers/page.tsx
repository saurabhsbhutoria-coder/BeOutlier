import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, LandingHero } from "@/components/sections/Landing";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { AfterDark, BeforeYouStart, ParentsTable } from "@/components/sections/Residential";
import { DayPlan } from "@/components/ui/Lists";
import { Section } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, feeText, getProgram } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { heroVideos } from "@/content/media";

const program = getProgram("designers");

export const metadata: Metadata = {
  title: "Design and Architecture Residential. Four days in Goa.",
  description:
    "Design and Architecture Residential. House of Designers. In collaboration with the Houses of Goa. First week of June. Ages 14 to 19. 15% get in.",
  alternates: { canonical: "/designers" },
};

export default function DesignersPage() {
  if (!program) notFound();
  const p = program;
  const fee = feeText(p.fee);

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <LandingHero
        program={p}
        lines={["Four days in Goa.", "Learn architecture", "by building it."]}
        video={heroVideos.designers}
        facts={[
          `${p.title}. ${p.houseName}. In collaboration with the Houses of Goa.`,
          `${p.datesLine}. ${eligibilityText(p.eligibility)}. ${fee}. Stay and meals included. 15% get in.`,
        ]}
      />

      <Section tone="ink">
        <Heading label="What it is" index="01" lines={[]} className="!mb-6" />
        <Reveal>
          <p className="heavy max-w-5xl text-2xl leading-[1.15] sm:text-4xl">
            You study how Goa was built. You walk its heritage lanes. Then your team designs and builds{" "}
            <span className="mark">something of its own, by hand.</span>
          </p>
        </Reveal>
      </Section>

      <Section tone="deep">
        <Heading label="The four days" index="02" lines={[]} className="!mb-6" />
        <DayPlan
          days={[
            { label: "Day 1.", text: "Arrive. Orientation with your parents. Inside the Houses of Goa museum." },
            { label: "Day 2.", text: "Heritage expedition and cultural walk. Sketch what you see. Get your brief." },
            { label: "Day 3.", text: "Design and build. Hands on, real materials." },
            { label: "Day 4.", text: "Show your work. Defend your design. Best one wins. Then home." },
          ]}
        />
      </Section>

      <Section tone="ink">
        <Heading label="What you build" index="03" lines={[]} tone="mint" className="!mb-6" />
        <p className="heavy max-w-4xl text-2xl leading-tight sm:text-4xl">
          An architectural project for a real space in Goa, and an artistic piece made with your own hands.
        </p>
        <p className="display mt-8 text-4xl text-sand sm:text-6xl">
          It stays in Goa. That&apos;s the point of building it for Goa.
        </p>
      </Section>

      <BeforeYouStart index="04" />

      <AfterDark index="05" />

      <Section tone="deep">
        <Heading
          label="Who you build with"
          index="06"
          lines={["The Houses of Goa team,", "founded by architect", "Gerard da Cunha."]}
        />
        <FacesGrid people={peopleFor("designers", "partner")} />
      </Section>

      <ParentsTable
        index="07"
        rows={[
          { label: "Stay", value: "International Centre Goa. 3 students per room." },
          { label: "Meals", value: "All included." },
          { label: "Arrival", value: "You drop your child off and stay for the Day 1 orientation." },
          { label: "Supervision", value: "1 mentor for every 9 students. Wardens on duty." },
          { label: "Safety", value: "Doctor and medical team on site. Security team. CCTV surveillance." },
          { label: "Evenings", value: "Supervised cultural activities, expeditions and bonfire nights with mentors." },
          { label: "Fee", value: `${fee}.` },
        ]}
      />

      <Section tone="ink">
        <Heading label="How you get in" index="08" lines={[]} className="!mb-6" />
        <AdmissionSteps variant="short" />
      </Section>

      <CloseBlock program={p} lines={["Four days.", "One coast.", "Limited rooms."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
