import type { Reel } from "@/content/media";
import { LazyVideo } from "./LazyVideo";
import { Placeholder } from "@/components/ui/bits";
import { microcopy } from "@/content/microcopy";

/**
 * Student videos that swipe like Reels on mobile (horizontal snap rail of 9:16 tiles),
 * and sit as a grid on desktop. Only the visible clip plays.
 */
export function ReelsFeed({ items }: { items: Reel[] }) {
  if (items.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-[9/16]">
            <Placeholder block>{i === 0 ? microcopy.placeholders.video : ""}</Placeholder>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
      {items.map((r) => (
        <li
          key={r.src}
          className="relative aspect-[9/16] w-[72%] shrink-0 snap-center overflow-hidden rounded-[14px] border border-ink bg-ink sm:w-auto"
        >
          <LazyVideo src={r.src} poster={r.poster} label={r.caption} className="absolute inset-0 size-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-16 text-bone">
            {r.stat ? <p className="display text-4xl text-mint">{r.stat}</p> : null}
            <p className="mt-1 text-sm font-semibold">{r.caption}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
