import Image from "next/image";
import type { Photo } from "@/content/media";

/**
 * Auto scrolling photo strip. Pauses on hover and focus, stops for reduced motion.
 * With few photos the set is repeated so the loop has no gap.
 */
export function PhotoStrip({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  if (photos.length === 0) return null;
  const minTiles = 8;
  const set = Array.from({ length: Math.max(1, Math.ceil(minTiles / photos.length)) }).flatMap(() => photos);
  return (
    <div className={`overflow-hidden ${className}`}>
      <ul className="sr-only">
        {photos.map((p) => (
          <li key={p.src}>{p.alt}</li>
        ))}
      </ul>
      <div className="marquee-track flex w-max animate-strip gap-3" aria-hidden="true">
        {[0, 1].map((half) =>
          set.map((p, i) => (
            <div
              key={`${half}-${i}`}
              className="relative h-56 w-48 shrink-0 overflow-hidden rounded-[14px] border border-ink sm:h-72 sm:w-64"
            >
              <Image src={p.src} alt="" fill sizes="(min-width: 640px) 256px, 192px" className="object-cover" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
