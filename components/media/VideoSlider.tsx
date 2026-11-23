"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoSlot } from "@/content/media";

/**
 * Horizontal strip of framed videos with left and right arrows.
 * Swipe on phones, arrows or keyboard everywhere. Tapping a video plays it
 * with sound and controls; starting one pauses the others. Empty slots show a
 * visible placeholder until the real clip is added in content/media.ts.
 */
export function VideoSlider({
  items,
  label,
  placeholder,
  tone = "light",
}: {
  items: VideoSlot[];
  /** Accessible name for the strip, e.g. "Student interviews" */
  label: string;
  /** Placeholder text for empty slots, numbered automatically */
  placeholder: string;
  tone?: "light" | "dark";
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const dark = tone === "dark";

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
    const step = card ? card.getBoundingClientRect().width + 16 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    railRef.current?.querySelectorAll("video").forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };

  const arrow = `inline-flex size-12 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
    dark ? "border-white/40 hover:enabled:bg-mint hover:enabled:text-ink hover:enabled:border-mint" : "border-ink hover:enabled:bg-ink hover:enabled:text-mint"
  }`;

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
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
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {items.map((v, i) => (
          <li key={i} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3rem)/4)]">
            <div
              className={`relative overflow-hidden border ${v.instagram ? "aspect-[100/121]" : "aspect-[9/16]"} ${
                dark ? "border-white/20 bg-ink-soft" : "border-ink bg-ink"
              }`}
            >
              {v.instagram ? (
                // Instagram's own embed frame: a 55px header, the reel cropped to about 4:5, then a footer.
                // The card shows only the reel; the link under the card credits Instagram.
                <iframe
                  src={`https://www.instagram.com/reel/${v.instagram}/embed/`}
                  title={v.name ? `${v.name}, on Instagram` : `${label} ${i + 1}, on Instagram`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                  allowFullScreen
                  scrolling="no"
                  className="absolute top-[-55px] left-[-1px] h-[calc(100%+320px)] w-[calc(100%+2px)] max-w-none border-0 bg-white"
                />
              ) : v.src ? (
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  onPlay={onPlay}
                  className="absolute inset-0 size-full object-cover"
                  aria-label={v.name ? `${v.name}${v.line ? `, ${v.line}` : ""}` : `${label} ${i + 1}`}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
                  <span className="flex size-14 items-center justify-center rounded-full border border-white/40" aria-hidden="true">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                      <path d="M0 0l16 9-16 9z" />
                    </svg>
                  </span>
                  <span className="label !text-[10px] text-white/70">
                    [{placeholder} {i + 1}]
                  </span>
                </div>
              )}
            </div>
            {v.instagram ? (
              <a
                href={`https://www.instagram.com/reel/${v.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={`label mt-3 inline-flex items-center gap-2 !text-[10px] underline-offset-4 hover:underline ${dark ? "text-white/70" : "text-ink-muted"}`}
              >
                Watch on Instagram <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {v.name || v.line ? (
              <div className="mt-3">
                {v.name ? <p className="font-semibold">{v.name}</p> : null}
                {v.line ? <p className={`text-sm ${dark ? "text-white/70" : "text-ink-muted"}`}>{v.line}</p> : null}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
