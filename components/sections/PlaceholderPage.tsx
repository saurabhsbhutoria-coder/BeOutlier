import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Placeholder, Section, Stack } from "@/components/ui/bits";
import { site } from "@/content/site";

/**
 * A real page layout whose copy is not written yet (CLAUDE.md section 12).
 * Every block is a visible placeholder. Nothing here is invented.
 */
export function PlaceholderPage({
  eyebrow,
  title,
  blocks,
  children,
}: {
  eyebrow: string;
  title: string;
  blocks: string[];
  children?: ReactNode;
}) {
  return (
    <>
      <section className="bg-mint text-ink">
        <div className="shell py-14 sm:py-20">
          <Eyebrow label={eyebrow} />
          <Stack as="h1" lines={[title]} className="mt-4 text-6xl sm:text-8xl" />
          <div className="mt-6 max-w-2xl">
            <Placeholder>[INTRO LINE: TO BE WRITTEN]</Placeholder>
          </div>
        </div>
      </section>
      <Section tone="white">
        <div className="grid gap-6 sm:grid-cols-2">
          {blocks.map((b) => (
            <Placeholder key={b} block>
              {b}
            </Placeholder>
          ))}
        </div>
      </Section>
      {children}
      <Section tone="sand">
        <ButtonLink href="/apply" variant="ink" size="lg">
          {site.primaryCta}
        </ButtonLink>
      </Section>
    </>
  );
}
