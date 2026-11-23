import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/media/Marquee";
import { LazyVideo } from "@/components/media/LazyVideo";
import { HeroVideo } from "@/components/media/HeroVideo";
import { VideoSlider } from "@/components/media/VideoSlider";
import { DropCard, TopStrip } from "@/components/sections/Cards";
import { HousePanels } from "@/components/sections/HousePanels";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { ParentsComparison } from "@/components/sections/ParentsComparison";
import { Certificate } from "@/components/sections/Certificate";
import { ParentStudentToggle } from "@/components/mode/ParentStudentToggle";
import { getProgram, houses } from "@/content/programs";
import { peopleFor } from "@/content/people";
import {
  fleaMarketPhotos,
  homeHero,
  houseImages,
  parentTestimonials,
  storyVideo,
  studentInterviews,
} from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "BeOutlier. A school beyond classrooms." },
  description: "Experiential learning for India's curious teenagers. Summer 2027. Three houses. Pick one.",
  alternates: { canonical: "/" },
};

/** The full stop as the outlier: a mint dot. */
function OutlierStop({ onMint = false }: { onMint?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-[0.06em] inline-block size-[0.2em] rounded-full align-baseline ${
        onMint ? "bg-ink" : "bg-mint ring-[0.03em] ring-ink/40"
      }`}
    />
  );
}

const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 18, label: "Brands built by students" },
  { to: 5, prefix: "₹", suffix: "L+", label: "Earned by their brands" },
  { to: 45, label: "Outliers in the community" },
  { to: 15, suffix: "%", label: "Acceptance rate" },
];

const TAKE_HOME = [
  "The project you built. Yours to keep.",
  "A documentation journal.",
  "A detailed evaluation report.",
  "Access to the Level 2 Accelerator program.",
];

export default function HomePage() {
  const hackathon = getProgram("hackathon");
  const summer = houses();
  /** Once a desktop video is set in content/media.ts, desktop goes full bleed too. */
  const fullBleedDesktop = Boolean(homeHero.desktop);
  const panels = summer.map((p) => ({ program: p, image: houseImages[p.house as keyof typeof houseImages] }));

  return (
    <>
      {hackathon ? <TopStrip program={hackathon} /> : null}

      <div className="border-b border-ink/15 bg-white">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="label hidden items-center gap-2.5 sm:flex">
            <span className="dot" aria-hidden="true" />
            Summer 2027 <span className="opacity-55">· Mumbai · Pune · Goa</span>
          </p>
          <ParentStudentToggle />
        </div>
      </div>

      {/* Hero. Phone: the vertical video full bleed with the title layered on it.
          Desktop: white band, oversized type and student photos, until a desktop video is set. */}
      <section
        className={`relative isolate overflow-hidden bg-ink text-white ${fullBleedDesktop ? "" : "lg:bg-white lg:text-ink"}`}
      >
        {homeHero.mobile || homeHero.desktop ? (
          <div className={fullBleedDesktop ? "" : "lg:hidden"}>
            <HeroVideo mobile={homeHero.mobile} desktop={homeHero.desktop} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/90" />
          </div>
        ) : null}
        <div
          className={`shell relative grid min-h-[calc(100svh-11rem)] content-end gap-12 py-12 sm:py-16 ${
            fullBleedDesktop
              ? "lg:min-h-[86svh] lg:py-24"
              : "lg:min-h-0 lg:grid-cols-[1.5fr_1fr] lg:content-center lg:items-end lg:py-20"
          }`}
        >
          <div className="[text-shadow:0_2px_24px_rgb(26_28_30/0.5)] lg:[text-shadow:none]">
            <p className="label flex items-center gap-2.5 text-white/80 sm:hidden">
              <span className="dot" aria-hidden="true" />
              Summer 2027 <span className="opacity-60">· Mumbai · Pune · Goa</span>
            </p>
            <h1 className="display mt-5 text-[4rem] leading-[0.86] sm:mt-0 sm:text-9xl lg:text-[clamp(120px,11.5vw,200px)] parent:text-6xl parent:sm:text-8xl">
              <span className="block">A school</span>
              <span className="block">beyond</span>
              <span className="block whitespace-nowrap">
                classrooms<span className="sr-only">.</span>
                <OutlierStop />
              </span>
            </h1>
            <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-md text-xl font-medium leading-snug sm:text-2xl lg:text-3xl">
                Experiential learning for India&apos;s curious teenagers.
              </p>
              <div>
                <span className={fullBleedDesktop ? "" : "lg:hidden"}>
                  <ButtonLink href="/apply" variant="mint" size="lg">
                    {site.primaryCta}
                  </ButtonLink>
                </span>
                {fullBleedDesktop ? null : (
                  <span className="hidden lg:inline-block">
                    <ButtonLink href="/apply" variant="ink" size="lg">
                      {site.primaryCta}
                    </ButtonLink>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={fullBleedDesktop ? "hidden" : "relative hidden lg:block"}>
            {/* Desktop only, so phones never download these */}
            <div className="grid h-[36rem] grid-cols-2 grid-rows-[1.2fr_1fr] gap-2">
              {fleaMarketPhotos.map((ph, i) => (
                <div key={ph.src} className={`grain relative overflow-hidden bg-ink ${i === 0 ? "col-span-2" : ""}`}>
                  <Image src={ph.src} alt={ph.alt} fill loading="lazy" sizes="26vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee tone="ink" text="Not just a summer camp. Not a course. A community. An experiential school." />

      {/* Sections reorder in parent mode: parents first, then the houses and the proof. */}
      <div className="flex flex-col">
        <Section tone="white" className="parent:order-9">
          <Reveal>
            <Eyebrow label="01" />
            <Stack
              lines={["Teenagers know a lot.", "They rarely get to use it."]}
              className="mt-8 max-w-6xl text-[3.2rem] sm:text-8xl lg:text-[clamp(96px,9vw,150px)]"
            />
            <div className="mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 sm:gap-14">
              <p className="text-xl leading-snug text-ink-muted sm:text-2xl">
                Not for lack of ability. For lack of a place to try.
              </p>
              <p className="display text-5xl sm:text-6xl">
                <span className="mark">We built that place.</span>
              </p>
            </div>
          </Reveal>
        </Section>

        {/* 02. Where it started: the vision, the story, and the video in its own frame */}
        <Section tone="mint" className="parent:order-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow label="Where it started" index="02" />
              <h2 className="display mt-8 text-[2.9rem] leading-[0.92] sm:text-7xl lg:text-[clamp(72px,6.4vw,112px)]">
                A generation of problem solvers and change makers who dare to question, and create.
              </h2>
              <div className="mt-12 grid max-w-2xl gap-6 border-t border-ink pt-8 sm:grid-cols-2 sm:gap-10">
                <p className="display text-3xl leading-[1] sm:text-4xl">
                  In 2025, 45 teenagers built brands from scratch in 10 days.
                </p>
                <div className="grid gap-4 text-lg leading-snug">
                  <p>They sourced, priced, pitched and sold to strangers.</p>
                  <p className="font-semibold">Some sold out. Some lost money. Every one of them knows why.</p>
                </div>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="grain relative aspect-[9/14] overflow-hidden border border-ink bg-ink">
                <LazyVideo
                  src={storyVideo.mp4}
                  poster={storyVideo.poster}
                  label="The 2025 flea market, where students sold the brands they built"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="label mt-3 flex items-center gap-2.5">
                <span className="dot" aria-hidden="true" />
                Flea market · Summer 2025 · Mumbai
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* The numbers */}
        <section className="border-b border-ink/15 bg-white text-ink parent:order-7" aria-label="BeOutlier in numbers">
          <div className="shell">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col-reverse gap-2 py-10 sm:py-14 ${i % 2 === 1 ? "border-l border-ink/15 pl-5 sm:pl-8" : ""} ${
                    i >= 2 ? "border-t border-ink/15 lg:border-t-0" : ""
                  } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
                >
                  <dt className="label text-ink-muted">{s.label}</dt>
                  <dd className="display text-6xl leading-none sm:text-8xl">
                    <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The closest opportunity, just before the houses */}
        {hackathon ? (
          <Section tone="ink" className="parent:order-8">
            <DropCard program={hackathon} eyebrow="Next up · Robotics Hackathon" />
          </Section>
        ) : null}

        <Section tone="white" className="parent:order-2" id="houses">
          <Eyebrow label="The houses" index="03" />
          <Stack
            lines={["Summer 2027.", "Three houses.", "Pick one."]}
            className="mt-8 mb-14 text-[3.2rem] sm:text-8xl lg:text-[clamp(96px,9vw,150px)]"
          />
          <HousePanels panels={panels} />
        </Section>

        <Section tone="linen" className="parent:order-10">
          <Eyebrow label="Who you build with" index="04" />
          <Stack lines={["Not teachers.", "People who have done it."]} className="mt-8 mb-14 text-5xl sm:text-8xl" />
          <FacesGrid people={peopleFor("home", "mentor")} />
        </Section>

        <Section tone="ink" className="parent:order-11">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow label="In their words" index="05" tone="mint" />
              <Stack lines={["Hear it from", "the Outliers."]} className="mt-8 text-5xl sm:text-8xl" />
            </div>
            <p className="max-w-xs text-lg text-white/70">
              Straight from{" "}
              <a href={site.instagram.href} target="_blank" rel="noopener noreferrer" className="text-mint underline decoration-mint/40 underline-offset-4 hover:decoration-mint">
                {site.instagram.display}
              </a>
            </p>
          </div>
          <div className="mt-12">
            <VideoSlider items={studentInterviews} label="Student interviews" placeholder="Student interview" tone="dark" />
          </div>
        </Section>

        <Section tone="white" className="parent:order-3">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow label="Parent testimonials" index="06" />
              <Stack lines={["Parents, in their", "own words."]} className="mt-8 text-5xl sm:text-8xl" />
            </div>
            <p className="max-w-xs text-lg text-ink-muted">Seven families. Unscripted.</p>
          </div>
          <div className="mt-12">
            <VideoSlider items={parentTestimonials} label="Parent testimonials" placeholder="Parent testimonial" />
          </div>
        </Section>

        <Section tone="linen" className="parent:order-4">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow label="What you take home" index="07" />
              <Stack lines={["Proof of work.", "Not proof of", "attendance."]} className="mt-8 text-5xl sm:text-7xl" />
              <p className="mt-6 max-w-md text-xl leading-snug">
                A certificate backed by what you built and how it was evaluated. The kind of proof that makes a profile
                stand out.
              </p>
              <ul className="mt-10 border-t border-ink">
                {TAKE_HOME.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-5 border-b border-ink/20 py-4">
                    <span className="display w-8 shrink-0 text-2xl text-mint-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal>
              <Certificate className="lg:rotate-[-1.2deg]" />
            </Reveal>
          </div>
        </Section>

        <Section tone="white" className="parent:order-5">
          <Eyebrow label="How you get in" index="08" />
          <div className="mt-10">
            <AdmissionSteps variant="full" />
          </div>
        </Section>

        <Section tone="sand" id="parents" className="parent:order-1">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow label="For parents" index="09" />
              <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-8 text-5xl sm:text-7xl" />
              <p className="mt-6 max-w-xl text-xl sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
            </div>
            <ButtonLink href="/parents" variant="ink">
              For Parents
            </ButtonLink>
          </div>
          <ParentsComparison />
        </Section>

        <section className="bg-mint text-ink parent:order-12">
          <div className="shell py-28 sm:py-44">
            <Eyebrow label="10" />
            <h2 className="display mt-8 max-w-6xl text-[3.6rem] leading-[0.9] sm:text-8xl lg:text-[clamp(110px,11vw,190px)]">
              <span className="block">Average is crowded.</span>
              <span className="block">
                Be an Outlier<span className="sr-only">.</span>
                <OutlierStop onMint />
              </span>
            </h2>
            <div className="mt-14">
              <ButtonLink href="/apply" variant="ink" size="lg">
                {site.primaryCta}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
