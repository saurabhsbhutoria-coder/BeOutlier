import type { ReactNode } from "react";
import { statusBadge, type Status } from "@/content/programs";

/** "/ THE HOUSES · 03" monospace label */
export function Eyebrow({
  label,
  index,
  tone = "navy",
  className = "",
}: {
  label: string;
  index?: string;
  tone?: "navy" | "mint" | "light" | "coral";
  className?: string;
}) {
  const color = {
    navy: "text-navy-muted",
    mint: "text-mint",
    light: "text-offwhite/80",
    coral: "text-coral",
  }[tone];
  return (
    <p className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${color} ${className}`}>
      / {label}
      {index ? ` · ${index}` : ""}
    </p>
  );
}

/** BE OUTLIER wordmark: Anton, white with a navy offset shadow (or navy on light). */
export function Wordmark({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      className={`display inline-block text-2xl tracking-[0.01em] ${
        tone === "dark"
          ? "text-offwhite [text-shadow:3px_3px_0_var(--color-coral)]"
          : "text-offwhite [text-shadow:3px_3px_0_var(--color-navy)]"
      } ${className}`}
    >
      BE OUTLIER
    </span>
  );
}

export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  const text = statusBadge[status];
  if (!text) return null;
  const tone =
    status === "sold_out"
      ? "bg-offwhite text-navy"
      : status === "waitlist"
        ? "bg-mint text-navy"
        : "bg-yellow text-navy";
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-navy px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${tone} ${className}`}
    >
      {text}
    </span>
  );
}

/** Small tag pill */
export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${
        tone === "light" ? "border-navy/30 text-navy" : "border-offwhite/40 text-offwhite"
      }`}
    >
      {children}
    </span>
  );
}

/** A visible placeholder for content still to come. Easy to spot, never fake. */
export function Placeholder({ children, block = false }: { children: ReactNode; block?: boolean }) {
  if (block) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-[14px] border-2 border-dashed border-current p-6 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] opacity-80">
        {children}
      </div>
    );
  }
  return <span className="placeholder">{children}</span>;
}

/** Section wrapper with consistent rhythm */
export function Section({
  id,
  tone = "light",
  className = "",
  children,
  ...rest
}: {
  id?: string;
  tone?: "light" | "stone" | "navy" | "coral" | "mint";
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const tones = {
    light: "bg-offwhite text-navy on-light",
    stone: "bg-stone text-navy on-light",
    navy: "bg-navy text-offwhite",
    coral: "bg-coral text-navy on-coral",
    mint: "bg-mint text-navy on-light",
  };
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`} {...rest}>
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
