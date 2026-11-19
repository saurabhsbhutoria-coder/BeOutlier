import Image from "next/image";
import type { ReactNode } from "react";
import { statusBadge, type Status } from "@/content/programs";

/** "[ 03 ]  THE HOUSES" section label */
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
    ink: "text-ink/75",
    mint: "text-mint",
    light: "text-bone/60",
    sand: "text-sand",
  }[tone];
  return (
    <p className={`label flex flex-wrap items-center gap-x-3 gap-y-1 ${color} ${className}`}>
      {index ? (
        <>
          <span>[ {index} ]</span>
          <span>{label}</span>
        </>
      ) : (
        <span>[ {label} ]</span>
      )}
    </p>
  );
}

/** The BeOutlier logo (transparent cut of the original). Use on dark grounds. */
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
  const tone = status === "sold_out" ? "border-bone/30 text-bone/70" : "border-mint/50 text-mint";
  return (
    <span className={`label inline-flex items-center gap-2 rounded-full border bg-ink px-3 py-1 !text-[10px] ${tone} ${className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {text}
    </span>
  );
}

/** Small tag pill */
export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`label inline-flex items-center rounded-full border px-3 py-1 !text-[10px] ${
        tone === "light" ? "border-ink/20 text-ink" : "border-bone/25 text-bone"
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
      <div className="label flex h-full min-h-40 items-center justify-center rounded-[14px] border border-dashed border-current/25 p-6 text-center !text-[10px] opacity-60">
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
  tone?: "light" | "linen" | "ink" | "deep" | "sand" | "mint";
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const tones = {
    light: "bg-bone text-ink on-light",
    linen: "bg-linen text-ink on-light",
    ink: "bg-ink text-bone",
    deep: "bg-ink-deep text-bone",
    sand: "bg-sand text-ink on-sand",
    mint: "bg-mint text-ink on-light",
  };
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
