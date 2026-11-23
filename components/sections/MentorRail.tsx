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
    const gap = parseFloat(getComputedStyle(r).columnGap) || 16;
    const step = card ? (card.getBoundingClientRect().width + gap) * 2 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollable = !(atStart && atEnd);
  const arrow =
    "inline-flex size-11 items-center justify-center rounded-full border border-ink/30 bg-white transition-colors hover:enabled:border-ink hover:enabled:bg-ink hover:enabled:text-mint disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div>
      <div className={`mb-5 flex justify-end gap-2 ${scrollable ? "" : "hidden"}`}>
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
      <ul
        ref={railRef}
        aria-label={label}
        className="no-scrollbar -mx-1 grid snap-x snap-mandatory grid-flow-col grid-rows-2 gap-4 overflow-x-auto p-1 [grid-auto-columns:calc((100%-1rem)/2.2)] sm:[grid-auto-columns:calc((100%-2rem)/3)] lg:gap-5 lg:[grid-auto-columns:calc((100%-5rem)/5)]"
      >
        {people.map((p) => (
          <li key={p.id} className="snap-start">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2.5 shadow-[0_1px_2px_rgb(37_40_42/0.06),0_8px_24px_-12px_rgb(37_40_42/0.18)] ring-1 ring-ink/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgb(37_40_42/0.06),0_18px_36px_-16px_rgb(37_40_42/0.28)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-linen">
                <Image
                  src={p.photo}
                  alt={`Portrait of ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 44vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="px-1.5 pt-3 pb-2">
                <p className="text-[15px] font-semibold leading-tight">{p.name}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink-muted">{p.line}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
