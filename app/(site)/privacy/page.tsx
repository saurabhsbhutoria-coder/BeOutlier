import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/bits";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How BeOutlier collects, uses and protects data about students and parents.",
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT written from the site's real data flows. To be reviewed by a lawyer
 * before launch, against the Digital Personal Data Protection Act, 2023 and its Rules.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="19 November 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          BeOutlier (<Placeholder>[LEGAL ENTITY NAME AND ADDRESS]</Placeholder>) runs experiential programs for
          teenagers in India. This policy explains what we collect through beoutlier.in, why, and what you can ask us
          to do with it.
        </p>
      </section>

      <section>
        <h2>Children and parental consent</h2>
        <p>
          Our applicants are under 18. We only accept an application or booking when a parent or guardian fills in
          their own details and ticks the consent box. That consent covers us contacting the parent about that
          application. A parent can withdraw it at any time by writing to {site.email.display}.
        </p>
        <p>
          We do not use a student&apos;s data for advertising, and we never send student names, schools or ages to
          advertising platforms.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>About the student: name, age, grade, school, board, city, preferred campus, and the names of friends they are coming with (Hackathon, optional).</li>
          <li>About the parent: name, phone number and email.</li>
          <li>About the visit: the page the form was sent from, the referring website, and campaign tags in the link (UTM tags and Meta click ID).</li>
          <li>Payment for the Hackathon is handled by our payment provider. We do not see or store card or bank details.</li>
        </ul>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To process the application or booking, run the aptitude test and screening call, and send the selection letter.</li>
          <li>To contact the parent by email, phone and WhatsApp about that application.</li>
          <li>To understand which campaigns bring applications, using the visit details above.</li>
        </ul>
      </section>

      <section>
        <h2>Who processes it for us</h2>
        <ul>
          <li>Vercel hosts the website.</li>
          <li>Google stores applications in Google Sheets and sends our emails. Google Analytics measures site visits.</li>
          <li>Meta measures our ads. When a form is sent, we share the parent&apos;s email and phone number with Meta in hashed (scrambled) form, so Meta can match the visit to an ad. Student data is never shared.</li>
          <li><Placeholder>[PAYMENT PROVIDER NAME]</Placeholder> processes Hackathon payments.</li>
        </ul>
        <p>We do not sell personal data.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          The site uses cookies and similar storage from Meta and Google to measure visits and ads, and the browser
          session to keep your form progress and campaign tags until the form is sent. <Placeholder>[COOKIE CONSENT APPROACH: TO BE CONFIRMED]</Placeholder>
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          <Placeholder>[RETENTION PERIOD]</Placeholder> after the program the application was for, unless the parent
          asks us to delete it sooner or the law requires us to keep it longer.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          A parent can ask us to show, correct or delete the data we hold about them or their child, or withdraw
          consent. Write to{" "}
          <a href={site.email.href} className="underline underline-offset-2">
            {site.email.display}
          </a>{" "}
          and we will reply within <Placeholder>[RESPONSE TIME]</Placeholder>.
        </p>
        <p>
          Grievance officer: <Placeholder>[NAME, EMAIL]</Placeholder>
        </p>
      </section>
    </LegalPage>
  );
}
