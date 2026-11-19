import Image from "next/image";
import type { Person } from "@/content/people";
import { Placeholder } from "@/components/ui/bits";
import { microcopy } from "@/content/microcopy";

/** Face plus one line. Shows a visible placeholder until real people are added. */
export function FacesGrid({ people, tone = "dark" }: { people: Person[]; tone?: "light" | "dark" }) {
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
            className={`relative aspect-[4/5] overflow-hidden rounded-[14px] border ${tone === "light" ? "border-ink/10" : "border-bone/10"} grayscale transition duration-500 hover:grayscale-0`}
          >
            <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">{p.name}</p>
            <p className={`mt-1 text-sm leading-snug ${tone === "light" ? "text-ink-muted" : "text-bone/80"}`}>
              {p.line}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
