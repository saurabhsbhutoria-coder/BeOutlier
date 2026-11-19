/** The ticker line. Pure CSS, pauses on hover, stops for reduced motion and parent mode. */
export function Marquee({
  text,
  tone = "navy",
  className = "",
}: {
  text: string;
  tone?: "navy" | "coral" | "mint";
  className?: string;
}) {
  const tones = {
    navy: "bg-navy text-offwhite",
    coral: "bg-coral text-navy",
    mint: "bg-mint text-navy",
  };
  const items = Array.from({ length: 4 });
  return (
    <div className={`overflow-hidden border-y-2 border-navy ${tones[tone]} ${className}`}>
      <p className="sr-only">{text}</p>
      <div className="marquee-track flex w-max animate-marquee" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="display flex items-center gap-6 py-3 pr-6 text-2xl whitespace-nowrap sm:text-3xl">
                {text}
                <span className="inline-block size-3 rotate-45 bg-current opacity-80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
