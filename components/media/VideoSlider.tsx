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
  /** Posters and Instagram frames load only once the strip is near the screen. */
  const [near, setNear] = useState(false);

  useEffect(() => {
    const r = railRef.current;
    if (!r) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(r);
    return () => io.disconnect();
  }, []);

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
    const step = card ? card.getBoundingClientRect().width + gap : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    railRef.current?.querySelectorAll("video").forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };

  const arrow = `inline-flex size-12 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
    dark
      ? "border-white/25 hover:enabled:border-mint hover:enabled:bg-mint hover:enabled:text-ink"
      : "border-ink/30 bg-white hover:enabled:border-ink hover:enabled:bg-ink hover:enabled:text-mint"
  }`;
  /** The card: a soft rounded frame with the video inset, so it reads as one object. */
  const card = dark
    ? "bg-white/[0.05] ring-1 ring-white/10 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.7)]"
    : "bg-white ring-1 ring-ink/[0.07] shadow-[0_1px_2px_rgb(37_40_42/0.06),0_18px_40px_-20px_rgb(37_40_42/0.3)]";

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
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-1 pb-8 sm:mx-0 sm:scroll-px-1 sm:px-1 lg:gap-5"
      >
        {items.map((v, i) => (
          <li key={i} className={`w-[72%] shrink-0 snap-start rounded-[22px] p-2 sm:w-[44%] lg:w-[calc((100%-3.75rem)/4)] ${card}`}>
            <div
              className={`relative overflow-hidden rounded-2xl ${v.instagram ? "aspect-[100/121]" : "aspect-[9/16]"} ${
                dark ? "bg-ink-soft" : "bg-ink"
              }`}
            >
              {!near && (v.instagram || v.src) ? null : v.instagram ? (
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
                className={`label flex items-center justify-between gap-2 px-2 pt-3 pb-1.5 !text-[10px] underline-offset-4 hover:underline ${dark ? "text-white/70 hover:text-mint" : "text-ink-muted hover:text-ink"}`}
              >
                Watch on Instagram <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {v.name || v.line ? (
              <div className="px-2 pt-3 pb-1.5">
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
