import type { ReactNode } from "react";
import { Eyebrow, Stack } from "@/components/ui/bits";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-mint text-ink">
        <div className="shell py-14 sm:py-20">
          <Eyebrow label="Legal" />
          <Stack as="h1" lines={[title]} className="mt-4 text-6xl sm:text-8xl" />
          <p className="label mt-8 text-ink/70">Last updated {updated}</p>
          <p className="label mt-4 inline-block border border-ink px-4 py-2 !text-[10px]">
            Draft. Under legal review before launch.
          </p>
        </div>
      </section>
      <section className="bg-white text-ink">
        <div className="shell py-14 sm:py-20">
          <div className="max-w-3xl space-y-8 text-base leading-relaxed [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
