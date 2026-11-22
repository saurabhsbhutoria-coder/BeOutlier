import Link from "next/link";
import { Logo } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";
import { SlideMenu } from "./SlideMenu";
import { mainNav, site } from "@/content/site";

/** Mint bar: the logo sits on its native colour. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-mint text-ink">
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" aria-label="BeOutlier home" className="shrink-0">
          <Logo className="h-7 sm:h-8" priority />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-[14px] font-medium text-ink/80 underline-offset-[6px] transition-colors hover:text-ink hover:underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:block">
            <ButtonLink href="/apply" variant="ink">
              {site.primaryCta}
            </ButtonLink>
          </span>
          <span className="sm:hidden">
            <ButtonLink href="/apply" variant="ink" arrow={false} className="!min-h-10 !px-4 !text-[13px]">
              Apply
            </ButtonLink>
          </span>
          <span className="lg:hidden">
            <SlideMenu />
          </span>
        </div>
      </div>
    </header>
  );
}
