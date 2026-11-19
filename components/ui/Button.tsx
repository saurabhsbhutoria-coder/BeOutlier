import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "coral" | "navy" | "mint" | "light";
type Size = "md" | "lg";

/**
 * Hard offset shadow button. Minimum 48px tap target.
 * coral: navy text on coral. navy: off white text on navy. mint: navy text on mint.
 * onDark swaps the navy shadow for mint so it shows on navy grounds.
 */
const base =
  "heavy inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-navy uppercase tracking-wide text-center transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:pointer-events-none disabled:opacity-60 select-none";

const variants: Record<Variant, string> = {
  coral: "bg-coral text-navy",
  navy: "bg-navy text-offwhite",
  mint: "bg-mint text-navy",
  light: "bg-offwhite text-navy",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-7 text-base sm:text-lg",
};

export function buttonClass(variant: Variant = "coral", size: Size = "md", onDark = false, extra = "") {
  const shadow = onDark
    ? "shadow-hard-mint hover:shadow-[2px_2px_0_0_var(--color-mint)]"
    : variant === "navy"
      ? "shadow-hard-sm hover:shadow-[2px_2px_0_0_var(--color-coral)]"
      : "shadow-hard-navy hover:shadow-[2px_2px_0_0_var(--color-navy)]";
  return `${base} ${variants[variant]} ${sizes[size]} ${shadow} ${extra}`;
}

interface Common {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant,
  size,
  onDark,
  className = "",
  children,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = buttonClass(variant, size, onDark, className);
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  onDark,
  className = "",
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, onDark, className)} {...rest}>
      {children}
    </button>
  );
}
