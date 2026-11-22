"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/bits";
import { detailsLine, type Program } from "@/content/programs";

export interface HousePanel {
  program: Program;
  image: { src: string; alt: string };
}

/**
 * The three houses as expandable panels.
 * Desktop: side by side; hovering or focusing a panel widens it and brings its photo to colour.
 * Phone: stacked bars; tapping one opens it like an accordion. One is always open.
 */
export function HousePanels({ panels }: { panels: HousePanel[] }) {
  const [active, setActive] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 1024px)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 lg:h-[clamp(560px,78vh,720px)] lg:flex-row lg:gap-2">
      {panels.map(({ program: p, image }, i) => {
        const on = i === active;
        const n = String(i + 1).padStart(2, "0");
        return (
          <article
            key={p.id}
            onMouseEnter={canHover ? () => setActive(i) : undefined}
            onFocusCapture={() => setActive(i)}
            style={{ flexGrow: on ? 3.4 : 1 }}
            className={`group/h relative isolate min-w-0 basis-auto overflow-hidden bg-ink text-white transition-[height,flex-grow] duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] lg:h-auto lg:basis-0 ${
              on ? "h-[min(80svh,620px)]" : "h-[84px]"
            }`}
          >
            {/* Photo: duotone mint when closed, full colour when open */}
            <div className="grain absolute inset-0 -z-10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={`object-cover transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                  on ? "scale-100 grayscale-0" : "scale-110 grayscale contrast-110 brightness-90"
                }`}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-mint mix-blend-multiply transition-opacity duration-700 ${on ? "opacity-0" : "opacity-60"}`}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/5 to-ink/90 transition-opacity duration-700 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Header: the toggle */}
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={on}
                aria-controls={`house-${p.id}`}
                className="absolute inset-x-0 top-0 z-10 flex h-[84px] w-full items-center gap-4 px-5 text-left lg:h-auto lg:items-start lg:px-7 lg:pt-7"
              >
                <span className="label text-white/80">{n} /</span>
                <span className={`display text-[28px] leading-none ${on ? "" : "lg:hidden"}`}>{p.houseName}</span>
                <span
                  aria-hidden="true"
                  className={`ml-auto text-3xl leading-none font-light transition-transform duration-500 lg:hidden ${
                    on ? "rotate-45 opacity-0" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>

            {/* Desktop, closed: vertical house name */}
            <span
              aria-hidden="true"
              className={`display pointer-events-none absolute bottom-7 left-7 hidden rotate-180 text-[clamp(40px,4vw,64px)] leading-none whitespace-nowrap transition-opacity duration-500 [writing-mode:vertical-rl] lg:block ${
                on ? "opacity-0" : "opacity-100"
              }`}
            >
              {p.houseShort}
            </span>

            {/* Body: visible when open */}
            <div
              id={`house-${p.id}`}
              inert={!on}
              className={`absolute inset-x-5 bottom-6 z-10 flex max-w-xl flex-col gap-4 transition-[opacity,transform] lg:inset-x-7 lg:bottom-8 ${
                on
                  ? "translate-y-0 opacity-100 delay-200 duration-700"
                  : "pointer-events-none translate-y-6 opacity-0 duration-300"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="label text-mint">{p.houseShort}</p>
                <StatusBadge status={p.status} />
              </div>
              <p className="display text-[clamp(40px,5.4vw,76px)]">{p.title}</p>
              <p className="max-w-md text-lg leading-snug sm:text-xl">{p.cardLine}</p>
              <p className="label border-t border-white/25 pt-3 !text-[11px] leading-relaxed text-white/80">{detailsLine(p)}</p>
              <div className="pt-1">
                <ButtonLink href={p.route} variant="mint">
                  Enter the house
                </ButtonLink>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
