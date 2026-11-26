/**
 * Every program on the site lives here. Facts (fees, dates, seats, status)
 * render from this file everywhere, so one edit updates every page.
 *
 * HOW TO UPDATE (see SETUP.md, step 8):
 * - status: "open" | "closing_soon" | "waitlist" | "sold_out"
 * - seats.left: set a number to show "N of 51 seats left". Leave null to hide.
 *   Seat counts are typed by hand. Never compute or fake them.
 */

export type ProgramId = "hackathon" | "founders" | "engineers" | "designers";
export type House = "founders" | "engineers" | "designers";
export type Status = "open" | "closing_soon" | "waitlist" | "sold_out";
export type FormType = "apply" | "booking";

export type Eligibility =
  | { kind: "age"; min: number; max: number }
  | { kind: "grade"; min: number; max: number };

export type Fee =
  | { kind: "fixed"; amount: number }
  | { kind: "from"; amount: number }
  | { kind: "tbc" };

export interface Campus {
  id: string;
  city: "Mumbai" | "Pune";
  name: string;
  /** null renders a visible placeholder until announced */
  dates: string | null;
  /** null renders a visible placeholder until announced */
  fee: number | null;
}

export type Format = "Day scholar" | "Residential" | "Day event";

export interface Program {
  id: ProgramId;
  /** Day scholar or residential. A type, never part of the name. */
  format: Format;
  house: House | null;
  houseName: string | null;
  /** Short name used on House cards ("Founders") */
  houseShort: string | null;
  title: string;
  /** Hero headline, word for word from CLAUDE.md */
  tagline: string;
  /** "What you do" line on cards */
  cardLine: string;
  duration: string;
  /** Place as written on the card ("FLAME University, Pune") */
  placeLine: string;
  /** Dates as written on the card, null when not on the card */
  datesLine: string | null;
  cities: string[];
  venue: string | null;
  eligibility: Eligibility;
  fee: Fee;
  seats: { total: number | null; left: number | null };
  selective: boolean;
  status: Status;
  /**
   * false: the landing page is offline (it redirects to the houses on Home)
   * and the house shows a Coming soon mark instead of its button.
   */
  published: boolean;
  formType: FormType;
  route: "/hackathon" | "/founders" | "/engineers" | "/designers";
  season: "summer-2027" | "december-2026";
  campuses?: Campus[];
  /** Hero and share image, from /public/media */
  image?: { src: string; alt: string };
}

