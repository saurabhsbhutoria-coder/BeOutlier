import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, StatusBadge, Stack } from "@/components/ui/bits";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { LazyVideo } from "@/components/media/LazyVideo";
import { HeroVideo } from "@/components/media/HeroVideo";
import { ctaLabel, type Program } from "@/content/programs";

/**
 * One button hero for landing pages, on the mint band. The button scrolls to the form.
 * A photo or video sits beside the headline on desktop and under it on phones.
 */
export function LandingHero({
  program,
  lines,
  facts,
  media,
  video,
}: {
  program: Program;
  /** Headline lines */
  lines: string[];
  /** Fact lines under the headline, word for word from CLAUDE.md */
  facts: ReactNode[];
  media?: { src: string; alt: string };
  video?: { mp4: string; poster: string };
}) {
  const hasMedia = Boolean(video || media);
  return (
    <section className="bg-mint text-ink">
      <div
        className={`shell grid gap-10 py-14 sm:py-20 lg:py-24 ${hasMedia ? "lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-16" : ""}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow
              label={program.houseName ?? (program.datesLine ?? "")}
              index={program.season === "summer-2027" ? "Summer 2027" : "Mumbai"}
            />
            <StatusBadge status={program.status} />
          </div>
          <Stack as="h1" lines={lines} className="mt-7 text-[3.3rem] sm:text-8xl lg:text-[8.5rem]" />
          <ul className="mt-10 max-w-3xl border-t border-ink">
            {facts.map((f, i) => (
              <li
                key={i}
                className={`border-b border-ink/25 py-3.5 text-base leading-snug sm:text-lg ${
                  i === facts.length - 1 ? "font-semibold" : ""
                }`}
              >
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="#apply" variant="ink" size="lg">
              {ctaLabel(program)}
            </ButtonLink>
          </div>
        </div>
        {hasMedia ? (
          <div className="grain relative aspect-[4/5] w-full max-w-md overflow-hidden bg-ink lg:max-w-none">
            {video ? (
              <LazyVideo
                src={video.mp4}
                poster={video.poster}
                label={`${program.title} video`}
                eager
                className="absolute inset-0 size-full object-cover"
              />
            ) : media ? (
              <Image src={media.src} alt={media.alt} fill priority sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Full bleed video hero, the same treatment as the Home hero: the video fills
 * the band (horizontal file on desktop, vertical on phones, only one downloads),
 * a dark gradient keeps white type readable, the headline and facts sit at the
 * bottom with one button to the form.
 */
export function VideoHero({
  program,
  lines,
  facts,
  tag,
  mobile,
  desktop,
}: {
  program: Program;
  lines: string[];
  facts: ReactNode[];
  /** Shown under the headline, e.g. the IIT Bombay tag */
  tag?: ReactNode;
  mobile: { mp4: string; poster: string };
  desktop: { mp4: string; poster: string };
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <HeroVideo mobile={mobile} desktop={desktop} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/95 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/55 lg:to-ink/20" />
      <div className="shell relative grid min-h-[calc(100svh-4rem)] content-end py-10 sm:py-14 lg:min-h-[calc(100svh-4rem)] lg:py-14">
        <div className="max-w-4xl [text-shadow:0_2px_24px_rgb(26_28_30/0.55)]">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow label={program.datesLine ?? program.title} index={program.placeLine} tone="light" />
            <StatusBadge status={program.status} />
          </div>
          <Stack
            as="h1"
            lines={lines}
            className="mt-5 text-[3.6rem] leading-[0.98] sm:text-8xl lg:text-[clamp(88px,8vw,140px)]"
          />
          {tag ? <div className="mt-7 [text-shadow:none] lg:mt-6">{tag}</div> : null}
          <ul className="mt-7 max-w-2xl border-t border-white/40 lg:mt-6">
            {facts.map((f, i) => (
              <li
                key={i}
                className={`border-b border-white/20 py-3 text-base leading-snug sm:text-lg lg:py-2.5 ${
                  i === facts.length - 1 ? "font-semibold" : "text-white/90"
                }`}
              >
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 [text-shadow:none] lg:mt-7">
            <ButtonLink href="#apply" variant="mint" size="lg">
              {ctaLabel(program)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The one form on a landing page, under #apply, on the sand band. */
export function FormSection({ program, heading }: { program: Program; heading?: string }) {
  return (
    <section id="apply" className="scroll-mt-4 bg-sand text-ink">
      <div className="shell grid gap-10 py-20 sm:py-32 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-10">
          <Eyebrow label={program.title} />
          <Stack lines={[heading ?? ctaLabel(program)]} className="mt-6 text-5xl sm:text-7xl" />
          {program.selective ? (
            <p className="mt-6 text-lg leading-snug sm:text-xl">Applying takes 5 minutes. Getting in doesn&apos;t.</p>
          ) : null}
        </div>
        <ApplicationForm mode={program.formType} programId={program.id} />
      </div>
    </section>
  );
}

/** Close block on the mint band: one line, one button. */
export function CloseBlock({ lines, program }: { lines: string[]; program: Program }) {
  return (
    <section className="bg-mint text-ink">
      <div className="shell py-28 sm:py-40">
        <Stack lines={lines} className="max-w-6xl text-[3.4rem] sm:text-8xl lg:text-[9rem]" />
        <div className="mt-12">
          <ButtonLink href="#apply" variant="ink" size="lg">
            {ctaLabel(program)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Section heading pair: label plus headline. */
export function Heading({
  label,
  index,
  lines,
  tone = "ink",
  className = "",
}: {
  label: string;
  index?: string;
  lines: ReactNode[];
  tone?: "ink" | "mint" | "light" | "sand";
  className?: string;
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <Eyebrow label={label} index={index} tone={tone} />
      {lines.length ? <Stack lines={lines} className="mt-6 text-5xl sm:text-7xl" /> : null}
    </div>
  );
}
