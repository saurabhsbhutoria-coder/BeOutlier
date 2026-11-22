"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * A scatter plot that tells the BeOutlier story in four seconds:
 * dots start scattered, pull into a tight crowd, and then one breaks away,
 * turns mint and pulses. The crowd keeps breathing gently afterwards.
 *
 * Renders the final picture on the server (and for reduced motion), so it is
 * never blank. Animation starts when the graph scrolls into view.
 */

const W = 600;
const H = 440;
const N = 96;
const AXIS = { left: 44, bottom: 396, right: 584, top: 24 };
const CROWD = { x: 232, y: 300, sx: 50, sy: 34 };
const OUTLIER = { x: 520, y: 78 };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Dot {
  tx: number; // crowd target
  ty: number;
  sx: number; // scattered start
  sy: number;
  r: number;
  phase: number;
  delay: number;
}

const r2 = (v: number) => Math.round(v * 100) / 100;

function buildDots(): Dot[] {
  const rand = mulberry32(2027);
  const gauss = () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const dots: Dot[] = [];
  for (let i = 0; i < N; i++) {
    const tx = Math.min(AXIS.right - 150, Math.max(AXIS.left + 20, CROWD.x + gauss() * CROWD.sx));
    const ty = Math.min(AXIS.bottom - 14, Math.max(AXIS.top + 120, CROWD.y + gauss() * CROWD.sy));
    // Rounded so server and browser maths agree exactly (no hydration mismatch).
    dots.push({
      tx: r2(tx),
      ty: r2(ty),
      sx: r2(AXIS.left + 16 + rand() * (AXIS.right - AXIS.left - 32)),
      sy: r2(AXIS.top + 16 + rand() * (AXIS.bottom - AXIS.top - 32)),
      r: r2(5 + rand() * 2.6),
      phase: rand() * Math.PI * 2,
      delay: rand() * 450,
    });
  }
  return dots;
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const easeInOut = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export function OutlierGraph({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dots = useMemo(buildDots, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const crowdRefs = useRef<(SVGCircleElement | null)[]>([]);
  const outRef = useRef<SVGGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  const ink = tone === "light" ? "#25282a" : "#ffffff";
  const axis = tone === "light" ? "rgb(37 40 42 / 0.22)" : "rgb(255 255 255 / 0.22)";
  const crowdFill = tone === "light" ? "rgb(37 40 42 / 0.82)" : "rgb(255 255 255 / 0.78)";
  const crowdStroke = tone === "light" ? "#ffffff" : "#25282a";

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const circles = crowdRefs.current;
    const out = outRef.current;
    const line = lineRef.current;
    // Hide in the scattered start state until the graph is seen.
    circles.forEach((c, i) => {
      if (!c) return;
      c.setAttribute("cx", String(dots[i].sx));
      c.setAttribute("cy", String(dots[i].sy));
      c.style.opacity = "0";
    });
    if (out) {
      out.style.opacity = "0";
      out.setAttribute("transform", `translate(${dots[0].sx} ${dots[0].sy})`);
    }
    if (line) line.style.opacity = "0";

    let raf = 0;
    let start = 0;
    let running = false;
    let visible = false;

    const GATHER = 1700; // ms: everyone pulls into the crowd
    const HOLD = 500; // ms: a beat inside the crowd
    const BREAK = 1300; // ms: the outlier leaves

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;

      for (let i = 1; i < N; i++) {
        const c = circles[i];
        if (!c) continue;
        const d = dots[i];
        const p = ease((t - d.delay) / GATHER);
        const drift = t > GATHER ? 1 : p;
        const jx = Math.sin(t / 900 + d.phase) * 2.2 * drift;
        const jy = Math.cos(t / 1100 + d.phase) * 1.8 * drift;
        c.setAttribute("cx", (d.sx + (d.tx - d.sx) * p + jx).toFixed(2));
        c.setAttribute("cy", (d.sy + (d.ty - d.sy) * p + jy).toFixed(2));
        c.style.opacity = String(Math.min(1, Math.max(0, (t - d.delay) / 350)));
      }

      // The outlier: joins the crowd first, then breaks away.
      const o = dots[0];
      const g = ease(t / GATHER);
      let x = o.sx + (CROWD.x - o.sx) * g;
      let y = o.sy + (CROWD.y - o.sy) * g;
      const b = easeInOut((t - GATHER - HOLD) / BREAK);
      if (b > 0) {
        x = CROWD.x + (OUTLIER.x - CROWD.x) * b;
        y = CROWD.y + (OUTLIER.y - CROWD.y) * b;
      }
      if (out) {
        out.style.opacity = String(Math.min(1, t / 350));
        out.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        const [ring, core] = Array.from(out.children) as SVGCircleElement[];
        const left = b > 0.12;
        core.setAttribute("fill", left ? "#6cd4b1" : crowdFill);
        core.setAttribute("stroke", left ? ink : crowdStroke);
        core.setAttribute("r", String(7 + 5 * b));
        ring.style.display = b >= 1 ? "" : "none";
      }
      if (line) {
        line.style.opacity = String(Math.max(0, (b - 0.6) / 0.4) * 0.9);
        line.setAttribute("x2", x.toFixed(2));
        line.setAttribute("y2", y.toFixed(2));
      }

      if (visible) raf = requestAnimationFrame(frame);
      else running = false;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(svg);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [dots, crowdFill, crowdStroke, ink]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A crowd of dots packed together, and one mint dot that has broken away from it: the outlier."
      className={`block h-auto w-full overflow-visible ${className}`}
    >
      {/* Axes */}
      <line x1={AXIS.left} y1={AXIS.top} x2={AXIS.left} y2={AXIS.bottom} stroke={axis} strokeWidth="1" />
      <line x1={AXIS.left} y1={AXIS.bottom} x2={AXIS.right} y2={AXIS.bottom} stroke={axis} strokeWidth="1" />
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={AXIS.left}
          x2={AXIS.right}
          y1={AXIS.bottom - (AXIS.bottom - AXIS.top) * f}
          y2={AXIS.bottom - (AXIS.bottom - AXIS.top) * f}
          stroke={axis}
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}

      {/* Connector from the crowd to the one who left */}
      <line
        ref={lineRef}
        x1={CROWD.x}
        y1={CROWD.y}
        x2={OUTLIER.x}
        y2={OUTLIER.y}
        stroke={ink}
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {/* The crowd */}
      {dots.map((d, i) =>
        i === 0 ? null : (
          <circle
            key={i}
            ref={(el) => {
              crowdRefs.current[i] = el;
            }}
            cx={d.tx}
            cy={d.ty}
            r={d.r}
            fill={crowdFill}
            stroke={crowdStroke}
            strokeWidth="1.2"
          />
        ),
      )}

      {/* The outlier */}
      <g ref={outRef} transform={`translate(${OUTLIER.x} ${OUTLIER.y})`}>
        <circle r="12" fill="#6cd4b1" className="outlier-pulse" />
        <circle r="12" fill="#6cd4b1" stroke={ink} strokeWidth="1.6" />
      </g>
    </svg>
  );
}
