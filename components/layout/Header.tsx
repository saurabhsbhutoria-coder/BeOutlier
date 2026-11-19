import Link from "next/link";
import { Logo } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";
import { SlideMenu } from "./SlideMenu";
import { mainNav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-ink/85 text-bone backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" aria-label="BeOutlier home" className="shrink-0">
          <Logo className="h-7 sm:h-8" priority />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[13px] font-medium text-bone/75 transition-colors hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href="/apply" variant="light">
              {site.primaryCta}
            </ButtonLink>
          </span>
          <span className="sm:hidden">
            <ButtonLink href="/apply" variant="light" arrow={false} className="[&>span]:!min-h-10 [&>span]:!px-4">
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
