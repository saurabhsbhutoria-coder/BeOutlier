"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A framed video shown at its own shape (aspect ratio from its real size, so it
 * is never stretched or cropped). Loads only near the screen, plays muted on a
 * loop while visible, and has a sound button in the bottom right corner when
 * the file has a sound track. Stays on the poster for reduced motion.
 */
export function StoryVideo({
  src,
  poster,
  width,
  height,
  hasAudio,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  hasAudio: boolean;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const [load, setLoad] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setLoad(true);
          if (v.currentSrc) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Once the file is attached, load it and start playing if still on screen.
  useEffect(() => {
    const v = ref.current;
    if (!load || !v) return;
    v.load();
    if (visible.current) v.play().catch(() => {});
  }, [load]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-contain"
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      >
        {load ? <source src={src} type="video/mp4" /> : null}
      </video>
      {hasAudio ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute right-3 bottom-3 inline-flex size-11 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
              <path d="m22 9-6 6M16 9l6 6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
            </svg>
          )}
        </button>
      ) : null}
    </div>
  );
}
