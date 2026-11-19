/** The ticker line. Pure CSS, pauses on hover, stops for reduced motion and parent mode. */
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
    ink: "bg-ink text-bone",
    sand: "bg-ink-deep text-sand",
    mint: "bg-ink-deep text-bone",
  };
  const items = Array.from({ length: 4 });
  return (
    <div className={`overflow-hidden border-y border-bone/10 ${tones[tone]} ${className}`}>
      <p className="sr-only">{text}</p>
      <div className="marquee-track flex w-max animate-marquee" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="display flex items-center gap-8 py-5 pr-8 text-3xl whitespace-nowrap sm:text-5xl">
                {text}
                <span className="inline-block size-2 rounded-full bg-mint" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
