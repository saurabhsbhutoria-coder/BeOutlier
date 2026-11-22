import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, Stack } from "@/components/ui/bits";
import { detailsLine, feeText, getProgram } from "@/content/programs";
import { microcopy } from "@/content/microcopy";
import { site } from "@/content/site";
import { LeadReference } from "./LeadReference";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const { program: id } = await searchParams;
  const program = getProgram(id);
  const t = microcopy.thankYou;
  const isBooking = program?.formType === "booking";
  const paymentUrl = process.env.NEXT_PUBLIC_HACKATHON_PAYMENT_URL;
  const engineers = getProgram("engineers");

  return (
    <>
      <section className="bg-mint text-ink">
        <div className="shell py-16 sm:py-24">
          <Eyebrow label={program?.title ?? "Summer 2027"} />
          {isBooking ? (
            <>
              <Stack as="h1" lines={[t.booking.title]} className="mt-4 text-6xl sm:text-8xl" />
              <p className="mt-6 max-w-xl text-lg leading-snug">
                {paymentUrl ? t.booking.bodyPay : t.booking.bodyNoPay}
              </p>
              {paymentUrl && program ? (
                <div className="mt-8">
                  <ButtonLink href={paymentUrl} variant="ink" size="lg">
                    {t.booking.payCta(feeText(program.fee) ?? "")}
                  </ButtonLink>
                </div>
              ) : null}
              <LeadReference label={t.booking.reference} />
            </>
          ) : (
            <>
              <Stack as="h1" lines={[t.apply.title]} className="mt-4 text-6xl sm:text-8xl" />
              <p className="mt-6 max-w-xl text-lg leading-snug">{t.apply.body}</p>
              <ol className="mt-8 grid gap-3 sm:grid-cols-4">
                {t.apply.steps.map((s, i) => (
                  <li
                    key={s}
                    className={`border p-4 ${i === 0 ? "border-ink bg-ink text-mint" : "border-ink/30"}`}
                  >
                    <span className="display text-3xl">{i + 1}</span>
                    <p className="mt-1 font-semibold">{s}</p>
                  </li>
                ))}
              </ol>
              <LeadReference label="Application reference" />
            </>
          )}
          <p className="mt-8 text-sm">
            <a href={site.whatsapp.href} className="underline underline-offset-4 hover:text-mint">
              WhatsApp {site.whatsapp.display}
            </a>
          </p>
        </div>
      </section>

      {isBooking && engineers ? (
        <Section tone="sand">
          <Eyebrow label={t.houseOfEngineersEyebrow} index={engineers.houseName ?? ""} tone="ink" />
          <Stack lines={[engineers.tagline]} className="mt-4 max-w-4xl text-5xl sm:text-7xl" />
          <p className="label mt-6 leading-relaxed text-ink/70">{detailsLine(engineers)}</p>
          <div className="mt-8">
            <ButtonLink href={engineers.route} variant="ink" size="lg">
              Enter the house
            </ButtonLink>
          </div>
        </Section>
      ) : (
        <Section tone="white">
          <ButtonLink href="/" variant="ink">
            {t.back}
          </ButtonLink>
        </Section>
      )}
    </>
  );
}
