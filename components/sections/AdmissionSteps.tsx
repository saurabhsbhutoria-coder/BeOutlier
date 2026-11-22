import { Stack } from "@/components/ui/bits";
import { OutlierGraph } from "./OutlierGraph";

const FULL = [
  { title: "Apply.", text: "" },
  { title: "Aptitude test.", text: "Nothing to memorise." },
  { title: "Screening call.", text: "We want to hear how you think." },
  { title: "A letter.", text: "Selected or not. If not, come back next year." },
];

/**
 * The four admission steps beside the outlier graph: a crowd of dots and the
 * one that breaks away. Caption: "85 out of 100 won't make it."
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
  const line = dark ? "border-white/15" : "border-ink/15";
  return (
    <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
      <div>
        {variant === "full" ? (
          <Stack lines={["Applying takes 5 minutes.", "Getting in doesn't."]} className="text-5xl sm:text-7xl" />
        ) : (
          <Stack lines={["Same four steps."]} className="text-5xl sm:text-7xl" />
        )}
        <ol className={`mt-12 border-t ${dark ? "border-white/40" : "border-ink"}`}>
          {FULL.map((s, i) => (
            <li key={s.title} className={`grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-b py-5 ${line}`}>
              <span className={`display text-4xl ${dark ? "text-mint" : "text-mint-deep"}`}>{i + 1}</span>
              <span>
                <span className="display block text-3xl sm:text-4xl">{s.title}</span>
                {variant === "full" && s.text ? (
                  <span className={`mt-1 block text-base sm:text-lg ${dark ? "text-white/70" : "text-ink-muted"}`}>
                    {s.text}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figure>
        <OutlierGraph tone={tone} />
        <figcaption className="display mt-8 text-4xl sm:text-5xl">
          85 out of 100 won&apos;t make it.
          {extraLine ? (
            <span className={`block ${dark ? "text-mint" : "text-mint-deep"}`}>{extraLine}</span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}
