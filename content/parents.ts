/**
 * The For Parents comparison: one row per question, one column per house.
 * Every value comes from CLAUDE.md. null renders a visible placeholder.
 */
import { getProgram, feeText, eligibilityText, type Program } from "./programs";

export interface ParentRow {
  label: string;
  values: Record<"founders" | "engineers" | "designers", string | null>;
}

const f = getProgram("founders") as Program;
const e = getProgram("engineers") as Program;
const d = getProgram("designers") as Program;

export const parentRows: ParentRow[] = [
  { label: "Format", values: { founders: `${f.format}. ${f.duration}.`, engineers: `${e.format}. ${e.duration}.`, designers: `${d.format}. ${d.duration}.` } },
  {
    label: "Where",
    values: {
      founders: "Campuses in Mumbai and Pune",
      engineers: "FLAME University, Pune",
      designers: "International Centre Goa",
    },
  },
  { label: "When", values: { founders: null, engineers: e.datesLine, designers: d.datesLine } },
  {
    label: "Who",
    values: { founders: eligibilityText(f.eligibility), engineers: eligibilityText(e.eligibility), designers: eligibilityText(d.eligibility) },
  },
  {
    label: "Fee",
    values: {
      founders: feeText(f.fee),
      engineers: `${feeText(e.fee)}. Stay and meals included.`,
      designers: `${feeText(d.fee)}. Stay and meals included.`,
    },
  },
  {
    label: "Daily hours",
    values: {
      founders: "11 am to 4 pm. Masterclass, lunch, workshop.",
      engineers: "Lives on campus for four days.",
      designers: "Lives on site for four days.",
    },
  },
  {
    label: "Stay",
    values: {
      founders: "Goes home every evening.",
      engineers: "On the FLAME campus. 3 students per room.",
      designers: "International Centre Goa. 3 students per room.",
    },
  },
  {
    label: "Meals",
    values: {
      founders: "Bring your tiffin, or opt into our meal plan.",
      engineers: "All included.",
      designers: "All included.",
    },
  },
  {
    label: "Supervision",
    values: {
      founders: "1 mentor for every 9 students.",
      engineers: "1 mentor for every 9 students. Wardens on duty.",
      designers: "1 mentor for every 9 students. Wardens on duty.",
    },
  },
  {
    label: "Safety",
    values: {
      founders: null,
      engineers: "Doctor and medical team on campus. Security team. CCTV surveillance.",
      designers: "Doctor and medical team on site. Security team. CCTV surveillance.",
    },
  },
  {
    label: "Day 1",
    values: {
      founders: null,
      engineers: "You drop your child at campus and stay for the orientation.",
      designers: "You drop your child off and stay for the orientation.",
    },
  },
  {
    label: "Brings home",
    values: {
      founders: "Their own brand, their profits and their journal.",
      engineers: "A working robot, theirs to keep.",
      designers: "Their sketches and what they learned. The project itself stays in Goa.",
    },
  },
];

/** Given to every student in every house. */
export const everyStudentGets = [
  "A documentation journal",
  "A detailed evaluation report",
  "A BeOutlier certificate",
  "Access to the Level 2 Accelerator program",
];
