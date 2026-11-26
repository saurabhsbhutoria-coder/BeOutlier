import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, VideoHero } from "@/components/sections/Landing";
import { IitBombayTag } from "@/components/sections/Cards";
import { MentorRail } from "@/components/sections/MentorRail";
import { DayPlan, InfoTable, NumberedList, ProjectGrid } from "@/components/ui/Lists";
import { Section } from "@/components/ui/bits";
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
    "A two day robotics and AI hackathon for ages 14 to 19 at The Green Acres Academy, Chembur. Four problem statements, teams of 3, judged on working builds. ₹20,000 prize pool for the top 3 projects. Mentored by folks from IIT Bombay. No experience needed.",
  alternates: { canonical: "/hackathon" },
};

/** Prize pool, ₹20,000 across the top 3 projects (26 November 2026). Split confirmed by BeOutlier. */
const prizes = [
  { place: "1st place", amount: "₹10,000" },
  { place: "2nd place", amount: "₹6,000" },
  { place: "3rd place", amount: "₹4,000" },
];

/** What every student leaves with, in BeOutlier's words (26 November 2026). */
const everyStudent = [
  {
    title: "A taste of the real thing.",
    text: "What it feels like to build something cool with AI and circuits, and watch it work.",
  },
  { title: "You keep what you build.", text: "Every student takes their build home." },
  {
    title: "A room of geniuses.",
    text: "Two days beside sharp young builders and the engineers who mentor them.",
  },
  {
    title: "Global exposure.",
    text: "Problems engineers around the world are solving right now, and the tools they use to solve them.",
  },
  {
    title: "A strong pre collegiate profile.",
    text: "A working build and a result to point to, long before college applications.",
  },
  { title: "A globally recognised certificate.", text: "Every student gets one." },
];

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
        <Heading label="What is at stake" index="05" lines={["₹20,000 prize pool.", "Top 3 projects win."]} tone="mint" />
        <Reveal>
          <ol className="grid gap-3 sm:grid-cols-3">
            {prizes.map((prize, i) => (
              <li
                key={prize.place}
                className={`rounded-[22px] border p-6 sm:p-7 ${
                  i === 0 ? "border-mint bg-mint text-ink" : "border-white/20 bg-white/5 text-white"
                }`}
              >
                <p className={`label ${i === 0 ? "text-ink/70" : "text-white/60"}`}>{prize.place}</p>
                <p className="display mt-4 text-6xl sm:text-7xl">{prize.amount}</p>
                <p className={`mt-3 text-base ${i === 0 ? "text-ink/80" : "text-white/70"}`}>Cash prize for the team.</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="mt-8 max-w-3xl text-xl leading-snug text-white sm:text-2xl">
          The best teams also earn internship opportunities with stalwarts in AI and engineering.
        </p>

        <p className="label mt-16 text-mint sm:mt-20">For every student</p>
        <ul className="mt-6 grid gap-x-10 border-t border-white/25 sm:grid-cols-2 lg:grid-cols-3">
          {everyStudent.map((item, i) => (
            <li key={item.title} className="border-b border-white/15 py-6">
              <p className="label text-white/50">{String(i + 1).padStart(2, "0")}</p>
              <p className="display mt-3 text-2xl text-white sm:text-3xl">{item.title}</p>
              <p className="mt-2 text-base leading-snug text-white/70">{item.text}</p>
            </li>
          ))}
        </ul>
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
