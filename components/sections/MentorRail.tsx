"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Person } from "@/content/people";

/**
 * Mentors in one framed container: two rows that scroll sideways together.
 * Desktop shows 5 per row (all 10 at once), tablets 3, phones 2 with a peek.
 * Arrows appear only when there is more to scroll.
 */
export function MentorRail({ people, label = "Mentors" }: { people: Person[]; label?: string }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const r = railRef.current;
    if (!r) return;
    setAtStart(r.scrollLeft <= 4);
    setAtEnd(r.scrollLeft + r.clientWidth >= r.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const r = railRef.current;
    if (!r) return;
    sync();
    r.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      r.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const go = (dir: 1 | -1) => {
    const r = railRef.current;
    if (!r) return;
    const card = r.querySelector("li");
    const step = card ? (card.getBoundingClientRect().width + 16) * 2 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollable = !(atStart && atEnd);
  const arrow =
    "inline-flex size-11 items-center justify-center border border-ink transition-colors hover:enabled:bg-ink hover:enabled:text-mint disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="border border-ink bg-white p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="label flex items-center gap-2.5">
          <span className="dot" aria-hidden="true" />
          {people.length} mentors
        </p>
        <div className={`flex gap-2 ${scrollable ? "" : "invisible"}`}>
          <button type="button" onClick={() => go(-1)} disabled={atStart} className={arrow} aria-label={`Previous, ${label}`}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M16 6H2M7 1L2 6l5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} disabled={atEnd} className={arrow} aria-label={`Next, ${label}`}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>
      <ul
        ref={railRef}
        aria-label={label}
        className="no-scrollbar grid snap-x snap-mandatory grid-flow-col grid-rows-2 gap-x-4 gap-y-8 overflow-x-auto [grid-auto-columns:calc((100%-1rem)/2.25)] sm:[grid-auto-columns:calc((100%-2rem)/3)] lg:[grid-auto-columns:calc((100%-4rem)/5)]"
      >
        {people.map((p) => (
          <li key={p.id} className="snap-start">
            <div className="group relative aspect-[4/5] overflow-hidden bg-linen">
              <Image
                src={p.photo}
                alt={`Portrait of ${p.name}`}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 44vw"
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
            <p className="mt-3 text-base font-semibold leading-tight">{p.name}</p>
            <p className="mt-1 text-sm leading-snug text-ink-muted">{p.line}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
