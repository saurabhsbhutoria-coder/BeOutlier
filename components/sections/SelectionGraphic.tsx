"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/ui/CountUp";

/** The 15 cells that light up, scattered across the 10 by 10 grid. */
const SELECTED = [3, 12, 19, 27, 31, 38, 44, 52, 57, 63, 68, 74, 81, 90, 96];

/**
 * "85 out of 100 won't make it." A big number that counts up, and a 10 by 10
 * grid of outlined squares where 15 fill with mint one after another once the
 * graphic scrolls into view. Without JavaScript or with reduced motion, the
 * final state shows straight away.
 */
export function SelectionGraphic({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(true);
  const dark = tone === "dark";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setGo(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <p className="sr-only">85 out of 100 won&apos;t make it.</p>
      <p aria-hidden="true" className="display text-[clamp(110px,15vw,210px)] leading-[0.85]">
        <CountUp to={85} />
      </p>
      <p aria-hidden="true" className="display mt-3 max-w-[11ch] text-3xl leading-[1.02] sm:text-4xl">
        out of 100 won&apos;t make it.
      </p>
      <div aria-hidden="true" className="mt-9 grid max-w-[400px] grid-cols-10 gap-1.5">
        {Array.from({ length: 100 }).map((_, i) => {
          const k = SELECTED.indexOf(i);
          const lit = k > -1 && go;
          return (
            <i
              key={i}
              style={{ transitionDelay: lit ? `${k * 60 + 300}ms` : "0ms" }}
              className={`block aspect-square border transition-[background-color,border-color] duration-500 ${
                lit
                  ? `bg-mint ${dark ? "border-mint" : "border-ink"}`
                  : dark
                    ? "border-white/20"
                    : "border-ink/20"
              }`}
            />
          );
        })}
      </div>
      <p className={`label mt-4 ${dark ? "text-white/65" : "text-ink-muted"}`}>15 of every 100 are selected</p>
    </div>
  );
}
