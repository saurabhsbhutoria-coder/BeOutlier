import type { Faq as FaqItem } from "@/content/faq";

/**
 * FAQ accordion built on <details>, so it works without JavaScript and adds
 * nothing to the page weight. Also emits FAQPage structured data for search.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <ul className="grid gap-3">
        {items.map((f) => (
          <li key={f.q}>
            <details className="group rounded-2xl bg-white ring-1 ring-ink/[0.08] transition-shadow open:shadow-[0_18px_40px_-24px_rgb(37_40_42/0.35)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-lg font-semibold leading-snug sm:px-7 sm:text-xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="relative size-9 shrink-0 rounded-full bg-linen transition-colors group-open:bg-mint"
                >
                  <span className="absolute top-1/2 left-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                  <span className="absolute top-1/2 left-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-3xl px-5 pb-6 text-base leading-relaxed text-ink-muted sm:px-7 sm:text-lg">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
