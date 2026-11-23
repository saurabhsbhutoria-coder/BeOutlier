import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, LandingHero } from "@/components/sections/Landing";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { DayPlan, InfoTable, ProjectGrid } from "@/components/ui/Lists";
import { Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, feeText, getProgram, seatsText } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { heroVideos } from "@/content/media";

const program = getProgram("hackathon");

export const metadata: Metadata = {
  title: "Robotics Hackathon. Build a working robot in two days.",
  description:
    "Robotics and AI Hackathon. 26 and 27 December. The Green Acres Academy, Chembur. Ages 14 to 19. No experience needed. Mentored by IIT Bombay alumni.",
  alternates: { canonical: "/hackathon" },
};

export default function HackathonPage() {
  if (!program) notFound();
  const p = program;

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <LandingHero
        program={p}
        lines={["Build a working", "robot in two days."]}
        video={heroVideos.hackathon}
        facts={[
          `Robotics and AI Hackathon. ${p.datesLine}. ${p.venue}.`,
          `${eligibilityText(p.eligibility)}. No experience needed. Mentored by IIT Bombay alumni.`,
          `${feeText(p.fee)}. ${seatsText(p)} 17 teams of 3.`,
        ]}
      />

      <Section tone="white">
        <Heading label="What you build" index="01" lines={["Arduino circuits plus AI.", "Your team picks one:"]} />
        <Reveal>
          <ProjectGrid
            items={[
              { title: "Self driving car", text: "Drives itself and dodges obstacles." },
              { title: "Gesture controlled robotic arm", text: "Wave your hand at the camera and the arm copies you." },
              { title: "Face unlock door", text: "Recognises your face and opens. Locks for strangers." },
              { title: "Smart waste bin", text: "Sees what you throw in and sorts it into wet or dry." },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="linen">
        <p className="label flex items-center gap-2.5"><span className="dot" aria-hidden="true" />Before you start <span className="opacity-55">· 02</span></p>
        <p className="mt-8 max-w-4xl text-2xl font-medium leading-snug sm:text-4xl">
          No coding or electronics needed. We teach you everything and hand you every part before the build begins.
        </p>
      </Section>

      <Section tone="white">
        <Heading label="The two days" index="03" lines={[]} className="!mb-6" />
        <DayPlan
          days={[
            { label: "Day 1.", text: "Learn the circuits. Meet your team. Start building." },
            { label: "Day 2.", text: "Build. Break it. Fix it. Demo it to the judges." },
          ]}
        />
      </Section>

      <Section tone="ink">
        <Heading label="What the best teams get" index="04" lines={[]} tone="mint" className="!mb-6" />
        <Stack lines={["An internship."]} className="text-6xl text-mint sm:text-9xl" />
        <p className="display mt-8 max-w-4xl text-3xl sm:text-5xl">
          A day inside IIT Bombay with the students who build for Techfest.
        </p>
      </Section>

      <Section tone="linen">
        <Heading label="Who you build with" index="05" lines={["IIT Bombay alumni", "who build this for fun."]} />
        <FacesGrid people={peopleFor("hackathon", "mentor")} />
      </Section>

      <Section tone="white">
        <Heading label="For parents" index="06" lines={[]} className="!mb-6" />
        <InfoTable
          caption="Hackathon details for parents"
          rows={[
            { label: "Venue", value: `${p.venue}.` },
            { label: "Timings", value: "10 am to 7 pm, both days." },
            { label: "Included", value: "All parts and meals." },
            { label: "Supervision", value: "1 mentor for every 9 students." },
            { label: "Fee", value: `${feeText(p.fee)}. Paid online at booking.` },
          ]}
        />
      </Section>

      <CloseBlock program={p} lines={[`${seatsText(p)} Open to all.`, "When they're gone,", "they're gone."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
