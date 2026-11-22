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

const program = getProgram("engineers");

export const metadata: Metadata = {
  title: "Robotics Residential. Four days on a university campus.",
  description:
    "Robotics Residential. House of Engineers. FLAME University, Pune. Last week of May. Ages 14 to 19. Built with IIT Bombay students. 15% get in.",
  alternates: { canonical: "/engineers" },
};

export default function EngineersPage() {
  if (!program) notFound();
  const p = program;
  const fee = feeText(p.fee);

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <LandingHero
        program={p}
        lines={["Four days on a", "university campus.", "One robot you", "built yourself."]}
        video={heroVideos.engineers}
        facts={[
          `${p.title}. ${p.houseName}. ${p.venue}.`,
          `${p.datesLine}. ${eligibilityText(p.eligibility)}. Built with IIT Bombay students.`,
          `${fee}. Stay and meals included. 15% get in.`,
        ]}
      />

      <Section tone="white">
        <Heading label="What it is" index="01" lines={[]} className="!mb-6" />
        <Reveal>
          <p className="heavy max-w-5xl text-2xl leading-[1.15] sm:text-4xl">
            You live on campus for four days. You learn Arduino circuits and AI from IIT Bombay students. Then your
            team builds <span className="mark">a machine that sees, decides and moves</span>, and puts it up against
            every other team&apos;s.
          </p>
        </Reveal>
      </Section>

      <Section tone="linen">
        <Heading label="The four days" index="02" lines={[]} className="!mb-6" />
        <DayPlan
          days={[
            { label: "Day 1.", text: "Move in. Orientation with your parents. Meet your team. First circuit." },
            { label: "Day 2.", text: "Sensors, motors and AI. Pick your build." },
            { label: "Day 3.", text: "Build all day. Break it. Fix it." },
            { label: "Day 4.", text: "The arena. Every robot competes. Then you take yours home." },
          ]}
        />
      </Section>

      <Section tone="ink">
        <Heading label="What you could build" index="03" lines={[]} tone="mint" className="!mb-6" />
        <ul className="flex flex-wrap gap-3">
          {["Self driving rover", "Gesture controlled robotic arm", "Face recognition lock", "Smart sorting machine"].map((b) => (
            <li key={b} className="border border-white/30 px-6 py-3 text-lg font-medium transition-colors hover:border-mint hover:bg-mint hover:text-ink">
              {b}
            </li>
          ))}
        </ul>
        <p className="display mt-10 text-4xl text-mint sm:text-6xl">Your team picks one.</p>
      </Section>

      <BeforeYouStart index="04" />

      <AfterDark index="05" />

      <Section tone="white">
        <Heading label="What you walk away with" index="06" lines={[]} className="!mb-6" />
        <ul className="grid gap-4 sm:grid-cols-3">
          {["A working robot, yours to keep.", "Four days of campus life.", "A team you built it with."].map((t) => (
            <li key={t} className="display bg-mint p-8 text-4xl text-ink sm:text-5xl">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="linen">
        <Heading label="Who you build with" index="07" lines={["IIT Bombay students", "who build this for fun."]} />
        <FacesGrid people={peopleFor("engineers", "mentor")} />
      </Section>

      <ParentsTable
        index="08"
        rows={[
          { label: "Stay", value: "On the FLAME campus. 3 students per room." },
          { label: "Meals", value: "All included." },
          { label: "Arrival", value: "You drop your child at campus and stay for the Day 1 orientation." },
          { label: "Supervision", value: "1 mentor for every 9 students. Wardens on duty." },
          { label: "Safety", value: "Doctor and medical team on campus. Security team. CCTV surveillance." },
          { label: "Evenings", value: "Supervised cultural activities, expeditions and bonfire nights with mentors." },
          { label: "Fee", value: `${fee}.` },
        ]}
      />

      <Section tone="linen">
        <Heading label="How you get in" index="09" lines={[]} className="!mb-6" />
        <AdmissionSteps variant="short" />
      </Section>

      <CloseBlock program={p} lines={["Four days.", "One campus.", "Limited rooms."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
