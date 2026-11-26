import Image from "next/image";
import { KitArt } from "@/components/sections/KitArt";
import { Reveal } from "@/components/ui/Reveal";
import { kitGroups } from "@/content/hackathonKit";

/** How the two builds talk: glove, WiFi, car. */
export function KitFlow() {
  return (
    <div className="grid items-center gap-2 rounded-[22px] bg-linen p-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:p-8">
      <div className="flex items-center gap-4">
        <KitArt name="glove" label="The glove controller" className="w-28 shrink-0 sm:w-36" />
        <div>
          <p className="label text-mint-deep">You wear</p>
          <p className="display mt-1 text-2xl sm:text-3xl">The glove</p>
          <p className="mt-1 text-base leading-snug text-ink-muted">Reads your hand and your voice.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-8 sm:flex-col sm:gap-0 sm:pl-0">
        <KitArt name="wifi" label="" className="w-14 sm:w-20" />
        <p className="label text-ink/60">Over WiFi</p>
      </div>
      <div className="flex items-center gap-4">
        <KitArt name="car" label="The robocar" className="w-28 shrink-0 sm:w-36" />
        <div>
          <p className="label text-mint-deep">It drives</p>
          <p className="display mt-1 text-2xl sm:text-3xl">The robocar</p>
          <p className="mt-1 text-base leading-snug text-ink-muted">Follows every command you give.</p>
        </div>
      </div>
    </div>
  );
}

/** Every part in the kit, grouped by build, each with a picture. */
export function KitGrid() {
  return (
    <div className="mt-14 space-y-14 sm:mt-20 sm:space-y-20">
      {kitGroups.map((g) => (
        <div key={g.id}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-5">
            <p className="display text-3xl sm:text-4xl">{g.title}</p>
            <p className="label text-ink/60">{g.items.length} components</p>
          </div>
          <p className="mt-2 max-w-xl text-lg leading-snug text-ink-muted">{g.line}</p>
          <Reveal>
            <ul className={`mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${g.items.length % 4 === 0 ? "lg:grid-cols-4" : ""}`}>
              {g.items.map((item) => (
                <li key={item.name} className="flex flex-col rounded-[22px] bg-linen p-2.5 sm:p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                    {item.photo ? (
                      <Image src={item.photo} alt={item.name} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                    ) : (
                      <KitArt name={item.art} label={item.name} className="absolute inset-0 m-auto h-[82%] w-[82%]" />
                    )}
                    {item.qty > 1 ? (
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-ink px-2.5 py-0.5 text-sm font-semibold text-mint">
                        × {item.qty}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-2 sm:px-2">
                    <p className="text-base font-semibold leading-tight sm:text-lg">{item.name}</p>
                    <p className="mt-1.5 text-sm leading-snug text-ink-muted">{item.what}</p>
                    <p className="label mt-auto pt-3 !text-[10px] text-ink/45">{item.spec}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
