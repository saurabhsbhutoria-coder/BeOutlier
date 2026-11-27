import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { MentorRail } from "@/components/sections/MentorRail";
import { foundingTeam, hostSchools, levels, numbers, vision, type TeamMember } from "@/content/about";
import { peopleFor } from "@/content/people";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BeOutlier is an experiential school for teenagers in India. Our vision, how it started, the founding team and the mentors.",
  alternates: { canonical: "/about" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

/** A person in a rounded card. No photo yet: initials on mint, never a fake face. */
function PersonCard({ person, size = "lg" }: { person: TeamMember; size?: "lg" | "sm" }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2.5 shadow-[0_1px_2px_rgb(37_40_42/0.06),0_18px_40px_-22px_rgb(37_40_42/0.3)] ring-1 ring-ink/[0.07]">
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-mint ${
          size === "lg" ? "aspect-[4/5]" : "aspect-square"
        }`}
      >
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={`Portrait of ${person.name}`} className="absolute inset-0 size-full object-cover" loading="lazy" />
        ) : (
          <span className="display text-6xl text-ink/80 sm:text-7xl" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
      </div>
      <div className="px-2 pt-4 pb-2">
        <p className={`font-semibold leading-tight ${size === "lg" ? "text-xl" : "text-base"}`}>{person.name}</p>
        <p className="mt-1.5 text-sm leading-snug text-ink-muted">{person.role}</p>
      </div>
    </article>
  );
}

export default function AboutPage() {
  const mentors = peopleFor("home", "mentor");
  return (
    <>
      {/* Hero */}
      <Section tone="white">
        <Eyebrow label="About us" />
        <Stack
          as="h1"
          lines={["A school", "beyond classrooms."]}
          className="mt-8 text-[3.4rem] sm:text-8xl lg:text-[clamp(110px,10vw,170px)]"
        />
        <p className="mt-10 max-w-2xl text-xl leading-snug sm:text-2xl">
          BeOutlier is an experiential school for teenagers in India. It does not compete with schools. It adds the
          layer schools leave out: <span className="mark">learning by doing, in front of real people.</span>
        </p>
      </Section>

      {/* Vision */}
      <Section tone="mint">
        <Eyebrow label="Our vision" index="01" />
        <h2 className="display mt-8 max-w-6xl text-[2.9rem] leading-[0.92] sm:text-7xl lg:text-[clamp(72px,6.4vw,112px)]">
          {vision}
        </h2>
      </Section>

      {/* Story */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow label="How it started" index="02" />
            <Stack lines={["Last Summer,", "in Mumbai."]} className="mt-8 text-5xl sm:text-7xl" />
          </div>
          <div className="grid gap-6 text-xl leading-snug sm:text-2xl">
            <p>We expected 25 students at our first orientation. 70 came.</p>
            <p>
              45 teenagers then built brands from scratch in 10 days. They sourced from the wholesale market, priced,
              pitched and sold to strangers at a live flea market.
            </p>
            <p className="font-semibold">Some sold out. Some lost money. Every one of them knows why.</p>
            <p className="text-lg text-ink-muted">Hosted by {hostSchools.join(" and ")}.</p>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="flex flex-col-reverse gap-2 rounded-2xl bg-linen p-6">
              <dt className="label text-ink-muted">{n.label}</dt>
              <dd className="display text-5xl leading-none sm:text-6xl">{n.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The pathway */}
      <Section tone="sand">
        <Eyebrow label="Where it leads" index="03" />
        <Stack lines={["Summer 2027 is", "only Level 1."]} className="mt-8 mb-12 text-5xl sm:text-7xl" />
        <ol className="grid gap-3 sm:grid-cols-3">
          {levels.map((l, i) => (
            <li
              key={l.level}
              className={`flex flex-col gap-3 rounded-2xl p-6 sm:p-8 ${i === 0 ? "bg-ink text-white" : "bg-white/60 ring-1 ring-ink/10"}`}
            >
              <p className={`label flex items-center gap-2.5 ${i === 0 ? "text-mint" : "text-ink/70"}`}>
                <span className="dot" aria-hidden="true" />
                {l.level} <span className="opacity-60">· {l.when}</span>
              </p>
              <p className="text-lg leading-snug">{l.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Founding team */}
      <Section tone="white">
        <Eyebrow label="The founding team" index="04" />
        <Stack lines={["The people", "who run it."]} className="mt-8 mb-12 text-5xl sm:text-7xl" />
        <ul className="grid max-w-xl grid-cols-2 gap-4 sm:gap-5">
          {foundingTeam.map((p) => (
            <li key={p.name}>
              <PersonCard person={p} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Mentors */}
      {mentors.length ? (
        <Section tone="linen">
          <Eyebrow label="The mentors" index="05" />
          <Stack lines={["Not teachers.", "People who have done it."]} className="mt-8 mb-12 text-5xl sm:text-7xl" />
          <MentorRail people={mentors} />
        </Section>
      ) : null}

      {/* Close */}
      <section className="bg-mint text-ink">
        <div className="shell py-28 sm:py-40">
          <h2 className="display max-w-5xl text-[3.4rem] leading-[0.9] sm:text-8xl lg:text-[clamp(100px,10vw,170px)]">
            <span className="block">Average is crowded.</span>
            <span className="block">Be an Outlier.</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/apply" variant="ink" size="lg">
              {site.primaryCta}
            </ButtonLink>
            <a href={site.whatsapp.href} className="label underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Talk to us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
