/**
 * The ticker line. Pure CSS, pauses on hover, stops for reduced motion and parent mode.
 * The text is split into its sentences ("points"), each followed by a dot, with the
 * same space on both sides of every dot, so it reads as a list, not one long run.
 */
export function Marquee({
  text,
  tone = "ink",
  className = "",
}: {
  text: string;
  tone?: "ink" | "sand" | "mint";
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-mint",
    sand: "bg-sand text-ink",
    mint: "bg-mint text-ink",
  };
  const points = text
    .split(/(?<=\.)\s+/)
    .map((p) => p.replace(/\.$/, "").trim())
    .filter(Boolean);
  // Repeat the list so one half is always wider than the screen.
  const run = [...points, ...points];
  return (
    <div className={`overflow-hidden ${tones[tone]} ${className}`}>
      <p className="sr-only">{text}</p>
      <div className="marquee-track flex w-max animate-marquee" aria-hidden="true">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {run.map((p, i) => (
              <li
                key={i}
                className="display flex items-center gap-10 py-5 pr-10 text-[1.7rem] tracking-[0.03em] whitespace-nowrap sm:gap-14 sm:pr-14 sm:text-4xl"
              >
                {p}
                <span className="inline-block size-2.5 shrink-0 rounded-full bg-current opacity-70 sm:size-3" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
