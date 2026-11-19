import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/bits";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for applying to and attending BeOutlier programs.",
  alternates: { canonical: "/terms" },
};

/** DRAFT. To be reviewed by a lawyer before launch. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="19 November 2026">
      <section>
        <h2>Applying</h2>
        <p>
          Applying to a Summer 2027 program does not guarantee a seat. Admission has four steps: the application, an
          aptitude test, a screening call and a letter. BeOutlier decides admission at every campus. Partner schools
          only collect fees. We offer seats to at most 15 of every 100 applicants.
        </p>
        <p>The Robotics Hackathon is open to all. There is no test and no call.</p>
      </section>

      <section>
        <h2>Fees and payment</h2>
        <ul>
          <li>Hackathon seats are paid online at booking. A seat is held once the payment goes through.</li>
          <li>Summer 2027 fees are paid after a selection letter, as set out in that letter.</li>
          <li>Cancellations and refunds: <Placeholder>[REFUND POLICY]</Placeholder></li>
        </ul>
      </section>

      <section>
        <h2>At the program</h2>
        <ul>
          <li>Students follow the instructions of mentors, wardens and venue staff.</li>
          <li>We may ask a student to leave a program for conduct that puts others at risk. <Placeholder>[CONDUCT POLICY AND REFUND IN THAT CASE]</Placeholder></li>
          <li>Photos and videos: <Placeholder>[MEDIA CONSENT TERMS]</Placeholder></li>
          <li>Medical information and emergencies: <Placeholder>[MEDICAL TERMS]</Placeholder></li>
        </ul>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          <Placeholder>[LIABILITY TERMS]</Placeholder>
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. <Placeholder>[JURISDICTION]</Placeholder>
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <a href={site.email.href} className="underline underline-offset-2">
            {site.email.display}
          </a>{" "}
          or WhatsApp{" "}
          <a href={site.whatsapp.href} className="underline underline-offset-2">
            {site.whatsapp.display}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
