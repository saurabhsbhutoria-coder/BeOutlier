import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/bits";
import { ctaLabel, detailsLine, seatsText, type Program } from "@/content/programs";

/** Home top strip: "Robotics Hackathon. Mumbai. 26 and 27 December. 51 seats. [Book a seat]" */
export function TopStrip({ program }: { program: Program }) {
  const line = [program.title, program.placeLine, program.datesLine].filter(Boolean).join(". ") + ".";
  const seats = seatsText(program);
  return (
    <div className="bg-mint text-navy">
      <div className="shell flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] sm:text-[13px]">
          {line} {seats}
        </p>
        {program.status !== "sold_out" ? (
          <Link
            href={program.route}
            className="font-mono text-xs font-bold uppercase tracking-[0.12em] underline decoration-2 underline-offset-4 hover:text-navy-soft sm:text-[13px]"
          >
            {ctaLabel(program)} <span aria-hidden="true">→</span>
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
    <article className="relative overflow-hidden rounded-[14px] border-2 border-navy bg-coral p-6 text-navy shadow-[8px_8px_0_0_var(--color-navy)] sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">/ {eyebrow}</p>
        <StatusBadge status={program.status} />
      </div>
      <h2 className="display mt-4 text-5xl sm:text-7xl">{program.title}</h2>
      <p className="heavy mt-3 text-xl leading-tight sm:text-2xl">{program.tagline}</p>
      <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.1em]">{detailsLine(program)}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <ButtonLink href={program.route} variant="navy" size="lg">
          {ctaLabel(program)}
        </ButtonLink>
        {seats ? <p className="display text-3xl">{seats}</p> : null}
      </div>
    </article>
  );
}

/** One of the three Summer 2027 houses. */
export function HouseCard({ program, index }: { program: Program; index: number }) {
  return (
    <article className="group flex h-full flex-col rounded-[14px] bg-navy p-6 text-offwhite shadow-hard transition-transform duration-200 hover:-translate-y-1 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-bold tracking-[0.18em] text-mint">
          {String(index).padStart(2, "0")} / {program.houseName?.toUpperCase()}
        </span>
        <StatusBadge status={program.status} />
      </div>
      <h3 className="display mt-5 text-6xl text-coral sm:text-7xl">{program.houseShort}</h3>
      <p className="heavy mt-2 text-lg leading-tight">{program.title}</p>
      <p className="mt-4 text-base leading-snug text-offwhite/90">{program.cardLine}</p>
      <p className="mt-5 border-t border-offwhite/20 pt-4 font-mono text-xs leading-relaxed font-bold uppercase tracking-[0.1em] text-offwhite/80">
        {detailsLine(program)}
      </p>
      <div className="mt-auto pt-6">
        <ButtonLink href={program.route} variant="coral" onDark className="w-full">
          Enter the house
        </ButtonLink>
      </div>
    </article>
  );
}
