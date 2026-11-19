import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Split button: a solid label block plus a square arrow box that fills with
 * mint on hover. Square corners, wide tracking. Minimum 48px tap target.
 *
 * light: bone label, for dark grounds (the default primary)
 * ink:   charcoal label, for light grounds
 * mint:  mint label, the single loud accent, for dark grounds
 * ghost: outline only, no arrow (secondary actions)
 */
type Variant = "light" | "ink" | "mint" | "ghost" | "sand";
type Size = "md" | "lg";

const label: Record<Variant, string> = {
  light: "bg-bone text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-bone",
  mint: "bg-mint text-ink",
  ghost: "border border-current/30 bg-transparent",
};

const box: Record<Variant, string> = {
  light: "border-bone/35 text-bone",
  sand: "border-sand/45 text-sand",
  ink: "border-ink/30 text-ink",
  mint: "border-mint/45 text-mint",
  ghost: "",
};

const sizes: Record<Size, { label: string; box: string }> = {
  md: { label: "min-h-12 px-5 text-[12px]", box: "w-12" },
  lg: { label: "min-h-14 px-7 text-[13px]", box: "w-14" },
};

export function buttonClass(variant: Variant = "light", size: Size = "md", _onDark = false, extra = "") {
  void _onDark;
  return `group inline-flex items-stretch select-none font-semibold uppercase tracking-[0.16em] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none ${extra}`;
}

function Inner({ variant, size, arrow, children }: { variant: Variant; size: Size; arrow: boolean; children: ReactNode }) {
  const s = sizes[size];
  return (
    <>
      <span
        className={`flex flex-1 items-center justify-center rounded-l-[3px] ${arrow ? "" : "rounded-r-[3px]"} text-center transition-colors duration-200 ${label[variant]} ${s.label}`}
      >
        {children}
      </span>
      {arrow ? (
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-r-[3px] border border-l-0 transition-colors duration-200 group-hover:border-mint group-hover:bg-mint group-hover:text-ink ${box[variant]} ${s.box}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      ) : null}
    </>
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
  variant = "light",
  size = "md",
  onDark,
  arrow,
  className = "",
  children,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = buttonClass(variant, size, onDark, className);
  const showArrow = arrow ?? variant !== "ghost";
  const inner = (
    <Inner variant={variant} size={size} arrow={showArrow}>
      {children}
    </Inner>
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
  variant = "light",
  size = "md",
  onDark,
  arrow,
  className = "",
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  const showArrow = arrow ?? variant !== "ghost";
  return (
    <button className={buttonClass(variant, size, onDark, className)} {...rest}>
      <Inner variant={variant} size={size} arrow={showArrow}>
        {children}
      </Inner>
    </button>
  );
}
