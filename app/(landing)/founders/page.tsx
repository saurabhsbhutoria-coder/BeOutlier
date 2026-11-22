import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CloseBlock, FormSection, Heading, LandingHero } from "@/components/sections/Landing";
import { FacesGrid } from "@/components/sections/FacesGrid";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { NumberedList } from "@/components/ui/Lists";
import { Placeholder, Section } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/media/Marquee";
import { PhotoStrip } from "@/components/media/PhotoStrip";
import { LazyVideo } from "@/components/media/LazyVideo";
import { StickyApplyBar } from "@/components/layout/StickyApplyBar";
import { TrackViewContent } from "@/components/tracking/TrackViewContent";
import { ctaLabel, eligibilityText, formatINR, getProgram } from "@/content/programs";
import { peopleFor } from "@/content/people";
import { fleaMarketPhotos, fleaMarketVideo, heroVideos } from "@/content/media";
import { microcopy } from "@/content/microcopy";

const program = getProgram("founders");

export const metadata: Metadata = {
  title: "Founders Fellowship. Build a brand. Sell it live.",
  description:
    "Founders Fellowship. House of Founders. Summer 2027. 10 days. Mumbai and Pune. Grades 6 to 12. 15% get in.",
  alternates: { canonical: "/founders" },
};

export default function FoundersPage() {
  if (!program) notFound();
  const p = program;
  const ph = microcopy.placeholders;
  const byCity = (city: "Mumbai" | "Pune") => (p.campuses ?? []).filter((c) => c.city === city);

  return (
    <>
      <TrackViewContent programId={p.id} title={p.title} />

      <LandingHero
        program={p}
        lines={["Build a brand.", "Sell it live.", "Keep what you make."]}
        video={heroVideos.founders}
        media={p.image}
        facts={[
          `${p.title}. ${p.houseName}. Summer 2027.`,
          `${p.duration}. ${p.placeLine}. ${eligibilityText(p.eligibility)}. 15% get in.`,
        ]}
      />

      <Section tone="white">
        <Heading label="What it is" index="01" lines={[]} className="!mb-6" />
        <Reveal>
          <p className="heavy max-w-5xl text-2xl leading-[1.15] sm:text-4xl">
            Ten days. Offline. You form a team, build a brand from a blank page, source materials in the wholesale
            market, pitch it to investors and sell it at a live flea market. We give you seed capital to start, and{" "}
            <span className="mark">what you earn at the stall is yours.</span>
          </p>
        </Reveal>
      </Section>

      <PhotoStrip photos={fleaMarketPhotos} className="bg-white pb-20 sm:pb-32" />

      <Section tone="ink">
        <Heading label="The 10 days" index="02" lines={["8 masterclasses.", "1 Demo Day.", "1 flea market."]} tone="mint" />
        <NumberedList
          tone="dark"
          items={[
            "Problem solving like a consultant",
            "Design thinking",
            "Market research with AI tools",
            "Pricing and unit economics",
            "Market visit: sourcing and vendor negotiation",
            "Customer personas",
            "Branding",
            "How to sell",
            "Demo Day: pitch to investors",
            "Live flea market, open to the public",
          ]}
        />
      </Section>

      <Section tone="white">
        <Heading label="Every day" index="03" lines={[]} className="!mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { time: "11 am to 1 pm", block: "Masterclass", text: "One idea, taught through real cases." },
            { time: "1 pm to 2 pm", block: "Lunch", text: "Bring your tiffin, or opt into our meal plan." },
            { time: "2 pm to 4 pm", block: "Workshop", text: "Apply it to your own brand, that same day." },
          ].map((r) => (
            <div key={r.block} className="border border-ink bg-white p-7 sm:p-8">
              <p className="label text-mint-deep">{r.time}</p>
              <p className="display mt-6 text-5xl">{r.block}</p>
              <p className="mt-3 leading-relaxed text-ink-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mint">
        <Heading label="What you walk away with" index="04" lines={[]} className="!mb-6" />
        <ol className="grid gap-4 lg:grid-cols-5">
          {[
            ["Your own brand.", "Name, product, packaging, built from zero."],
            ["Your profits.", "Whatever you sell is yours to keep."],
            ["Your journal.", "Everything you learned, in your own handwriting."],
            ["A shot at the prize pool.", "The best brands get scouted by investors."],
            ["The Outliers network.", "Alumni, mentors and every cohort after you."],
          ].map(([title, text], i) => (
            <li key={title} className="bg-ink p-6 text-white">
              <span className="display text-4xl text-mint">{i + 1}</span>
              <p className="heavy mt-2 text-lg leading-tight">{title}</p>
              <p className="mt-2 text-sm leading-snug text-white/75">{text}</p>
            </li>
          ))}
        </ol>
        <p className="display mt-12 max-w-4xl text-4xl sm:text-6xl">
          Some teams sell out. Some lose money. <span className="mark">Every team knows why.</span>
        </p>
      </Section>

      <Section tone="linen">
        <Heading label="Who you learn from" index="05" lines={["People who have built things."]} />
        <p className="-mt-6 mb-12 text-xl text-ink-muted">1 mentor for every 9 students.</p>
        <FacesGrid people={peopleFor("founders", "mentor")} />
      </Section>

      <div className="bg-white">
        <div className="shell pt-10">
          <p className="label flex items-center gap-2.5"><span className="dot" aria-hidden="true" />Previously hosted at <span className="opacity-55">· 06</span></p>
        </div>
        <Marquee
          tone="mint"
          className="mt-4"
          text="DSB International School. The Green Acres Academy. The NEXT School. Goregaon Sports Club."
        />
      </div>

      <Section tone="white">
        <Heading label="Campuses for 2027" index="07" lines={[]} className="!mb-6" />
        <div className="overflow-x-auto border border-ink">
          <table className="w-full min-w-[560px] text-left">
            <thead className="bg-ink text-white">
              <tr>
                {["City", "Campus", "Dates", "Fee"].map((h) => (
                  <th key={h} scope="col" className="label p-5 text-white/75">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["Mumbai", "Pune"] as const).map((city) => {
                const list = byCity(city);
                const fees = list.map((c) => (c.fee ? formatINR(c.fee) : null)).filter(Boolean);
                const dates = list.map((c) => c.dates).filter(Boolean);
                return (
                  <tr key={city} className="border-t border-ink/15 align-top">
                    <th scope="row" className="display p-5 text-2xl">
                      {city}
                    </th>
                    <td className="p-4 font-medium">
                      {list.map((c) => c.name).join(", ")}, <Placeholder>{ph.moreCampuses}</Placeholder>
                    </td>
                    <td className="p-4">{dates.length ? dates.join(", ") : <Placeholder>{ph.dates}</Placeholder>}</td>
                    <td className="p-4">{fees.length ? fees.join(" or ") : <Placeholder>{ph.fee}</Placeholder>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="linen">
        <Heading label="How you get in" index="08" lines={[]} className="!mb-6" />
        <AdmissionSteps variant="full" extraLine="Every campus, same bar." />
      </Section>

      <Section tone="ink">
        <Heading label="The flea market" index="09" lines={["Shop what the next", "generation built."]} tone="mint" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <p className="heavy text-2xl leading-tight sm:text-3xl">
            Open to all. Bring family. The students set the prices. You decide what sells out.
          </p>
          {fleaMarketVideo ? (
            <div className="grain relative aspect-video overflow-hidden bg-ink">
              <LazyVideo src={fleaMarketVideo.mp4} poster={fleaMarketVideo.poster} label="The flea market" className="absolute inset-0 size-full object-cover" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {fleaMarketPhotos.map((photo) => (
                <div key={photo.src} className="grain relative aspect-[3/4] overflow-hidden bg-ink">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <CloseBlock program={p} lines={["Average is crowded."]} />

      <FormSection program={p} />

      <StickyApplyBar label={ctaLabel(p)} />
    </>
  );
}
