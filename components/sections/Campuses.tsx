import Image from "next/image";
import { formatINR, type Campus } from "@/content/programs";

/** Drawn stand in until a school photo is added: a quiet map with a pin and the neighbourhood. */
function CampusArt({ area }: { area: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
        <g stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.5" fill="none">
          <path d="M-10 70 C80 60 140 110 230 95 S360 40 420 60" />
          <path d="M-10 190 C70 170 150 220 250 200 S350 150 420 170" />
          <path d="M90 -10 C100 80 70 160 110 310" />
          <path d="M290 -10 C270 90 320 180 280 310" />
          <path d="M-10 250 L420 230" strokeOpacity="0.06" strokeWidth="10" />
        </g>
        <g transform="translate(200 128)">
          <circle r="34" fill="#6CD4B1" fillOpacity="0.16" />
          <path d="M0 22c-12-14-18-24-18-32a18 18 0 0 1 36 0c0 8-6 18-18 32z" fill="#6CD4B1" />
          <circle cy="-10" r="6.5" fill="#25282A" />
        </g>
      </svg>
      <p className="display absolute inset-x-4 bottom-4 text-3xl leading-[0.95] text-white sm:text-4xl">{area}</p>
    </div>
  );
}

/** One campus: photo, school, area, dates and fee. The whole card opens the school in Google Maps. */
export function CampusCard({ campus }: { campus: Campus }) {
  return (
    <a
      href={campus.maps}
      target="_blank"
      rel="noopener"
      className="group flex h-full flex-col rounded-[22px] bg-linen p-2.5 text-ink transition-colors hover:bg-mint sm:p-3"
      aria-label={`${campus.name}, ${campus.area}. Open in Google Maps`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        {campus.photo ? (
          <Image
            src={campus.photo}
            alt={`${campus.name}, ${campus.area}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <CampusArt area={campus.area} />
        )}
        <span className="label absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 !text-[10px] text-ink">{campus.city}</span>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <p className="text-lg font-semibold leading-tight sm:text-xl">{campus.name}</p>
        <p className="mt-1 text-base text-ink-muted group-hover:text-ink">{campus.area}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/15 pt-3 text-sm">
          <span>{campus.dates ?? "Dates announced soon"}</span>
          {campus.fee ? <span className="font-semibold">{formatINR(campus.fee)}</span> : null}
        </div>
        <span className="label mt-3 inline-flex items-center gap-1.5 !text-[11px] text-mint-deep group-hover:text-ink">
          Open in Google Maps <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
}

/** Campuses grouped by city. */
export function CampusGrid({ campuses }: { campuses: Campus[] }) {
  return (
    <div className="space-y-12">
      {(["Mumbai", "Pune"] as const).map((city) => {
        const list = campuses.filter((c) => c.city === city);
        if (!list.length) return null;
        return (
          <div key={city}>
            <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-5">
              <p className="display text-3xl sm:text-4xl">{city}</p>
              <p className="label text-ink/60">
                {list.length} {list.length === 1 ? "campus" : "campuses"}
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.id}>
                  <CampusCard campus={c} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
