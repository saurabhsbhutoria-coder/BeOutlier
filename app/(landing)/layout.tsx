import { Logo } from "@/components/ui/bits";
import { LandingFooter } from "@/components/layout/Footer";

/** Landing pages: standalone. No menu, one button, one form. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#apply"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to the form
      </a>
      <header className="border-b border-ink/15 bg-mint text-ink">
        <div className="shell flex h-16 items-center">
          <Logo className="h-7 sm:h-8" priority />
        </div>
      </header>
      <main id="main">{children}</main>
      <LandingFooter />
    </>
  );
}
