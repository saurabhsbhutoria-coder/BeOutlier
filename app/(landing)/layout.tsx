import { Wordmark } from "@/components/ui/bits";
import { LandingFooter } from "@/components/layout/Footer";

/** Landing pages: standalone. No menu, one button, one form. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#apply"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to the form
      </a>
      <header className="border-b-2 border-navy bg-navy text-offwhite">
        <div className="shell flex h-14 items-center">
          <Wordmark />
        </div>
      </header>
      <main id="main">{children}</main>
      <LandingFooter />
    </>
  );
}
