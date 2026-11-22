import Image from "next/image";
import type { ReactNode } from "react";
import { statusBadge, type Status } from "@/content/programs";

/** Section label: the outlier dot, the name, then the number. "● THE HOUSES · 03" */
export function Eyebrow({
  label,
  index,
  tone = "ink",
  className = "",
}: {
  label: string;
  index?: string;
  tone?: "ink" | "mint" | "light" | "sand";
  className?: string;
}) {
  const color = {
    ink: "text-ink",
    mint: "text-mint",
    light: "text-white/75",
    sand: "text-sand",
  }[tone];
  return (
    <p className={`label flex flex-wrap items-center gap-x-2.5 gap-y-1 ${color} ${className}`}>
      <span className="dot" aria-hidden="true" />
      <span>{label}</span>
      {index ? <span className="opacity-55">· {index}</span> : null}
    </p>
  );
}

/** The BeOutlier logo (transparent cut of the original). For mint or charcoal grounds only. */
export function Logo({ className = "h-8", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo.webp"
      alt="Be Outlier. Think.Learn.Create"
      width={1200}
      height={269}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}

/** @deprecated use Logo */
export const Wordmark = Logo;

export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  const text = statusBadge[status];
  if (!text) return null;
  return (
    <span
      className={`label inline-flex items-center gap-2 border border-ink/15 bg-white px-3 py-1.5 !text-[10px] text-ink ${className}`}
    >
      <span className={`size-1.5 rounded-full ${status === "sold_out" ? "bg-ink/40" : "bg-mint-deep"}`} aria-hidden="true" />
      {text}
    </span>
  );
}

/** Small tag */
export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`label inline-flex items-center border px-3 py-1 !text-[10px] ${
        tone === "light" ? "border-ink/20 text-ink" : "border-white/25 text-white"
      }`}
    >
      {children}
    </span>
  );
}

/** A visible placeholder for content still to come. Quiet, but easy to spot. Never fake. */
export function Placeholder({ children, block = false }: { children: ReactNode; block?: boolean }) {
  if (block) {
    return (
      <div className="label flex h-full min-h-40 items-center justify-center border border-dashed border-current/30 p-6 text-center !text-[10px] opacity-70">
        {children}
      </div>
    );
  }
  return <span className="placeholder">{children}</span>;
}

export type Tone = "white" | "light" | "linen" | "sand" | "mint" | "ink" | "deep";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  light: "bg-white text-ink",
  linen: "bg-linen text-ink",
  sand: "bg-sand text-ink",
  mint: "bg-mint text-ink",
  ink: "bg-ink text-white on-dark",
  deep: "bg-ink-deep text-white on-dark",
};

export const isDark = (t: Tone) => t === "ink" || t === "deep";

/** Edge to edge colour band with consistent rhythm */
export function Section({
  id,
  tone = "white",
  className = "",
  children,
  ...rest
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-32 ${className}`} {...rest}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Big stacked headline lines */
export function Stack({
  lines,
  as: As = "h2",
  className = "",
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <As className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </As>
  );
}
