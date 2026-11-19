import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Placeholder, StatusBadge, Stack } from "@/components/ui/bits";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { LazyVideo } from "@/components/media/LazyVideo";
import { ctaLabel, type Program } from "@/content/programs";
import { microcopy } from "@/content/microcopy";

/** One button hero for landing pages. The button scrolls to the form. */
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
  return (
    <section className="relative overflow-hidden bg-navy text-offwhite">
      <div className="shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow label={program.houseName ?? "Drop"} index={program.season === "summer-2027" ? "Summer 2027" : program.datesLine ?? ""} tone="mint" />
            <StatusBadge status={program.status} />
          </div>
          <Stack as="h1" lines={lines} className="mt-5 text-[3.4rem] sm:text-8xl" />
          <div className="mt-6 flex flex-col gap-2 text-base leading-snug font-medium text-offwhite/90 sm:text-lg">
            {facts.map((f, i) => (
              <p key={i} className={i === facts.length - 1 ? "heavy text-lg text-mint sm:text-xl" : ""}>
                {f}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="#apply" variant="coral" size="lg" onDark>
              {ctaLabel(program)}
            </ButtonLink>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-offwhite/20 shadow-hard sm:aspect-[4/4] lg:aspect-[4/5]">
            {video ? (
              <LazyVideo src={video.mp4} poster={video.poster} label={`${program.title} video`} eager className="absolute inset-0 size-full object-cover" />
            ) : media ? (
              <Image src={media.src} alt={media.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-6 text-offwhite/80">
                <Placeholder block>{microcopy.placeholders.video}</Placeholder>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The one form on a landing page, under #apply. */
export function FormSection({ program, heading }: { program: Program; heading?: string }) {
  return (
    <section id="apply" className="scroll-mt-4 bg-navy text-offwhite">
      <div className="shell grid gap-8 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <Eyebrow label={program.title} tone="mint" />
          <Stack lines={[heading ?? ctaLabel(program)]} className="mt-4 text-5xl sm:text-7xl" />
          {program.selective ? (
            <p className="heavy mt-5 text-xl leading-tight text-mint">Applying takes 5 minutes. Getting in doesn&apos;t.</p>
          ) : null}
        </div>
        <ApplicationForm mode={program.formType} programId={program.id} />
      </div>
    </section>
  );
}

/** Coral close block: one line, one button. */
export function CloseBlock({ lines, program }: { lines: string[]; program: Program }) {
  return (
    <section className="bg-coral text-navy on-coral">
      <div className="shell py-20 text-center sm:py-28">
        <Stack lines={lines} className="mx-auto max-w-5xl text-5xl sm:text-8xl" />
        <div className="mt-10">
          <ButtonLink href="#apply" variant="navy" size="lg">
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
  tone = "navy",
  className = "",
}: {
  label: string;
  index?: string;
  lines: ReactNode[];
  tone?: "navy" | "mint" | "light" | "coral";
  className?: string;
}) {
  return (
    <div className={`mb-10 ${className}`}>
      <Eyebrow label={label} index={index} tone={tone} />
      {lines.length ? <Stack lines={lines} className="mt-4 text-5xl sm:text-7xl" /> : null}
    </div>
  );
}
