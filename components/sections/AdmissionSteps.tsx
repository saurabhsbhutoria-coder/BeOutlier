import { Stack } from "@/components/ui/bits";

const FULL = [
  { title: "Apply.", text: "" },
  { title: "Aptitude test.", text: "Nothing to memorise." },
  { title: "Screening call.", text: "We want to hear how you think." },
  { title: "A letter.", text: "Selected or not. If not, come back next year." },
];

/**
 * The four admission steps and the "85 out of 100" line, with a 100 dot grid
 * (15 lit) so the bar is visible, not just stated.
 */
export function AdmissionSteps({
  variant = "full",
  extraLine,
  tone = "light",
}: {
  variant?: "full" | "short";
  extraLine?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
      <div>
        {variant === "full" ? (
          <Stack lines={["Applying takes 5 minutes.", "Getting in doesn't."]} className="text-5xl sm:text-7xl" />
        ) : (
          <Stack lines={["Same four steps."]} className="text-5xl sm:text-7xl" />
        )}
        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {FULL.map((s, i) => (
            <li
              key={s.title}
              className={`flex gap-4 rounded-[14px] border-2 p-4 sm:p-5 ${
                dark ? "border-offwhite/20 bg-navy-soft" : "border-navy bg-offwhite"
              }`}
            >
              <span className={`display text-4xl ${dark ? "text-coral" : "text-coral-deep"}`}>{i + 1}</span>
              <span>
                <span className="heavy block text-lg leading-tight">{s.title}</span>
                {variant === "full" && s.text ? (
                  <span className={`mt-1 block text-base leading-snug ${dark ? "text-offwhite/80" : "text-navy-muted"}`}>
                    {s.text}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figure>
        <div
          className="grid grid-cols-10 gap-1.5 sm:gap-2"
          role="img"
          aria-label="100 dots, 15 lit: 15 out of 100 applicants get in"
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-full ${
                i < 15 ? "bg-mint ring-2 ring-navy" : dark ? "bg-offwhite/15" : "bg-navy/15"
              }`}
            />
          ))}
        </div>
        <figcaption className="display mt-6 text-4xl sm:text-5xl">
          85 out of 100 won&apos;t make it.{extraLine ? <span className={`block ${dark ? "text-coral" : "text-coral-deep"}`}>{extraLine}</span> : null}
        </figcaption>
      </figure>
    </div>
  );
}
