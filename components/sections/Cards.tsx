import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/bits";
import { ctaLabel, detailsLine, seatsText, type Program } from "@/content/programs";

/** Home top strip: "Robotics Hackathon. Mumbai. 26 and 27 December. 51 seats. [Book a seat]" */
export function TopStrip({ program }: { program: Program }) {
  const line = [program.title, program.placeLine, program.datesLine].filter(Boolean).join(". ") + ".";
  const seats = seatsText(program);
  return (
    <div className="border-b border-bone/10 bg-ink-deep text-bone">
      <div className="shell flex min-h-10 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center">
        <p className="label !text-[10px] text-bone/70 sm:!text-[11px]">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-mint align-middle" aria-hidden="true" />
          {line} {seats}
        </p>
        {program.status !== "sold_out" ? (
          <Link
            href={program.route}
            className="label !text-[10px] text-mint underline-offset-4 transition-colors hover:text-bone hover:underline sm:!text-[11px]"
          >
            {ctaLabel(program)} <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/** The latest drop, pinned first and largest. */
export function DropCard({ program, eyebrow }: { program: Program; eyebrow: string }) {
  const seats = seatsText(program);
  return (
    <article className="relative overflow-hidden rounded-[14px] border border-bone/10 bg-ink-soft p-7 text-bone sm:p-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-mint via-mint/40 to-transparent" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-3">
        <p className="label text-bone/55">[ {eyebrow} ]</p>
        <StatusBadge status={program.status} />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="display text-5xl sm:text-8xl">{program.title}</h2>
          <p className="mt-4 text-xl leading-snug text-sand sm:text-2xl">{program.tagline}</p>
        </div>
        <div className="flex flex-col gap-6 lg:items-end lg:text-right">
          <p className="label leading-relaxed text-bone/60">{detailsLine(program)}</p>
          {seats ? <p className="display text-4xl text-mint sm:text-5xl">{seats}</p> : null}
          <ButtonLink href={program.route} variant="light" size="lg">
            {ctaLabel(program)}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

/** One of the three Summer 2027 houses. */
export function HouseCard({ program, index }: { program: Program; index: number }) {
  return (
    <article className="group flex h-full flex-col rounded-[14px] border border-bone/10 bg-ink-soft p-7 text-bone transition-colors duration-300 hover:border-mint/40 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="label text-bone/50">[ {String(index).padStart(2, "0")} ]</span>
        <StatusBadge status={program.status} />
      </div>
      <p className="label mt-10 text-mint">{program.houseName}</p>
      <h3 className="display mt-3 text-6xl sm:text-7xl">{program.houseShort}</h3>
      <p className="mt-3 text-lg leading-tight text-sand">{program.title}</p>
      <p className="mt-6 text-base leading-relaxed text-bone/75">{program.cardLine}</p>
      <p className="label mt-8 border-t border-bone/10 pt-5 !text-[10px] leading-relaxed text-bone/55">
        {detailsLine(program)}
      </p>
      <div className="mt-auto pt-8">
        <ButtonLink href={program.route} variant="light" className="w-full">
          Enter the house
        </ButtonLink>
      </div>
    </article>
  );
}
