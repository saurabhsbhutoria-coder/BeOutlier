import Image from "next/image";
import type { Person } from "@/content/people";
import { Placeholder } from "@/components/ui/bits";
import { microcopy } from "@/content/microcopy";

/** Face plus one line. Shows a visible placeholder until real people are added. */
export function FacesGrid({ people, tone = "light" }: { people: Person[]; tone?: "light" | "dark" }) {
  if (people.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[4/5]">
              <Placeholder block>{i === 0 ? microcopy.placeholders.faces : ""}</Placeholder>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {people.map((p) => (
        <li key={p.id} className="flex flex-col gap-3">
          <div
            className={`relative aspect-[4/5] overflow-hidden border ${tone === "light" ? "border-ink/15" : "border-white/15"} grayscale transition duration-500 hover:grayscale-0`}
          >
            <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">{p.name}</p>
            <p className={`mt-1 text-sm leading-snug ${tone === "light" ? "text-ink-muted" : "text-white/75"}`}>
              {p.line}
            </p>
            {p.tags?.length ? (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${p.name}, keywords`}>
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className={`label border px-2 py-1 !text-[9px] leading-none sm:!text-[10px] ${
                      tone === "light" ? "border-ink/25 text-ink" : "border-white/30 text-white/85"
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
