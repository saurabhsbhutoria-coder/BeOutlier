import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, VideoHero } from "@/components/sections/Landing";
import { IitBombayTag } from "@/components/sections/Cards";
import { MentorRail } from "@/components/sections/MentorRail";
import { DayPlan, InfoTable, NumberedList, ProjectGrid } from "@/components/ui/Lists";
import { Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, feeText, getProgram, seatsText } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { hackathonHero } from "@/content/media";

const program = getProgram("hackathon");

export const metadata: Metadata = {
  title: "Robotics and AI Hackathon, Mumbai. 26 and 27 December.",
  description:
    "A two day robotics and AI hackathon for ages 14 to 19 at The Green Acres Academy, Chembur. Four problem statements, teams of 3, judged on working builds. Mentored by folks from IIT Bombay. No experience needed.",
  alternates: { canonical: "/hackathon" },
};

/**
 * Rewritten 26 November 2026: a serious build event, not a hobby day.
 * Structure borrowed from established student hackathons (tracks, format,
 * judging, stakes). Every fact is from CLAUDE.md section 8 and programs.ts.
 */
export default function HackathonPage() {
  if (!program) notFound();
  const p = program;
  const fee = feeText(p.fee);

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <VideoHero
        program={p}
        lines={["Build a robot", "that thinks."]}
        mobile={hackathonHero.mobile}
        desktop={hackathonHero.desktop}
        tag={<IitBombayTag />}
        facts={[
          `Robotics and AI Hackathon. ${p.datesLine}. ${p.venue}.`,
          `${eligibilityText(p.eligibility)}. Teams of 3. No experience needed.`,
          `${fee} per student. ${seatsText(p)} 17 teams.`,
        ]}
      />

      <Section tone="white">
        <Heading label="The challenge" index="01" lines={["Four problem statements.", "Your team takes one."]} />
        <p className="-mt-6 mb-12 max-w-2xl text-xl leading-snug text-ink-muted">
          Every team builds with Arduino and AI. Each track is a problem engineers are solving right now.
        </p>
        <Reveal>
          <ProjectGrid
            items={[
              {
                kicker: "Autonomy",
                title: "Self driving car",
                text: "A car that reads the road ahead and steers around obstacles on its own.",
              },
              {
                kicker: "Human machine interaction",
                title: "Gesture controlled robotic arm",
                text: "A camera reads your hand. The arm follows every move.",
              },
              {
                kicker: "Computer vision",
                title: "Face recognition door",
                text: "Recognises the faces it knows and opens. Stays locked for everyone else.",
              },
              {
                kicker: "Sustainability",
                title: "Smart waste bin",
                text: "Sees what goes in and sorts it into wet or dry waste, by itself.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="linen">
        <Heading label="Starting from zero" index="02" lines={[]} className="!mb-6" />
        <p className="max-w-4xl text-2xl font-medium leading-snug sm:text-4xl">
          You walk in with curiosity. You walk out having built a working robot.
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          No coding or electronics needed. Day 1 opens with training in Arduino circuits and AI, and every team gets the
          full hardware kit before the build begins.
        </p>
      </Section>

      <Section tone="white">
        <Heading label="The format" index="03" lines={["Two days.", "10 am to 7 pm."]} />
        <DayPlan
          days={[
            {
              label: "Day 1.",
              text: "Training in Arduino circuits and AI. Teams lock in their problem statement. The build begins.",
            },
            { label: "Day 2.", text: "Build, test, break, rebuild. Final demos before the judges." },
          ]}
        />
      </Section>

      <Section tone="white" className="!pt-0">
        <Heading label="How teams are judged" index="04" lines={["Judged on what works.", "Not on what was planned."]} />
        <NumberedList
          items={[
            "It works, live, in front of the judges.",
            "It solves the problem the team chose.",
            "The team can explain every part of how it works.",
            "It was built here, by the team, in two days.",
          ]}
        />
      </Section>

      <Section tone="ink">
        <Heading label="What is at stake" index="05" lines={[]} tone="mint" className="!mb-6" />
        <p className="label text-white/70">For the best teams</p>
        <Stack lines={["An internship."]} className="mt-4 text-6xl text-mint sm:text-9xl" />
        <p className="display mt-8 max-w-4xl text-3xl sm:text-5xl">
          A day inside IIT Bombay with the students who build for Techfest.
        </p>
      </Section>

      <Section tone="linen">
        <Heading label="Who you build with" index="06" lines={["IIT Bombay alumni", "who build this for fun."]} />
        <MentorRail people={peopleFor("hackathon", "mentor")} rows={1} showIitb label="Hackathon mentors" />
      </Section>

      <Section tone="white">
        <Heading label="For parents" index="07" lines={[]} className="!mb-6" />
        <InfoTable
          caption="Hackathon details for parents"
          rows={[
            { label: "Venue", value: `${p.venue}.` },
            { label: "Timings", value: "10 am to 7 pm, both days." },
            { label: "Included", value: "Every hardware part and kit the team builds with." },
            { label: "Meals", value: "Not included. Please send a packed lunch and water." },
            { label: "Supervision", value: "1 mentor for every 9 students." },
            { label: "Fee", value: `${fee} per student. Paid online at booking.` },
          ]}
        />
      </Section>

      <CloseBlock program={p} lines={[`${seatsText(p)} 17 teams.`, "Booking closes", "when seats fill."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
