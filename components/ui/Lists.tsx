import type { ReactNode } from "react";

type Tone = "dark" | "light";
const line = (t: Tone) => (t === "dark" ? "border-white/15" : "border-ink/15");
const muted = (t: Tone) => (t === "dark" ? "text-white/70" : "text-ink-muted");
const num = (t: Tone) => (t === "dark" ? "text-mint" : "text-mint-deep");

/** Numbered list on hairlines. */
export function NumberedList({ items, tone = "light", start = 1 }: { items: ReactNode[]; tone?: Tone; start?: number }) {
  return (
    <ol className={`grid border-t sm:grid-cols-2 sm:gap-x-12 ${line(tone)}`}>
      {items.map((item, i) => (
        <li key={i} className={`flex items-baseline gap-6 border-b py-5 ${line(tone)}`}>
          <span className={`display w-10 shrink-0 text-3xl ${num(tone)}`}>{String(start + i).padStart(2, "0")}</span>
          <span className="text-lg leading-snug font-medium sm:text-xl">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Day 1. ... Day 2. ... as columns divided by hairlines. */
export function DayPlan({ days, tone = "light" }: { days: { label: string; text: string }[]; tone?: Tone }) {
  const cols = days.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-2";
  return (
    <ol className={`grid border-t sm:grid-cols-2 ${cols} ${line(tone)}`}>
      {days.map((d, i) => (
        <li
          key={d.label}
          className={`border-b py-8 sm:pr-8 lg:border-b-0 ${i > 0 ? `lg:border-l lg:pl-8` : ""} ${line(tone)}`}
        >
          <span className={`label ${num(tone)}`}>{String(i + 1).padStart(2, "0")}</span>
          <p className="display mt-5 text-5xl">{d.label}</p>
          <p className={`mt-4 text-base leading-relaxed ${muted(tone)}`}>{d.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Two column fact table, for parents. */
export function InfoTable({
  rows,
  caption,
  tone = "light",
}: {
  rows: { label: string; value: ReactNode }[];
  caption?: string;
  tone?: Tone;
}) {
  return (
    <table className={`w-full border-t text-left ${line(tone)}`}>
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className={`border-b ${line(tone)}`}>
            <th scope="row" className={`label w-[36%] py-5 pr-4 align-top sm:w-1/4 ${tone === "dark" ? "text-white/60" : "text-ink-muted"}`}>
              {r.label}
            </th>
            <td className="py-5 text-base leading-relaxed sm:text-lg">{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Numbered pillar cards with a title and one line, and an optional track label. */
export function ProjectGrid({ items }: { items: { title: string; text: string; kicker?: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="group border border-ink bg-white p-7 text-ink transition-colors duration-300 hover:bg-mint sm:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="display text-3xl text-mint-deep group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
            {it.kicker ? <span className="label text-right text-ink-muted group-hover:text-ink">Track · {it.kicker}</span> : null}
          </div>
          <h3 className="display mt-8 text-4xl sm:text-5xl">{it.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-ink-muted group-hover:text-ink">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
