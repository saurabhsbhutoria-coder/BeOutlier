import { Heading } from "./Landing";
import { InfoTable } from "@/components/ui/Lists";
import { Section, Stack } from "@/components/ui/bits";

/** "Before you start" and "After dark", shared word for word by both residentials. */
export function BeforeYouStart({ index }: { index: string }) {
  return (
    <Section tone="mint" className="!py-14">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">/ Before you start · {index}</p>
      <p className="display mt-4 text-4xl sm:text-6xl">
        No experience needed. Bring the curiosity. We bring the rest.
      </p>
    </Section>
  );
}

export function AfterDark({ index }: { index: string }) {
  return (
    <Section tone="navy">
      <Heading label="After dark" index={index} lines={[]} tone="mint" className="!mb-6" />
      <Stack lines={["Bonfires. Fun nights.", "Expeditions. Cultural evenings."]} className="text-5xl sm:text-7xl" />
      <p className="heavy mt-6 text-2xl text-coral sm:text-3xl">Mentors join in. Nobody&apos;s on their phone.</p>
    </Section>
  );
}

export function ParentsTable({ index, rows }: { index: string; rows: { label: string; value: string }[] }) {
  return (
    <Section tone="stone">
      <Heading label="For parents" index={index} lines={[]} className="!mb-6" />
      <InfoTable caption="Details for parents" rows={rows} />
    </Section>
  );
}
