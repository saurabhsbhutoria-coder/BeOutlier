import type { Metadata } from "next";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { DropCard } from "@/components/sections/Cards";
import { HousePanels } from "@/components/sections/HousePanels";
import { getProgram, houses } from "@/content/programs";
import { houseImages } from "@/content/media";

export const metadata: Metadata = {
  title: "Programs",
  description: "Summer 2027. Three houses. Pick one. Plus the Robotics Hackathon, open to all.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  const hackathon = getProgram("hackathon");
  const panels = houses().map((p) => ({ program: p, image: houseImages[p.house as keyof typeof houseImages] }));
  return (
    <>
      <section className="bg-mint text-ink">
        <div className="shell py-16 sm:py-24">
          <Eyebrow label="Programs" />
          <Stack
            as="h1"
            lines={["Summer 2027.", "Three houses.", "Pick one."]}
            className="mt-8 text-[3.4rem] sm:text-8xl lg:text-[clamp(110px,10vw,170px)]"
          />
        </div>
      </section>
      <Section tone="white">
        <HousePanels panels={panels} />
      </Section>
      {hackathon ? (
        <Section tone="ink">
          <DropCard program={hackathon} eyebrow={`Drop · ${hackathon.datesLine}`} />
        </Section>
      ) : null}
    </>
  );
}
