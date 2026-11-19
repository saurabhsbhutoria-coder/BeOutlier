import type { Metadata } from "next";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { DropCard, HouseCard } from "@/components/sections/Cards";
import { getProgram, houses } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Summer 2027. Three houses. Pick one. Plus the Robotics Hackathon, open to all.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  const hackathon = getProgram("hackathon");
  return (
    <>
      <section className="on-coral bg-coral text-navy">
        <div className="shell py-14 sm:py-20">
          <Eyebrow label="Programs" className="!text-navy" />
          <Stack as="h1" lines={["Summer 2027.", "Three houses.", "Pick one."]} className="mt-4 text-6xl sm:text-8xl" />
        </div>
      </section>
      <Section tone="stone">
        <div className="grid gap-6 lg:grid-cols-3">
          {houses().map((p, i) => (
            <HouseCard key={p.id} program={p} index={i + 1} />
          ))}
        </div>
      </Section>
      {hackathon ? (
        <Section tone="light">
          <DropCard program={hackathon} eyebrow={`Drop · ${hackathon.datesLine}`} />
        </Section>
      ) : null}
    </>
  );
}
