import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/bits";
import { ctaLabel, detailsLine, eligibilityText, feeText, seatsText, type Program } from "@/content/programs";

/** Home top strip: "Robotics Hackathon. Mumbai. 26 and 27 December. 51 seats. [Book a seat]" */
export function TopStrip({ program }: { program: Program }) {
  const line = [program.title, program.placeLine, program.datesLine].filter(Boolean).join(". ") + ".";
  const seats = seatsText(program);
  return (
    <div className="on-dark bg-ink text-white">
      <div className="shell flex min-h-10 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
        <p className="label flex items-center gap-2 !text-[10px] text-white/80 sm:!text-[11px]">
          <span className="dot" aria-hidden="true" />
          {line} {seats}
        </p>
        {program.status !== "sold_out" ? (
          <Link
            href={program.route}
            className="label !text-[10px] text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint sm:!text-[11px]"
          >
            {ctaLabel(program)} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The latest drop, pinned first. Sits on a charcoal band: big title,
 * the facts on hairlines, the seat count and one button.
 */
export function DropCard({ program, eyebrow }: { program: Program; eyebrow: string }) {
  const seats = seatsText(program);
  const facts: [string, string][] = [
    ["Dates", program.datesLine ?? ""],
    ["Venue", program.venue ?? program.placeLine],
    ["Ages", eligibilityText(program.eligibility)],
    ["Fee", feeText(program.fee) ?? ""],
  ];
  return (
    <article className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="label flex items-center gap-2.5 text-mint">
            <span className="dot" aria-hidden="true" />
            {eyebrow}
          </p>
          <StatusBadge status={program.status} />
        </div>
        <h2 className="display mt-8 text-[clamp(56px,10vw,150px)]">{program.title}</h2>
        <p className="display mt-6 text-3xl text-mint sm:text-4xl">{program.tagline}</p>
      </div>
      <div>
        <dl className="border-t border-white/20">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-white/20 py-3.5">
              <dt className="label text-white/55">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        {seats ? (
          <p className="mt-7 flex items-baseline gap-3">
            <span className="display text-7xl text-mint sm:text-8xl">{program.seats.left ?? program.seats.total}</span>
            <span className="label text-white/70">{seats.replace(/^\d+\s*/, "")}</span>
          </p>
        ) : null}
        <div className="mt-7">
          <ButtonLink href={program.route} variant="mint" size="lg">
            {ctaLabel(program)}
          </ButtonLink>
        </div>
        <p className="sr-only">{detailsLine(program)}</p>
      </div>
    </article>
  );
}

/** One house as a plain card (used where the expanding panels are not). */
export function HouseCard({ program, index }: { program: Program; index: number }) {
  return (
    <article className="group flex h-full flex-col border border-ink bg-white p-7 text-ink transition-colors duration-300 hover:bg-mint sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="label">{String(index).padStart(2, "0")} /</span>
        <StatusBadge status={program.status} />
      </div>
      <p className="label mt-10 text-mint-deep group-hover:text-ink">{program.houseName}</p>
      <h3 className="display mt-3 text-6xl sm:text-7xl">{program.houseShort}</h3>
      <p className="mt-3 text-lg font-medium leading-tight">{program.title}</p>
      <p className="mt-5 text-base leading-relaxed text-ink-muted group-hover:text-ink">{program.cardLine}</p>
      <p className="label mt-8 border-t border-ink/20 pt-5 !text-[10px] leading-relaxed text-ink-muted group-hover:text-ink">
        {detailsLine(program)}
      </p>
      <div className="mt-auto pt-8">
        <ButtonLink href={program.route} variant="ink" className="w-full">
          Enter the house
        </ButtonLink>
      </div>
    </article>
  );
}
