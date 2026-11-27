/**
 * Home page FAQs (added 23 November 2026). Every answer is built from facts
 * already in CLAUDE.md and content/programs.ts, so it stays true when a
 * program changes. Keep answers short: the fact, then stop.
 */
import { site } from "./site";
import { eligibilityText, feeText, getProgram, type Program } from "./programs";
import { levels } from "./about";

const f = getProgram("founders") as Program;
const e = getProgram("engineers") as Program;
const d = getProgram("designers") as Program;
const h = getProgram("hackathon") as Program;

/** "Last week of May" to "last week of May": only the first letter. */
const lowerFirst = (s: string | null) => (s ? s[0].toLowerCase() + s.slice(1) : "dates announced soon");

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Who can apply?",
    a: `The ${f.title} is for ${eligibilityText(f.eligibility).toLowerCase()}. The ${e.title} and the ${d.title} are for ${eligibilityText(e.eligibility).toLowerCase()}. Students come from all over India.`,
  },
  {
    q: "How much does it cost?",
    a: `${feeText(f.fee)} for any of the three houses. For the two residential programs, stay and meals are included.`,
  },
  {
    q: "Is this a summer camp?",
    a: "No. Not a camp, not a course. Every student builds something real and shows it to real people: a brand sold at a live flea market, a working robot, or something designed and built by hand.",
  },
  {
    q: "Does my child need any experience?",
    a: "No experience needed. Bring the curiosity. We bring the rest.",
  },
  {
    q: "How does selection work?",
    a: "Apply online in 5 minutes. Then an aptitude test, with nothing to memorise, and a screening call. Every applicant gets a letter, selected or not. About 15 of every 100 applicants are offered a seat.",
  },
  {
    q: "Where and when?",
    a: `${f.houseName}: five campuses in Mumbai and one in Pune, going home every evening, dates announced soon. ${e.houseName}: ${e.venue}, ${lowerFirst(e.datesLine)}, residential. ${d.houseName}: ${d.venue}, ${lowerFirst(d.datesLine)}, residential.`,
  },
  {
    q: "Is it safe for my child to stay away from home?",
    a: "Residential students stay 3 to a room, with wardens on duty, a doctor and medical team, a security team and CCTV. Every house has 1 mentor for every 9 students. On day 1 you drop your child off and stay for the orientation.",
  },
  {
    q: "What does my child take home?",
    a: "A documentation journal, a detailed evaluation report, a BeOutlier certificate and access to Level 2. Founders keep their brand and what they earn. Robotics students keep the robot they built.",
  },
  {
    q: "What comes after Summer 2027?",
    a: levels.map((l) => `${l.level}: ${l.text}`).join(" "),
  },
  {
    q: "What is the Robotics Hackathon?",
    a: `Two days, ${h.datesLine}, at ${h.venue}. ${eligibilityText(h.eligibility)}. Every student builds their own robot and keeps the full kit. No experience needed. ${feeText(h.fee)}, paid online at booking. Open to all, no test.`,
  },
  {
    q: "How do I talk to someone?",
    a: `WhatsApp us on ${site.whatsapp.display} or write to ${site.email.display}.`,
  },
];
