import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, StatusBadge, Stack } from "@/components/ui/bits";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { LazyVideo } from "@/components/media/LazyVideo";
import { ctaLabel, type Program } from "@/content/programs";

/**
 * One button hero for landing pages. The button scrolls to the form.
 * With a photo or video it goes full bleed with the type layered on top;
 * without, it is a typographic hero on charcoal.
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
    <section className="relative isolate overflow-hidden bg-ink text-bone">
      {hasMedia ? (
        <div className={`absolute inset-0 -z-10 ${video ? "" : "lg:hidden"}`}>
          {video ? (
            <LazyVideo src={video.mp4} poster={video.poster} label={`${program.title} video`} eager className="absolute inset-0 size-full object-cover" />
          ) : media ? (
            <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" aria-hidden="true" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(108_212_177/0.10),transparent_60%)]"
        />
      )}
      <div className={`shell grid py-16 sm:py-24 ${hasMedia ? "min-h-[86svh] content-end" : "min-h-[78svh] content-center"} ${media && !video ? "lg:min-h-[80svh] lg:grid-cols-[1.4fr_1fr] lg:content-center lg:items-center lg:gap-16" : ""}`}>
        <div>
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow
            label={program.houseName ?? (program.datesLine ?? "")}
            index={program.season === "summer-2027" ? "Summer 2027" : "Drop"}
            tone="mint"
          />
          <StatusBadge status={program.status} />
        </div>
        <Stack as="h1" lines={lines} className="mt-6 max-w-6xl text-[3.25rem] sm:text-8xl lg:text-[8.5rem]" />
        <ul className="mt-10 grid max-w-4xl gap-px overflow-hidden rounded-[10px] border border-bone/10 bg-bone/10 sm:grid-cols-1">
          {facts.map((f, i) => (
            <li
              key={i}
              className={`bg-ink/80 px-5 py-3.5 text-[15px] leading-snug backdrop-blur-sm sm:text-base ${
                i === facts.length - 1 ? "font-semibold text-mint" : "text-bone/80"
              }`}
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="#apply" variant="light" size="lg">
            {ctaLabel(program)}
          </ButtonLink>
        </div>
        </div>
        {media && !video ? (
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[14px] border border-bone/10 lg:block">
            <Image src={media.src} alt="" fill sizes="35vw" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** The one form on a landing page, under #apply. */
export function FormSection({ program, heading }: { program: Program; heading?: string }) {
  return (
    <section id="apply" className="scroll-mt-4 border-t border-bone/10 bg-ink-deep text-bone">
      <div className="shell grid gap-10 py-20 sm:py-32 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-10">
          <Eyebrow label={program.title} tone="mint" />
          <Stack lines={[heading ?? ctaLabel(program)]} className="mt-5 text-5xl sm:text-7xl" />
          {program.selective ? (
            <p className="mt-6 text-lg leading-snug text-sand">Applying takes 5 minutes. Getting in doesn&apos;t.</p>
          ) : null}
        </div>
        <ApplicationForm mode={program.formType} programId={program.id} />
      </div>
    </section>
  );
}

/** Close block: one line, one button. */
export function CloseBlock({ lines, program }: { lines: string[]; program: Program }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-bone/10 bg-ink text-bone">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgb(217_203_184/0.12),transparent_65%)]"
      />
      <div className="shell py-28 text-center sm:py-40">
        <Stack lines={lines} className="mx-auto max-w-5xl text-5xl sm:text-8xl" />
        <div className="mt-12 flex justify-center">
          <ButtonLink href="#apply" variant="light" size="lg">
            {ctaLabel(program)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Section heading pair: eyebrow plus headline. */
export function Heading({
  label,
  index,
  lines,
  tone = "mint",
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
      {lines.length ? <Stack lines={lines} className="mt-5 text-5xl sm:text-7xl" /> : null}
    </div>
  );
}
