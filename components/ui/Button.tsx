import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Square block button with an arrow that slides on hover.
 *
 * ink:   charcoal with mint text. The signature, for white, mint and sand grounds.
 * mint:  mint with charcoal text, for charcoal grounds.
 * white: white with charcoal text, for charcoal or photo grounds.
 * ghost: outline in the current colour, for secondary actions.
 * ("light" and "sand" are kept as aliases of ink for older call sites.)
 */
type Variant = "ink" | "mint" | "white" | "ghost" | "light" | "sand";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-mint border-ink hover:bg-ink-soft",
  light: "bg-ink text-mint border-ink hover:bg-ink-soft",
  sand: "bg-ink text-mint border-ink hover:bg-ink-soft",
  mint: "bg-mint text-ink border-mint hover:bg-white hover:border-white",
  white: "bg-white text-ink border-white hover:bg-mint hover:border-mint",
  ghost: "bg-transparent text-current border-current/40 hover:border-current",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[14px] gap-3",
  lg: "min-h-14 px-7 text-[15px] gap-4",
};

export function buttonClass(variant: Variant = "ink", size: Size = "md", _onDark = false, extra = "") {
  void _onDark;
  return `group inline-flex items-center justify-center border font-semibold tracking-[0.01em] select-none transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${extra}`;
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-1"
    >
      <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

interface Common {
  variant?: Variant;
  size?: Size;
  /** Kept for older call sites; the variant decides the look. */
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "ink",
  size = "md",
  onDark,
  arrow = true,
  className = "",
  children,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = buttonClass(variant, size, onDark, className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "ink",
  size = "md",
  onDark,
  arrow = true,
  className = "",
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, onDark, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}
