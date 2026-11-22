import { Placeholder } from "@/components/ui/bits";
import { houses } from "@/content/programs";
import { parentRows, everyStudentGets } from "@/content/parents";

const PENDING = "[TO BE CONFIRMED]";

/**
 * For Parents: the three houses side by side, one question per row.
 * Desktop: a single comparison table. Phone: one card per house.
 */
export function ParentsComparison() {
  const hs = houses();
  const value = (id: string, row: (typeof parentRows)[number]) =>
    row.values[id as keyof typeof row.values] ?? <Placeholder>{PENDING}</Placeholder>;

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">The three houses compared for parents</caption>
          <thead>
            <tr className="border-y border-ink">
              <th scope="col" className="label w-[17%] py-5 pr-4 align-bottom text-ink/60">
                <span className="sr-only">Question</span>
              </th>
              {hs.map((h) => (
                <th key={h.id} scope="col" className="py-5 pr-6 align-bottom">
                  <span className="label block text-ink/60">{h.houseName}</span>
                  <span className="display mt-1 block text-3xl leading-none">{h.title}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parentRows.map((row) => (
              <tr key={row.label} className="border-b border-ink/20 align-top">
                <th scope="row" className="label py-4 pr-4 text-ink/70">
                  {row.label}
                </th>
                {hs.map((h) => (
                  <td key={h.id} className="py-4 pr-6 text-[15px] leading-snug">
                    {value(h.id, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone cards */}
      <div className="grid gap-4 lg:hidden">
        {hs.map((h) => (
          <article key={h.id} className="border border-ink bg-white/50 p-5">
            <p className="label text-ink/60">{h.houseName}</p>
            <h3 className="display mt-1 text-3xl leading-none">{h.title}</h3>
            <dl className="mt-4 border-t border-ink">
              {parentRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-ink/20 py-3">
                  <dt className="label pt-0.5 !text-[10px] text-ink/70">{row.label}</dt>
                  <dd className="text-[15px] leading-snug">{value(h.id, row)}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {/* For every student */}
      <div className="mt-10 grid gap-6 border border-ink bg-white/50 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-8">
        <p className="display text-3xl leading-none">Every student gets</p>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {everyStudentGets.map((g) => (
            <li key={g} className="flex items-center gap-2.5 text-[15px] font-medium">
              <span className="dot" aria-hidden="true" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
