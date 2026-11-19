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
  tone = "dark",
}: {
  variant?: "full" | "short";
  extraLine?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const line = dark ? "border-bone/10" : "border-ink/12";
  return (
    <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:items-end">
      <div>
        {variant === "full" ? (
          <Stack lines={["Applying takes 5 minutes.", "Getting in doesn't."]} className="text-5xl sm:text-7xl" />
        ) : (
          <Stack lines={["Same four steps."]} className="text-5xl sm:text-7xl" />
        )}
        <ol className={`mt-12 border-t ${line}`}>
          {FULL.map((s, i) => (
            <li key={s.title} className={`grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b py-5 ${line}`}>
              <span className={`label ${dark ? "text-mint" : "text-mint-deep"}`}>0{i + 1}</span>
              <span>
                <span className="text-xl font-semibold leading-tight">{s.title}</span>
                {variant === "full" && s.text ? (
                  <span className={`ml-2 text-base ${dark ? "text-bone/60" : "text-ink-muted"}`}>{s.text}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figure>
        <div className="grid grid-cols-10 gap-2 sm:gap-2.5" role="img" aria-label="100 dots, 15 lit: 15 out of 100 applicants get in">
          {Array.from({ length: 100 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-full ${
                i < 15 ? "bg-mint shadow-[0_0_12px_rgb(108_212_177/0.45)]" : dark ? "bg-bone/10" : "bg-ink/10"
              }`}
            />
          ))}
        </div>
        <figcaption className="display mt-8 text-4xl sm:text-5xl">
          85 out of 100 won&apos;t make it.
          {extraLine ? <span className={`block ${dark ? "text-sand" : "text-sand-deep"}`}>{extraLine}</span> : null}
        </figcaption>
      </figure>
    </div>
  );
}
