import Link from "next/link";
import { Wordmark } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";
import { SlideMenu } from "./SlideMenu";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-navy bg-navy text-offwhite">
      <div className="shell flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="BeOutlier home" className="shrink-0">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href="/apply" variant="coral" onDark className="!min-h-10 !px-4 !text-xs">
              {site.primaryCta}
            </ButtonLink>
          </span>
          <span className="sm:hidden">
            <ButtonLink href="/apply" variant="coral" onDark className="!min-h-10 !px-4 !text-xs">
              Apply
            </ButtonLink>
          </span>
          <SlideMenu />
        </div>
      </div>
    </header>
  );
}
