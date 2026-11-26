import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, VideoHero } from "@/components/sections/Landing";
import { IitBombayTag } from "@/components/sections/Cards";
import { MentorRail } from "@/components/sections/MentorRail";
import { Certificate } from "@/components/sections/Certificate";
import { KitFlow, KitGrid } from "@/components/sections/Kit";
import { DayPlan, InfoTable, NumberedList, ProjectGrid } from "@/components/ui/Lists";
import { Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, feeText, getProgram, seatsText } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { hackathonHero } from "@/content/media";
import { kitComponentCount } from "@/content/hackathonKit";

const program = getProgram("hackathon");

export const metadata: Metadata = {
  title: "Robotics and AI Hackathon, Mumbai. 26 and 27 December.",
  description:
    "A two day robotics and AI hackathon for ages 14 to 19 at The Green Acres Academy, Chembur. Every student builds their own robot and keeps the full kit. ₹20,000 prize pool for the top 3 projects. Mentored by folks from IIT Bombay. No experience needed.",
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
  { title: "You keep what you build.", text: "Your robot and the full kit go home with you." },
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
    text: "A working build and a certificate to point to, long before college applications.",
  },
  { title: "Close mentoring.", text: "1 mentor for every 9 students, through both days." },
];

/** What makes the certificate count. Matches the template in components/sections/Certificate.tsx. */
const certificateFacts = [
  "Signed by the program director and the lead mentor.",
  "Stamped by BeOutlier.",
  "Numbered, one per student.",
  "Names the robot you built.",
];

/**
 * Rewritten 26 November 2026: a serious build event, not a hobby day.
 * Solo builds since 26 November 2026: every student builds their own robot
 * and keeps the kit (content/hackathonKit.ts). Every fact is from CLAUDE.md
 * section 8 and programs.ts.
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
          `${eligibilityText(p.eligibility)}. Every student builds their own robot. No experience needed.`,
          `${fee} per student. ${seatsText(p)} Full kit included, yours to keep.`,
        ]}
      />

      <Section tone="white">
        <Heading label="The challenge" index="01" lines={["Four problem statements.", "You take one."]} />
        <p className="-mt-6 mb-12 max-w-2xl text-xl leading-snug text-ink-muted">
          Every student builds the same glove and robocar from the kit, then makes it solve one problem. Each track is a
          problem engineers are solving right now.
        </p>
        <Reveal>
          <ProjectGrid
            items={[
              {
                kicker: "Human machine interaction",
                title: "Gesture driven robocar",
                text: "Tilt your hand and the car follows. Lean forward to go, flatten your hand to stop.",
              },
              {
                kicker: "Speech AI",
                title: "Voice commanded robocar",
                text: "Say go, stop, left or right. The car hears you and obeys.",
              },
              {
                kicker: "Machine learning",
                title: "Custom gesture recognition",
                text: "Train an AI model on gestures you invent, a circle, a swipe, a shake, and turn each one into a move.",
              },
              {
                kicker: "Assistive technology",
                title: "Hands free mobility",
                text: "A model wheelchair steered by small hand movements, for people who cannot grip a joystick.",
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
          No coding or electronics needed. Day 1 opens with training in Arduino circuits and AI, and every student gets
          their own kit before the build begins.
        </p>
      </Section>

      <Section tone="white" id="kit">
        <Heading label="Your kit" index="03" lines={["The full kit.", "Yours to keep."]} />
        <p className="-mt-6 mb-10 max-w-2xl text-xl leading-snug text-ink-muted">
          Every student gets a kit of their own. {kitComponentCount} components, from the boards to the batteries. You
          build with every one of them, and every one goes home with you.
        </p>
        <KitFlow />
        <KitGrid />
      </Section>

      <Section tone="linen">
        <Heading label="The format" index="04" lines={["Two days.", "10 am to 7 pm."]} />
        <DayPlan
          days={[
            {
              label: "Day 1.",
              text: "Training in Arduino circuits and AI. You lock in your problem statement. The build begins.",
            },
            { label: "Day 2.", text: "Build, test, break, rebuild. Final demos before the judges." },
          ]}
        />
      </Section>

      <Section tone="linen" className="!pt-0">
        <Heading label="How builds are judged" index="05" lines={["Judged on what works.", "Not on what was planned."]} />
        <NumberedList
          items={[
            "It works, live, in front of the judges.",
            "It solves the problem you chose.",
            "You can explain every part of how it works.",
            "You built it here, yourself, in two days.",
          ]}
        />
      </Section>

      <Section tone="ink">
        <Heading label="What is at stake" index="06" lines={["₹20,000 prize pool.", "Top 3 projects win."]} tone="mint" />
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
                <p className={`mt-3 text-base ${i === 0 ? "text-ink/80" : "text-white/70"}`}>Cash prize.</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="mt-8 max-w-3xl text-xl leading-snug text-white sm:text-2xl">
          The best builders also earn internship opportunities with stalwarts in AI and engineering.
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

        <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <p className="label text-mint">The certificate</p>
            <Stack lines={["Signed.", "Stamped.", "Numbered."]} className="mt-6 text-5xl text-white sm:text-7xl" />
            <p className="mt-6 max-w-md text-xl leading-snug text-white/85">
              Every student gets a BeOutlier Certificate of Achievement. It names the robot you built, so it reads as proof
              of work, not proof of attendance.
            </p>
            <ul className="mt-8 border-t border-white/30">
              {certificateFacts.map((t, i) => (
                <li key={t} className="flex items-baseline gap-5 border-b border-white/15 py-3.5">
                  <span className="display w-8 shrink-0 text-2xl text-mint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-medium text-white">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Certificate
            number="BO HACK 2026 0001"
            event="at the BeOutlier Robotics and AI Hackathon, Mumbai, December 2026."
            className="lg:rotate-[-1.2deg]"
          />
        </div>
      </Section>

      <Section tone="linen">
        <Heading label="Who you build with" index="07" lines={["IIT Bombay alumni", "who build this for fun."]} />
        <MentorRail people={peopleFor("hackathon", "mentor")} rows={1} showIitb label="Hackathon mentors" />
      </Section>

      <Section tone="white">
        <Heading label="For parents" index="08" lines={[]} className="!mb-6" />
        <InfoTable
          caption="Hackathon details for parents"
          rows={[
            { label: "Venue", value: `${p.venue}.` },
            { label: "Timings", value: "10 am to 7 pm, both days." },
            { label: "Format", value: "Every student builds their own robot." },
            { label: "Included", value: `The full kit, ${kitComponentCount} components. Your child keeps it.` },
            { label: "Certificate", value: "A numbered BeOutlier certificate, signed and stamped, for every student." },
            { label: "Meals", value: "Not included. Please send a packed lunch and water." },
            { label: "Supervision", value: "1 mentor for every 9 students." },
            { label: "Fee", value: `${fee} per student. Paid online at booking.` },
          ]}
        />
      </Section>

      <CloseBlock program={p} lines={[`${seatsText(p)}`, `${p.seats.total} robots.`, "Then it closes."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
