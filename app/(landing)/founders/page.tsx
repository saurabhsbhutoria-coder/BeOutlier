import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CloseBlock, FormSection, Heading, VideoHero } from "@/components/sections/Landing";
import { MentorRail } from "@/components/sections/MentorRail";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { Certificate } from "@/components/sections/Certificate";
import { CampusGrid } from "@/components/sections/Campuses";
import { InfoTable } from "@/components/ui/Lists";
import { Section } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/media/Marquee";
import { StoryVideo } from "@/components/media/StoryVideo";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, feeText, getProgram } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { foundersHero, foundersMedia as m } from "@/content/media";

const program = getProgram("founders");

export const metadata: Metadata = {
  title: "Founders Fellowship. A startup fellowship for teenagers.",
  description:
    "A 10 day startup fellowship for teenagers in grades 6 to 12, in Mumbai and Pune. Seed capital, a dedicated mentor, vendor access, 8 masterclasses and a citywide flea market scouted by incubators and micro VCs. Only 15 of every 100 get in.",
  alternates: { canonical: "/founders" },
};

/** What every fellow gets (BeOutlier, 27 November 2026). */
const gets = [
  { title: "Seed capital.", text: "Your team starts with money to source and build. What you earn at the stall is yours." },
  { title: "A dedicated mentor.", text: "One mentor works with your team through all ten days. 1 mentor for every 9 students." },
  { title: "Vendor access.", text: "Wholesale markets and the vendors in them. You source and negotiate yourself." },
  { title: "8 masterclasses.", text: "Consulting, design thinking, AI research, pricing, branding, selling. Each one used on your brand the same day." },
  { title: "The network.", text: "Mentors, investors, alumni and every cohort that comes after you." },
  { title: "Exposure, early.", text: "Pitching to investors and selling to strangers, years before college." },
];

type Media =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "video"; mp4: string; poster: string; width: number; height: number; hasAudio: boolean; label: string };

interface Step {
  when: string;
  title: string;
  text: string;
  chips?: string[];
  media?: Media;
  /** A big figure beside steps that have no photo or video */
  stat?: { big: string; small: string };
}

/** Start to finish, in order. Day numbers follow the 10 day plan in CLAUDE.md section 9. */
const steps: Step[] = [
  {
    when: "Before you start",
    title: "Selection.",
    text: "Apply in 5 minutes. Then an aptitude test with nothing to memorise, a screening call and a letter. Only 15 of every 100 make it.",
    chips: ["Apply", "Aptitude test", "Screening call", "A letter"],
    stat: { big: "15", small: "of every 100 make it" },
  },
  {
    when: "Day 1",
    title: "Your team. Your mentor. Your seed capital.",
    text: "Orientation on campus. You meet the team you will build with and the mentor who stays with you for all ten days. Your team gets its seed capital.",
    media: { kind: "photo", ...m.mentor },
  },
  {
    when: "Days 1 to 8",
    title: "Eight masterclasses.",
    text: "Every day, a masterclass from 11 am to 1 pm, taught through real cases. Then a workshop from 2 pm to 4 pm, where you use it on your own brand.",
    chips: [
      "Problem solving like a consultant",
      "Design thinking",
      "Market research with AI tools",
      "Pricing and unit economics",
      "Sourcing and vendor negotiation",
      "Customer personas",
      "Branding",
      "How to sell",
    ],
    media: { kind: "photo", ...m.team },
  },
  {
    when: "Day 5",
    title: "Into the market.",
    text: "Your team goes to the wholesale market on its own budget. You find suppliers, compare prices and negotiate with vendors, yourselves.",
    media: { kind: "video", ...m.marketReel, label: "Students negotiating with vendors in the wholesale market" },
  },
  {
    when: "Days 6 to 8",
    title: "Build the brand.",
    text: "Name, product, packaging and price, built from a blank page. By the end of day 8 it is ready to sell.",
    media: { kind: "video", ...m.pitchReel, label: "Students building their brands during the fellowship" },
  },
  {
    when: "Day 9",
    title: "Demo Day.",
    text: "Every team pitches its brand to investors and answers their questions.",
    media: { kind: "photo", ...m.session },
  },
  {
    when: "The finale",
    title: "The flea market.",
    text: "Every cohort in the city sells at one grand flea market, open to the public. Incubators and micro VCs come to scout.",
    media: { kind: "photo", ...m.flea[3] },
  },
  {
    when: "After",
    title: "What comes next.",
    text: "The strongest teams get a route to capital from incubators and micro VCs, to take their brand further as a startup. Every fellow gets access to Level 2, the 9 month accelerator.",
    stat: { big: "Level 2", small: "The 9 month accelerator" },
  },
];

