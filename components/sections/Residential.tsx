import { Heading } from "./Landing";
import { InfoTable } from "@/components/ui/Lists";
import { Section, Stack } from "@/components/ui/bits";

/** "Before you start" and "After dark", shared word for word by both residentials. */
export function BeforeYouStart({ index }: { index: string }) {
  return (
    <Section tone="deep" className="border-y border-bone/10">
      <p className="label text-mint">[ {index} ] &nbsp;Before you start</p>
      <p className="display mt-8 max-w-5xl text-4xl sm:text-7xl">
        No experience needed. Bring the curiosity. We bring the rest.
      </p>
    </Section>
  );
}

export function AfterDark({ index }: { index: string }) {
  return (
    <Section tone="ink">
      <Heading label="After dark" index={index} lines={[]} tone="mint" className="!mb-6" />
      <Stack lines={["Bonfires. Fun nights.", "Expeditions. Cultural evenings."]} className="text-5xl sm:text-7xl" />
      <p className="mt-8 text-2xl text-sand sm:text-3xl">Mentors join in. Nobody&apos;s on their phone.</p>
    </Section>
  );
}

export function ParentsTable({ index, rows }: { index: string; rows: { label: string; value: string }[] }) {
  return (
    <Section tone="deep">
      <Heading label="For parents" index={index} lines={[]} className="!mb-6" />
      <InfoTable caption="Details for parents" rows={rows} />
    </Section>
  );
}
