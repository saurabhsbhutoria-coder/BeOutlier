import type { Metadata } from "next";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { Eyebrow, Stack } from "@/components/ui/bits";
import { getProgram, type ProgramId } from "@/content/programs";

export const metadata: Metadata = {
  title: "Apply for Summer 2027",
  description: "Three houses. Pick one. Applying takes 5 minutes. Getting in doesn't.",
  alternates: { canonical: "/apply" },
};

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ house?: string }> }) {
  const { house } = await searchParams;
  const initial = getProgram(house);
  const initialHouse = initial && initial.house ? (initial.id as ProgramId) : undefined;

  return (
    <section className="bg-ink text-bone">
      <div className="shell grid gap-10 py-12 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <Eyebrow label="Admissions" index="Summer 2027" tone="mint" />
          <Stack as="h1" lines={["Apply for", "Summer 2027."]} className="mt-4 text-6xl sm:text-8xl" />
          <p className="mt-6 text-xl leading-snug text-sand sm:text-2xl">
            Applying takes 5 minutes. Getting in doesn&apos;t.
          </p>
          <ol className="label mt-10 flex flex-col gap-3 border-l border-bone/15 pl-5 text-bone/60">
            <li>1. Apply.</li>
            <li>2. Aptitude test.</li>
            <li>3. Screening call.</li>
            <li>4. A letter.</li>
          </ol>
          <p className="display mt-6 text-3xl">85 out of 100 won&apos;t make it.</p>
        </div>
        <ApplicationForm mode="apply" showHousePicker initialHouse={initialHouse} />
      </div>
    </section>
  );
}
