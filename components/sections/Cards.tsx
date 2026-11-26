import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/bits";
import { ctaLabel, detailsLine, eligibilityText, feeText, seatsText, type Program } from "@/content/programs";
import { iitBombayTag } from "@/content/site";

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

/** "Mentored by IIT Bombay alumni" tag, with the logo when enabled in content/site.ts. */
export function IitBombayTag({ className = "" }: { className?: string }) {
  return (
    <p className={`inline-flex items-center gap-4 border-l-4 border-mint bg-white py-2.5 pr-6 pl-3 text-ink ${className}`}>
      {iitBombayTag.showLogo ? (
        <Image src={iitBombayTag.logo} alt="IIT Bombay" width={52} height={51} className="size-12 shrink-0 sm:size-14" />
      ) : (
        <span className="dot ml-2" aria-hidden="true" />
      )}
      <span className="text-base font-semibold leading-tight sm:text-xl">{iitBombayTag.text}</span>
    </p>
  );
}

/** Weekday for a date like 26 December 2026, computed, never hardcoded. */
function weekday(day: number, monthIndex: number, year: number) {
  return new Date(Date.UTC(year, monthIndex, day)).toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" });
}

/**
 * The Robotics Hackathon: the closest opportunity. Charcoal band, the title and
 * the IIT Bombay tag on the left; on the right a mint container with the dates
 * up front, then venue, hours, ages, fee, seats and the button.
 */
export function DropCard({ program, eyebrow }: { program: Program; eyebrow: string }) {
  const seats = seatsText(program);
  const days = [26, 27];
  const facts: [string, string][] = [
    ["Venue", program.venue ?? program.placeLine],
    ["Timings", "10 am to 7 pm, both days"],
    ["Ages", eligibilityText(program.eligibility)],
    ["Fee", `${feeText(program.fee) ?? ""} per student. Full kit included`],
  ];
  return (
    <article className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="label flex items-center gap-2.5 text-mint">
            <span className="dot" aria-hidden="true" />
            {eyebrow}
          </p>
          <StatusBadge status={program.status} />
        </div>
        <h2 className="display mt-8 text-[clamp(56px,9vw,140px)]">{program.title}</h2>
        <p className="display mt-5 text-3xl text-mint sm:text-4xl">{program.tagline}</p>
        <p className="mt-6 max-w-md text-lg text-white/75">Four tracks. Every student builds their own robot and keeps the kit. No experience needed.</p>
        <IitBombayTag className="mt-8" />
      </div>

      <div className="bg-mint p-6 text-ink sm:p-9">
        <p className="label flex items-center gap-2.5">
          <span className="dot" aria-hidden="true" />
          {program.placeLine}. December 2026
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {days.map((d) => (
            <div key={d} className="border border-ink bg-white px-5 py-4">
              <p className="label !text-[11px] text-ink-muted">{weekday(d, 11, 2026)}</p>
              <p className="display mt-1 text-7xl leading-none sm:text-8xl">{d}</p>
              <p className="label mt-2">December</p>
            </div>
          ))}
        </div>
        <dl className="mt-6 border-t border-ink">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-ink/25 py-3">
              <dt className="label text-ink/70">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
          {seats ? (
            <p className="flex items-baseline gap-2.5">
              <span className="display text-6xl">{program.seats.left ?? program.seats.total}</span>
              <span className="label">{seats.replace(/^d+s*/, "")}</span>
            </p>
          ) : null}
          <ButtonLink href={program.route} variant="ink" size="lg">
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
