"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping video. Loads only near the viewport, plays only while visible,
 * never autoplays with sound, and stays on the poster for reduced motion.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
  label,
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  label: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {load ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