export const programs: Program[] = [
  {
    id: "hackathon",
    format: "Day event",
    house: null,
    houseName: null,
    houseShort: null,
    title: "Robotics Hackathon",
    tagline: "Two days to build a machine that thinks.",
    cardLine: "Two days to build a machine that thinks.",
    duration: "2 days",
    placeLine: "Mumbai",
    datesLine: "26 and 27 December",
    cities: ["Mumbai"],
    venue: "The Green Acres Academy, Chembur",
    eligibility: { kind: "age", min: 14, max: 19 },
    fee: { kind: "fixed", amount: 7999 },
    seats: { total: 51, left: null },
    selective: false,
    status: "open",
    published: true,
    formType: "booking",
    route: "/hackathon",
    season: "december-2026",
  },
  {
    id: "founders",
    format: "Day scholar",
    house: "founders",
    houseName: "House of Founders",
    houseShort: "Founders",
    title: "Founders Fellowship",
    tagline: "Build a brand. Sell it live. Keep what you make.",
    cardLine: "Build a brand. Pitch investors. Sell it at a live flea market.",
    duration: "10 days",
    placeLine: "Mumbai and Pune",
    datesLine: null,
    cities: ["Mumbai", "Pune"],
    venue: null,
    eligibility: { kind: "grade", min: 6, max: 12 },
    fee: { kind: "fixed", amount: 40000 },
    seats: { total: null, left: null },
    selective: true,
    status: "open",
    published: true,
    formType: "apply",
    route: "/founders",
    season: "summer-2027",
    campuses: [
      { id: "mumbai-lower-parel", city: "Mumbai", name: "Lower Parel", dates: null, fee: 40000 },
      { id: "mumbai-chembur", city: "Mumbai", name: "Chembur", dates: null, fee: 40000 },
      { id: "mumbai-kandivali", city: "Mumbai", name: "Kandivali", dates: null, fee: 40000 },
      { id: "pune-amanora", city: "Pune", name: "Amanora", dates: null, fee: 40000 },
    ],
    image: {
      src: "/media/founders/flea-market-jars.jpg",
      alt: "A student showing the jars her team made to a visitor at the flea market",
    },
  },
  {
    id: "engineers",
    format: "Residential",
    house: "engineers",
    houseName: "House of Engineers",
    houseShort: "Engineers",
    title: "Robotics Fellowship",
    tagline: "Four days on a university campus. One robot you built yourself.",
    cardLine: "Build a working robot with IIT Bombay alumni. Take it home.",
    duration: "4 days",
    placeLine: "FLAME University, Pune",
    datesLine: "Last week of May",
    cities: ["Pune"],
    venue: "FLAME University, Pune",
    eligibility: { kind: "age", min: 14, max: 19 },
    fee: { kind: "fixed", amount: 40000 },
    seats: { total: null, left: null },
    selective: true,
    status: "open",
    published: false,
    formType: "apply",
    route: "/engineers",
    season: "summer-2027",
  },
  {
    id: "designers",
    format: "Residential",
    house: "designers",
    houseName: "House of Designers",
    houseShort: "Designers",
    title: "Design and Architecture Fellowship",
    tagline: "Four days in Goa. Learn architecture by building it.",
    cardLine: "Learn architecture by building it, with the Houses of Goa.",
    duration: "4 days",
    placeLine: "Goa",
    datesLine: "First week of June",
    cities: ["Goa"],
    venue: "International Centre Goa",
    eligibility: { kind: "age", min: 14, max: 19 },
    fee: { kind: "fixed", amount: 40000 },
    seats: { total: null, left: null },
    selective: true,
    status: "open",
    published: false,
    formType: "apply",
    route: "/designers",
    season: "summer-2027",
  },
];

/** Home page order: latest drop pinned first, then the three houses. */
export const dropOrder: ProgramId[] = ["hackathon", "founders", "engineers", "designers"];

export const programIds = programs.map((p) => p.id) as [ProgramId, ...ProgramId[]];

export function getProgram(id: string | null | undefined): Program | undefined {
  return programs.find((p) => p.id === id);
}

export function houses(): Program[] {
  return programs.filter((p) => p.house !== null);
}

/** ₹40,000 style, Indian digit grouping. */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

/** "₹40,000", "From ₹X" for a range, or null when not announced. */
export function feeText(fee: Fee): string | null {
  if (fee.kind === "fixed") return formatINR(fee.amount);
  if (fee.kind === "from") return `From ${formatINR(fee.amount)}`;
  return null;
}

/** "Ages 14 to 19" or "Grades 6 to 12" */
export function eligibilityText(e: Eligibility): string {
  return e.kind === "age" ? `Ages ${e.min} to ${e.max}` : `Grades ${e.min} to ${e.max}`;
}

/** The card details line, matching CLAUDE.md: "4 days. FLAME University, Pune. Last week of May. Ages 14 to 19. ₹40,000" */
export function detailsLine(p: Program): string {
  const format = p.format === "Day event" ? null : p.format;
  const parts = [p.duration, format, p.placeLine, p.datesLine, eligibilityText(p.eligibility), feeText(p.fee)];
  return parts.filter(Boolean).join(". ");
}

/** "51 seats." or "12 of 51 seats left." */
export function seatsText(p: Program): string | null {
  const { total, left } = p.seats;
  if (total == null) return null;
  if (left != null) return `${left} of ${total} seats left.`;
  return `${total} seats.`;
}

/** Button label driven by form type and status. */
export function ctaLabel(p: Program): string {
  if (p.status === "sold_out") return "Sold out";
  if (p.status === "waitlist") return "Join the waitlist";
  return p.formType === "booking" ? "Book a seat" : "Apply for Summer 2027";
}

export const statusBadge: Record<Status, string | null> = {
  open: null,
  closing_soon: "Closing soon",
  waitlist: "Waitlist",
  sold_out: "Sold out",
};

/** Options for the preferred campus select (Founders). */
export function campusOptions(p: Program): string[] {
  if (!p.campuses) return [];
  return [...p.campuses.map((c) => `${c.city}, ${c.name}`), "Not sure yet"];
}
