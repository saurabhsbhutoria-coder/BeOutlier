import type { ReactNode } from "react";

/** Numbered list with big numerals. */
export function NumberedList({
  items,
  tone = "light",
  start = 1,
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  start?: number;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-baseline gap-4 rounded-[14px] border-2 p-4 sm:p-5 ${
            tone === "light" ? "border-navy bg-offwhite" : "border-offwhite/20 bg-navy-soft text-offwhite"
          }`}
        >
          <span className={`display w-10 shrink-0 text-3xl ${tone === "light" ? "text-coral-deep" : "text-coral"}`}>{String(start + i).padStart(2, "0")}</span>
          <span className="text-base leading-snug font-semibold sm:text-lg">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Day 1. ... Day 2. ... */
export function DayPlan({ days, tone = "light" }: { days: { label: string; text: string }[]; tone?: "light" | "dark" }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {days.map((d, i) => (
        <li
          key={d.label}
          className={`relative rounded-[14px] border-2 p-5 ${
            tone === "light"
              ? "border-navy bg-offwhite shadow-hard-navy"
              : "border-offwhite/20 bg-navy-soft text-offwhite shadow-hard-sm"
          }`}
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] opacity-70">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="display mt-2 text-4xl">{d.label}</p>
          <p className="mt-3 text-base leading-snug font-medium">{d.text}</p>
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
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border-2 ${
        tone === "light" ? "border-navy bg-offwhite" : "border-offwhite/25 bg-navy-soft"
      }`}
    >
      <table className="w-full text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={tone === "light" ? "border-b border-navy/15 last:border-0" : "border-b border-offwhite/15 last:border-0"}>
              <th
                scope="row"
                className="w-[34%] p-4 align-top font-mono text-xs font-bold uppercase tracking-[0.14em] sm:w-1/4 sm:p-5"
              >
                {r.label}
              </th>
              <td className="p-4 text-base leading-snug font-medium sm:p-5">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Numbered pillar cards with a title and one line. */
export function ProjectGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.title} className="rounded-[14px] bg-navy p-6 text-offwhite shadow-hard">
          <span className="font-mono text-xs font-bold tracking-[0.18em] text-mint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="heavy mt-3 text-xl leading-tight sm:text-2xl">{it.title}</h3>
          <p className="mt-2 text-base leading-snug text-offwhite/85">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
