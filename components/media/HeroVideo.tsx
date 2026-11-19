"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface VideoSrc {
  mp4: string;
  poster: string;
}

const DESKTOP = "(min-width: 1024px)";

/**
 * Full bleed background video for a hero, with separate files for phone
 * (vertical) and desktop (horizontal). Only the file for the current screen
 * is downloaded, and only after the page has loaded, so it never slows the
 * first paint: the poster shows first, then the video fades in once playing.
 * Muted, looping, inline. Stays on the poster for reduced motion.
 */
export function HeroVideo({ mobile, desktop }: { mobile?: VideoSrc; desktop?: VideoSrc }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia(DESKTOP);
    let visible = true;
    let current = "";

    const apply = () => {
      const src = (mq.matches ? desktop : mobile)?.mp4 ?? "";
      if (src === current) return;
      current = src;
      setPlaying(false);
      if (!src) {
        v.removeAttribute("src");
        v.load();
        return;
      }
      v.src = src;
      if (visible) v.play().catch(() => {});
    };

    const start = () => apply();
    if (document.readyState === "complete") setTimeout(start, 300);
    else window.addEventListener("load", () => setTimeout(start, 300), { once: true });
    mq.addEventListener("change", apply);

    // Pause when the hero is scrolled away, to save battery and data.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!current) return;
      if (visible) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);

    return () => {
      mq.removeEventListener("change", apply);
      io.disconnect();
    };
  }, [mobile, desktop]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {mobile ? (
        <Image src={mobile.poster} alt="" fill priority sizes="100vw" className="object-cover lg:hidden" />
      ) : null}
      {desktop ? (
        <Image src={desktop.poster} alt="" fill priority sizes="100vw" className="hidden object-cover lg:block" />
      ) : null}
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
