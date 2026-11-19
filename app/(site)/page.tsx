import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/media/Marquee";
import { ReelsFeed } from "@/components/media/ReelsFeed";
import { LazyVideo } from "@/components/media/LazyVideo";
import { HeroVideo } from "@/components/media/HeroVideo";
import { DropCard, HouseCard, TopStrip } from "@/components/sections/Cards";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { ParentsBlock } from "@/components/sections/ParentsBlock";
import { ParentStudentToggle } from "@/components/mode/ParentStudentToggle";
import { getProgram, houses } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { fleaMarketPhotos, fleaMarketVideo, homeHero, reels } from "@/content/media";
import { microcopy } from "@/content/microcopy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "BeOutlier. A school beyond classrooms." },
  description: "Experiential learning for India's outlier teenagers. Summer 2027. Three houses. Pick one.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const hackathon = getProgram("hackathon");
  const summer = houses();
  /** Once a desktop video is set in content/media.ts, desktop goes full bleed too. */
  const fullBleedDesktop = Boolean(homeHero.desktop);

  return (
    <>
      {hackathon ? <TopStrip program={hackathon} /> : null}

      <div className="border-b border-bone/10 bg-ink">
        <div className="shell flex justify-center py-3">
          <ParentStudentToggle />
        </div>
      </div>

      {/* Hero. Phone: the vertical video full bleed with the title layered on it.
          Desktop: typographic hero with student photos, until a desktop video is set. */}
      <section className="relative isolate overflow-hidden bg-ink text-bone">
        {homeHero.mobile || homeHero.desktop ? (
          <div className={fullBleedDesktop ? "" : "lg:hidden"}>
            <HeroVideo mobile={homeHero.mobile} desktop={homeHero.desktop} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
          </div>
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_at_top_right,rgb(108_212_177/0.10),transparent_55%)] lg:block"
        />
        <div
          className={`shell relative grid min-h-[calc(100svh-10rem)] content-end gap-12 py-12 sm:py-16 ${
            fullBleedDesktop
              ? "lg:min-h-[88svh] lg:py-24"
              : "lg:min-h-[82svh] lg:grid-cols-[1.35fr_1fr] lg:content-center lg:items-center lg:py-24"
          }`}
        >
          <div className="[text-shadow:0_2px_24px_rgb(26_28_30/0.6)] lg:[text-shadow:none]">
            <Eyebrow label="Mumbai · Pune · Goa" index="Summer 2027" tone="mint" />
            <Stack
              as="h1"
              lines={["A school", "beyond", "classrooms."]}
              className="mt-6 text-[3.85rem] sm:text-9xl lg:text-[8.25rem] parent:text-6xl parent:sm:text-8xl"
            />
            <p className="mt-7 max-w-xl text-lg leading-snug text-sand sm:text-2xl">
              Experiential learning for India&apos;s outlier teenagers.
            </p>
            <div className="mt-10">
              <ButtonLink href="/apply" variant="light" size="lg">
                {site.primaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className={fullBleedDesktop ? "hidden" : "relative hidden lg:block"}>
            {/* Desktop only, so phones never download these */}
            <div className="grid h-[34rem] grid-cols-2 grid-rows-2 gap-3">
              {fleaMarketPhotos.map((ph, i) => (
                <div
                  key={ph.src}
                  className={`relative overflow-hidden rounded-[14px] border border-bone/10 ${i === 0 ? "row-span-2" : ""}`}
                >
                  <Image src={ph.src} alt={ph.alt} fill loading="lazy" sizes="22vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee tone="sand" text="Not a summer camp. Not a coaching class. Not an online course. A school." />

      {/* Sections reorder in parent mode: For parents first, then the houses. */}
      <div className="flex flex-col">
        {hackathon ? (
          <section className="bg-ink-deep py-16 sm:py-24 parent:order-3">
            <div className="shell">
              <DropCard program={hackathon} eyebrow={`Drop · ${hackathon.datesLine}`} />
            </div>
          </section>
        ) : null}

        <Section tone="ink" className="text-center parent:order-4">
          <Reveal>
            <Eyebrow label="01" tone="light" className="justify-center" />
            <Stack
              lines={["Teenagers know a lot.", "They rarely get to use it."]}
              className="mx-auto mt-8 max-w-5xl text-5xl sm:text-8xl"
            />
            <p className="mx-auto mt-10 max-w-2xl text-xl leading-snug text-bone/70 sm:text-2xl">
              Not for lack of ability. For lack of a place to try.
            </p>
            <p className="display mt-10 text-5xl text-mint sm:text-7xl">We built that place.</p>
          </Reveal>
        </Section>

        <Section tone="deep" className="parent:order-5">
          <Eyebrow label="Where it started" index="02" tone="mint" />
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="display text-[8rem] leading-none text-sand sm:text-[12rem]">45</p>
              <p className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                In 2025, 45 teenagers built brands from scratch in 10 days.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-bone/70">They sourced, priced, pitched and sold to strangers.</p>
              <p className="mt-6 border-l border-mint pl-5 text-lg text-bone">
                Some sold out. Some lost money. Every one of them knows why.
              </p>
            </div>
            {fleaMarketVideo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-bone/10">
                <LazyVideo
                  src={fleaMarketVideo.mp4}
                  poster={fleaMarketVideo.poster}
                  label="The 2025 flea market"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ) : (
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-bone/10">
                  <Image
                    src={fleaMarketPhotos[1].src}
                    alt={fleaMarketPhotos[1].alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="label mt-4 !text-[10px] text-bone/40">{microcopy.placeholders.video}</p>
              </div>
            )}
          </div>
        </Section>

        <Section tone="ink" className="parent:order-2" id="houses">
          <div className="text-center">
            <Eyebrow label="The houses" index="03" tone="mint" className="justify-center" />
            <Stack lines={["Summer 2027.", "Three houses.", "Pick one."]} className="mt-8 text-5xl sm:text-8xl" />
          </div>
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {summer.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className="h-full">
                <HouseCard program={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="deep" className="parent:order-6">
          <Eyebrow label="Who you build with" index="04" tone="mint" />
          <Stack lines={["Not teachers.", "People who have done it."]} className="mt-6 mb-14 text-5xl sm:text-7xl" />
          <FacesGrid people={peopleFor("home", "mentor")} />
        </Section>

        <Section tone="ink" className="parent:order-7">
          <Eyebrow label="The Outliers" index="05" tone="mint" />
          <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-2">
            <p className="display text-[7rem] leading-none text-mint sm:text-[11rem]">150+</p>
            <p className="display max-w-xl pb-3 text-4xl sm:text-6xl">Outliers so far. This is what they made.</p>
          </div>
          <div className="mt-14">
            <ReelsFeed items={reels} />
          </div>
          <div className="mt-14">
            <FacesGrid people={peopleFor("home", "alumni")} />
          </div>
        </Section>

        <Section tone="deep" className="parent:order-8">
          <Eyebrow label="How you get in" index="06" tone="mint" />
          <div className="mt-8">
            <AdmissionSteps variant="full" />
          </div>
        </Section>

        <Section tone="sand" id="parents" className="parent:order-1">
          <Eyebrow label="For parents" index="07" />
          <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-6 text-5xl sm:text-7xl" />
          <p className="mt-6 text-xl text-ink/75 sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
          <div className="mt-14">
            <ParentsBlock />
          </div>
          <div className="mt-12">
            <ButtonLink href="/parents" variant="ink">
              For Parents
            </ButtonLink>
          </div>
        </Section>

        <section className="relative isolate overflow-hidden bg-ink text-bone parent:order-9">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgb(108_212_177/0.12),transparent_60%)]"
          />
          <div className="shell py-28 text-center sm:py-44">
            <Eyebrow label="08" tone="light" className="justify-center" />
            <Stack
              lines={["Not everyone gets in.", "That's the point."]}
              className="mx-auto mt-8 max-w-5xl text-5xl sm:text-[7.5rem]"
            />
            <div className="mt-14 flex justify-center">
              <ButtonLink href="/apply" variant="light" size="lg">
                {site.primaryCta}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
