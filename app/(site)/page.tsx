import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Placeholder, Section, Stack } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/media/Marquee";
import { ReelsFeed } from "@/components/media/ReelsFeed";
import { LazyVideo } from "@/components/media/LazyVideo";
import { DropCard, HouseCard, TopStrip } from "@/components/sections/Cards";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { ParentStudentToggle } from "@/components/mode/ParentStudentToggle";
import { dropOrder, feeText, getProgram, houses, type Program } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { fleaMarketPhotos, fleaMarketVideo, heroVideos, reels } from "@/content/media";
import { microcopy } from "@/content/microcopy";
import { site } from "@/content/site";
import { ParentsBlock } from "@/components/sections/ParentsBlock";

export const metadata: Metadata = {
  title: { absolute: "BeOutlier. A school beyond classrooms." },
  description: "Experiential learning for India's outlier teenagers. Summer 2027. Three houses. Pick one.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const hackathon = getProgram("hackathon");
  const summer = houses();
  const heroVideo = heroVideos.home;

  return (
    <>
      {hackathon ? <TopStrip program={hackathon} /> : null}

      <div className="border-b-2 border-navy bg-stone">
        <div className="shell flex justify-center py-3">
          <ParentStudentToggle />
        </div>
      </div>

      {/* Hero */}
      <section className="on-coral overflow-hidden bg-coral text-navy parent:bg-offwhite">
        <div className="shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-24">
          <div>
            <Eyebrow label="Summer 2027" index="Mumbai · Pune · Goa" className="!text-navy" />
            <Stack
              as="h1"
              lines={["A school", "beyond", "classrooms."]}
              className="mt-5 text-[4.2rem] sm:text-9xl parent:text-6xl parent:sm:text-8xl"
            />
            <p className="heavy mt-6 max-w-xl text-xl leading-tight sm:text-2xl">
              Experiential learning for India&apos;s outlier teenagers.
            </p>
            <div className="mt-8">
              <ButtonLink href="/apply" variant="navy" size="lg">
                {site.primaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            {heroVideo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-navy shadow-[8px_8px_0_0_var(--color-navy)]">
                <LazyVideo src={heroVideo.mp4} poster={heroVideo.poster} label="Students at BeOutlier" eager className="absolute inset-0 size-full object-cover" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-2">
                {fleaMarketPhotos.map((ph, i) => (
                  <div
                    key={ph.src}
                    className={`relative aspect-[3/4] overflow-hidden rounded-[14px] border-2 border-navy ${
                      i === 0 ? "lg:col-span-2 lg:aspect-[16/11]" : ""
                    } ${i === 1 ? "rotate-[-1.5deg] parent:rotate-0" : ""} ${i === 2 ? "rotate-[1.5deg] parent:rotate-0" : ""}`}
                  >
                    <Image
                      src={ph.src}
                      alt={ph.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 30vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Marquee text="Not a summer camp. Not a coaching class. Not an online course. A school." />

      {/* Sections reorder in parent mode: For parents first, then the houses. */}
      <div className="flex flex-col">
        {hackathon ? (
          <section className="bg-offwhite py-14 sm:py-20 parent:order-3">
            <div className="shell">
              <DropCard program={hackathon} eyebrow={`Drop · ${hackathon.datesLine}`} />
            </div>
          </section>
        ) : null}

        <Section tone="light" className="parent:order-4">
          <Eyebrow label="01" />
          <Reveal>
            <Stack
              lines={[
                "Teenagers know a lot.",
                "They rarely get to use it.",
              ]}
              className="mt-4 text-5xl sm:text-8xl"
            />
            <p className="heavy mt-8 max-w-3xl text-2xl leading-tight sm:text-3xl">
              Not for lack of ability. For lack of a place to try.
            </p>
            <p className="display mt-6 text-5xl sm:text-7xl">
              <span className="mark">We built that place.</span>
            </p>
          </Reveal>
        </Section>

        <Section tone="navy" className="parent:order-5">
          <Eyebrow label="Where it started" index="02" tone="mint" />
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="display text-[7rem] leading-none text-coral sm:text-[10rem]">45</p>
              <p className="heavy mt-2 text-2xl leading-tight sm:text-3xl">
                In 2025, 45 teenagers built brands from scratch in 10 days.
              </p>
              <p className="mt-5 text-lg leading-snug text-offwhite/90">
                They sourced, priced, pitched and sold to strangers.
              </p>
              <p className="heavy mt-5 text-xl text-mint">Some sold out. Some lost money. Every one of them knows why.</p>
            </div>
            {fleaMarketVideo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-offwhite/20 shadow-hard">
                <LazyVideo src={fleaMarketVideo.mp4} poster={fleaMarketVideo.poster} label="The 2025 flea market" className="absolute inset-0 size-full object-cover" />
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-offwhite/20 shadow-hard">
                  <Image src={fleaMarketPhotos[1].src} alt={fleaMarketPhotos[1].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-3 font-mono text-xs text-offwhite/70">{microcopy.placeholders.video}</p>
              </div>
            )}
          </div>
        </Section>

        <Section tone="stone" className="parent:order-2" id="houses">
          <Eyebrow label="The houses" index="03" />
          <Stack lines={["Summer 2027.", "Three houses.", "Pick one."]} className="mt-4 text-5xl sm:text-8xl" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {summer.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="h-full">
                <HouseCard program={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="light" className="parent:order-6">
          <Eyebrow label="Who you build with" index="04" />
          <Stack lines={["Not teachers.", "People who have done it."]} className="mt-4 mb-10 text-5xl sm:text-7xl" />
          <FacesGrid people={peopleFor("home", "mentor")} />
        </Section>

        <Section tone="navy" className="parent:order-7">
          <Eyebrow label="The Outliers" index="05" tone="mint" />
          <p className="display mt-4 text-[6rem] leading-none text-mint sm:text-[9rem]">150+</p>
          <p className="display text-4xl sm:text-6xl">Outliers so far. This is what they made.</p>
          <div className="mt-10">
            <ReelsFeed items={reels} />
          </div>
          <div className="mt-10">
            <FacesGrid people={peopleFor("home", "alumni")} tone="dark" />
          </div>
        </Section>

        <Section tone="light" className="parent:order-8">
          <Eyebrow label="How you get in" index="06" />
          <div className="mt-4">
            <AdmissionSteps variant="full" />
          </div>
        </Section>

        <Section tone="mint" id="parents" className="parent:order-1">
          <Eyebrow label="For parents" index="07" className="!text-navy" />
          <Stack lines={["Everything you'd ask", "us on a call."]} className="mt-4 text-5xl sm:text-7xl" />
          <p className="heavy mt-5 text-xl sm:text-2xl">Fees. Safety. Supervision. What your child brings home.</p>
          <div className="mt-10">
            <ParentsBlock />
          </div>
          <div className="mt-8">
            <ButtonLink href="/parents" variant="navy">
              For Parents
            </ButtonLink>
          </div>
        </Section>

        <section className="on-coral bg-coral text-navy parent:order-9">
          <div className="shell py-20 text-center sm:py-28">
            <Eyebrow label="08" className="!text-navy" />
            <Stack lines={["Not everyone gets in.", "That's the point."]} className="mx-auto mt-4 max-w-5xl text-5xl sm:text-8xl" />
            <div className="mt-10">
              <ButtonLink href="/apply" variant="navy" size="lg">
                {site.primaryCta}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
