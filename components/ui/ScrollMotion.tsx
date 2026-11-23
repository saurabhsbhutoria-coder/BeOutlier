"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Subtle section entrances, site wide. Each section below the fold has its
 * direct content (the children of its .shell) fade and rise in a short
 * stagger as it scrolls into view. Sections already on screen are never
 * touched, so nothing flashes on load and nothing hides without JavaScript.
 * Uses opacity and transform only (no layout shift). Off for reduced motion.
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("sr-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>("main section").forEach((section) => {
      if (section.classList.contains("sr-in")) return;
      if (section.classList.contains("sr")) {
        // Set up by an earlier run (route change or React re-running effects): just watch it again.
        io.observe(section);
        return;
      }
      if (section.getBoundingClientRect().top < fold * 0.9) return; // already in view
      const shell = section.querySelector<HTMLElement>(":scope > .shell");
      const items = Array.from((shell ?? section).children) as HTMLElement[];
      if (!items.length) return;
      section.classList.add("sr");
      items.forEach((el, i) => {
        el.classList.add("sr-item");
        el.style.transitionDelay = `${Math.min(i, 4) * 80}ms`;
      });
      io.observe(section);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
