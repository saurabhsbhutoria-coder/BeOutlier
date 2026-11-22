import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/media/Marquee";
import { ReelsFeed } from "@/components/media/ReelsFeed";
import { LazyVideo } from "@/components/media/LazyVideo";
import { HeroVideo } from "@/components/media/HeroVideo";
import { DropCard, TopStrip } from "@/components/sections/Cards";
import { HousePanels } from "@/components/sections/HousePanels";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { ParentsBlock } from "@/components/sections/ParentsBlock";
import { ParentStudentToggle } from "@/components/mode/ParentStudentToggle";
import { getProgram, houses } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { fleaMarketPhotos, fleaMarketVideo, homeHero, houseImages, reels } from "@/content/media";
import { microcopy } from "@/content/microcopy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "BeOutlier. A school beyond classrooms." },
  description: "Experiential learning for India's outlier teenagers. Summer 2027. Three houses. Pick one.",
  alternates: { canonical: "/" },
};

/** The full stop as the outlier: a mint dot. */
function OutlierStop() {
  return (
    <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.2em] rounded-full bg-mint align-baseline ring-[0.03em] ring-ink/40" />
  );
}

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
                Experiential learning for India&apos;s outlier teenagers.
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

      <Marquee tone="ink" text="Not a summer camp. Not a coaching class. Not an online course. A school." />

      {/* Sections reorder in parent mode: For parents first, then the houses. */}
      <div className="flex flex-col">
        {hackathon ? (
          <Section tone="ink" className="border-t border-white/10 parent:order-3">
            <DropCard program={hackathon} eyebrow={`Drop · ${hackathon.datesLine}`} />
          </Section>
        ) : null}

        <Section tone="white" className="parent:order-4">
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

        <Section tone="mint" className="overflow-hidden parent:order-5">
          <Eyebrow label="Where it started" index="02" />
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
            <div>
              <p className="display text-[11rem] leading-[0.8] sm:text-[18rem] lg:text-[22rem]">45</p>
              <p className="display mt-8 max-w-xl text-4xl sm:text-5xl">
                In 2025, 45 teenagers built brands from scratch in 10 days.
              </p>
              <div className="mt-8 grid max-w-md gap-4 text-lg sm:text-xl">
                <p>They sourced, priced, pitched and sold to strangers.</p>
                <p className="font-semibold">Some sold out. Some lost money. Every one of them knows why.</p>
              </div>
            </div>
            {fleaMarketVideo ? (
              <div className="grain relative aspect-[4/5] overflow-hidden bg-ink">
                <LazyVideo
                  src={fleaMarketVideo.mp4}
                  poster={fleaMarketVideo.poster}
                  label="The 2025 flea market"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ) : (
              <div>
                <div className="grain relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src={fleaMarketPhotos[2].src}
                    alt={fleaMarketPhotos[2].alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="label mt-4 !text-[10px] text-ink/60">{microcopy.placeholders.video}</p>
              </div>
            )}
          </div>
        </Section>

        <Section tone="white" className="parent:order-2" id="houses">
          <Eyebrow label="The houses" index="03" />
          <Stack
            lines={["Summer 2027.", "Three houses.", "Pick one."]}
            className="mt-8 mb-14 text-[3.2rem] sm:text-8xl lg:text-[clamp(96px,9vw,150px)]"
          />
          <HousePanels panels={panels} />
        </Section>

        <Section tone="linen" className="parent:order-6">
          <Eyebrow label="Who you build with" index="04" />
          <Stack lines={["Not teachers.", "People who have done it."]} className="mt-8 mb-14 text-5xl sm:text-8xl" />
          <FacesGrid people={peopleFor("home", "mentor")} />
        </Section>

        <Section tone="ink" className="parent:order-7">
          <Eyebrow label="The Outliers" index="05" tone="mint" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <p className="display text-[9rem] leading-[0.8] text-mint sm:text-[16rem]">150+</p>
            <p className="display max-w-md pb-3 text-4xl sm:text-5xl">Outliers so far. This is what they made.</p>
          </div>
          <div className="mt-16">
            <ReelsFeed items={reels} />
          </div>
          <div className="mt-14">
            <FacesGrid people={peopleFor("home", "alumni")} tone="dark" />
          </div>
        </Section>

        <Section tone="white" className="parent:order-8">
          <Eyebrow label="How you get in" index="06" />
          <div className="mt-10">
            <AdmissionSteps variant="full" />
          </div>
        </Section>

        <Section tone="sand" id="parents" className="parent:order-1">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <Eyebrow label="For parents" index="07" />
              <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-8 text-5xl sm:text-7xl" />
              <p className="mt-6 max-w-sm text-xl sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
              <div className="mt-10">
                <ButtonLink href="/parents" variant="ink">
                  For Parents
                </ButtonLink>
              </div>
            </div>
            <ParentsBlock />
          </div>
        </Section>

        <section className="bg-mint text-ink parent:order-9">
          <div className="shell py-28 sm:py-44">
            <Eyebrow label="08" />
            <Stack
              lines={["Not everyone gets in.", "That's the point."]}
              className="mt-8 max-w-6xl text-[3.4rem] sm:text-8xl lg:text-[clamp(110px,11vw,190px)]"
            />
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
