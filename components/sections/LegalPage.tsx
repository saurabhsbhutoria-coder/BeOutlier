import type { ReactNode } from "react";
import { Eyebrow, Stack } from "@/components/ui/bits";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-navy text-offwhite">
        <div className="shell py-14 sm:py-20">
          <Eyebrow label="Legal" tone="mint" />
          <Stack as="h1" lines={[title]} className="mt-4 text-6xl sm:text-8xl" />
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-offwhite/70">Last updated {updated}</p>
          <p className="mt-4 inline-block rounded-[10px] border-2 border-yellow px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-yellow">
            Draft. Under legal review before launch.
          </p>
        </div>
      </section>
      <section className="bg-offwhite text-navy">
        <div className="shell py-14 sm:py-20">
          <div className="max-w-3xl space-y-8 text-base leading-relaxed [&_h2]:heavy [&_h2]:text-2xl [&_h2]:leading-tight [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
