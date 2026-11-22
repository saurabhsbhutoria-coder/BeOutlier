"use client";

import { useEffect, useRef } from "react";

/**
 * A number that counts up once when it scrolls into view.
 * The real value is in the server HTML, so without JavaScript (or with
 * reduced motion) it simply shows the final number. Never fakes a value.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1700,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const final = `${prefix}${to}${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.style.minWidth = `${el.getBoundingClientRect().width}px`;
        let t0 = 0;
        const step = (t: number) => {
          if (!t0) t0 = t;
          const p = Math.min(1, (t - t0) / duration);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = p === 1 ? final : `${prefix}${Math.round(to * eased)}`;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