function StepMedia({ media }: { media: Media }): ReactNode {
  if (media.kind === "video") {
    return (
      <div className="mx-auto w-full max-w-[340px] rounded-[22px] bg-ink p-2 shadow-[0_30px_70px_-35px_rgb(0_0_0/0.6)]">
        <StoryVideo
          src={media.mp4}
          poster={media.poster}
          width={media.width}
          height={media.height}
          hasAudio={media.hasAudio}
          label={media.label}
          className="rounded-2xl"
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink">
      <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
    </div>
  );
}

/**
 * Rebuilt 27 November 2026 to match the hackathon page: full bleed video hero,
 * numbered sections, a plain spoken tone. Every fact is from CLAUDE.md
 * section 9 and content/programs.ts.
 */
export default function FoundersPage() {
  if (!program) notFound();
  const p = program;
  const fee = feeText(p.fee);

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <VideoHero
        program={p}
        lines={["Your first startup.", "Before 18."]}
        mobile={foundersHero.mobile}
        desktop={foundersHero.desktop}
        facts={[
          `Founders Fellowship. 10 days for teenagers in ${eligibilityText(p.eligibility).toLowerCase()}.`,
          `Mumbai and Pune. Summer 2027. Only 15 of every 100 get in.`,
        ]}
      />

      <Section tone="white">
        <Heading label="The fellowship" index="01" lines={["A startup fellowship", "for teenagers."]} />
        <Reveal>
          <p className="-mt-4 max-w-4xl text-2xl leading-snug sm:text-3xl">
            Ten days, offline, for students in grades 6 to 12. You form a team, build a brand from a blank page, source
            it, price it, pitch it to investors and sell it to the public. Nothing here is a simulation.
          </p>
        </Reveal>
      </Section>

      <Section tone="ink">
        <Heading label="What every fellow gets" index="02" lines={["Six things.", "From day 1."]} tone="mint" />
        <ul className="grid gap-x-10 border-t border-white/25 sm:grid-cols-2 lg:grid-cols-3">
          {gets.map((g, i) => (
            <li key={g.title} className="border-b border-white/15 py-7">
              <p className="label text-white/50">{String(i + 1).padStart(2, "0")}</p>
              <p className="display mt-3 text-3xl text-white sm:text-4xl">{g.title}</p>
              <p className="mt-2 max-w-sm text-base leading-snug text-white/70">{g.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="start-to-finish">
        <Heading label="Start to finish" index="03" lines={["From the application", "to the flea market."]} />
        <ol className="relative">
          {steps.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.title} className="grid gap-8 border-t border-ink py-10 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={flip && (s.media || s.stat) ? "lg:order-2" : ""}>
                  <p className="label flex items-center gap-3 text-mint-deep">
                    <span className="display text-3xl text-ink">{String(i + 1).padStart(2, "0")}</span>
                    {s.when}
                  </p>
                  <p className="display mt-5 text-4xl leading-[0.95] sm:text-6xl">{s.title}</p>
                  <p className="mt-5 max-w-xl text-lg leading-snug text-ink-muted sm:text-xl">{s.text}</p>
                  {s.chips ? (
                    <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li key={c} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-sm">
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {s.media ? (
                  <Reveal className={flip ? "lg:order-1" : ""}>
                    <StepMedia media={s.media} />
                  </Reveal>
                ) : s.stat ? (
                  <div className={`rounded-[22px] bg-mint p-8 sm:p-10 ${flip ? "lg:order-1" : ""}`}>
                    <p className="display text-[clamp(88px,11vw,160px)] leading-[0.85]">{s.stat.big}</p>
                    <p className="label mt-4 text-ink/75">{s.stat.small}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="ink">
        <Heading label="The flea market" index="04" lines={["One city.", "Every cohort.", "One market."]} tone="mint" />
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xl leading-snug text-white sm:text-2xl">
              Every Mumbai campus sells at one grand flea market, and every Pune campus at another. Open to the public.
            </p>
            <p className="mt-6 text-xl leading-snug text-white/75 sm:text-2xl">
              Incubators and micro VCs come to scout the strongest teams, and help them with access to capital to take it
              further as a startup.
            </p>
            <p className="display mt-10 text-4xl text-mint sm:text-5xl">
              Some teams sell out. Some lose money. Every team knows why.
            </p>
          </div>
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {m.flea.slice(0, 3).map((ph, i) => (
                <div key={ph.src} className={`relative overflow-hidden rounded-[22px] bg-white/5 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image src={ph.src} alt={ph.alt} fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 92vw" : "(min-width: 1024px) 25vw, 46vw"} className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="linen">
        <Heading label="Who you learn from" index="05" lines={["People who have", "built things."]} />
        <p className="-mt-6 mb-10 text-xl text-ink-muted">1 mentor for every 9 students.</p>
        <MentorRail people={peopleFor("founders", "mentor")} rows={1} label="Founders Fellowship mentors" />
      </Section>

      <Section tone="white" id="campuses">
        <Heading label="Campuses for Summer 2027" index="06" lines={["Six campuses.", "Pick the one near you."]} />
        <p className="-mt-6 mb-10 max-w-2xl text-xl leading-snug text-ink-muted">
          The same fellowship and the same bar at every campus. Exact dates will be announced. Tap a campus to open it in
          Google Maps.
        </p>
        <CampusGrid campuses={p.campuses ?? []} />
      </Section>

      <div className="bg-white pb-6">
        <div className="shell">
          <p className="label flex items-center gap-2.5">
            <span className="dot" aria-hidden="true" />
            Previously hosted at
          </p>
        </div>
        <Marquee
          tone="mint"
          className="mt-4"
          text="DSB International School. The Green Acres Academy. The NEXT School. Goregaon Sports Club."
        />
      </div>

      <Section tone="linen">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <Heading label="What you take home" index="07" lines={["Proof of work.", "Not proof of", "attendance."]} className="!mb-0" />
            <ul className="mt-10 border-t border-ink">
              {[
                "The brand you built, and what it earned.",
                "A documentation journal of everything you learned.",
                "A detailed evaluation report.",
                "A numbered BeOutlier certificate, signed and stamped.",
                "Access to Level 2, the 9 month accelerator.",
              ].map((t, i) => (
                <li key={t} className="flex items-baseline gap-5 border-b border-ink/20 py-4">
                  <span className="display w-8 shrink-0 text-2xl text-mint-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Certificate event="in the Founders Fellowship, House of Founders, Summer 2027." className="lg:rotate-[-1.2deg]" />
        </div>
      </Section>

      <Section tone="white">
        <Heading label="How you get in" index="08" lines={[]} className="!mb-6" />
        <AdmissionSteps variant="full" extraLine="Every campus, same bar." />
      </Section>

      <Section tone="linen">
        <Heading label="For parents" index="09" lines={[]} className="!mb-6" />
        <InfoTable
          caption="Founders Fellowship details for parents"
          rows={[
            { label: "Who", value: `Teenagers in ${eligibilityText(p.eligibility).toLowerCase()}.` },
            { label: "Format", value: "Day scholar. Your child goes home every evening." },
            { label: "Timings", value: "11 am to 4 pm, for 10 days." },
            { label: "Campuses", value: "5 in Mumbai, 1 in Pune. Pick the one closest to you." },
            { label: "Dates", value: "Announced soon." },
            { label: "Lunch", value: "Bring a tiffin, or opt into our meal plan." },
            { label: "Supervision", value: "1 mentor for every 9 students." },
            { label: "Seed capital", value: "Given to every team. What the team earns is theirs." },
            { label: "Fee", value: `${fee}.` },
          ]}
        />
      </Section>

      <CloseBlock program={p} lines={["Average is", "crowded."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}

