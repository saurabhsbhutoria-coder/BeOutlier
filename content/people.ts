import type { ProgramId } from "./programs";

/**
 * Mentor, faculty, partner and alumni faces.
 * Add a photo to /public/media/people/<id>.jpg and an entry below.
 * Pages that have no people yet show a visible placeholder, never fake faces.
 */
export interface Person {
  id: string;
  name: string;
  /** The one line under the face */
  line: string;
  /** Up to three short keyword tags under the line */
  tags?: string[];
  /** Where the details were taken from (LinkedIn or Instagram), for checking later */
  source?: string;
  /** /media/people/<id>.jpg */
  photo: string;
  programs: ProgramId[];
  role: "mentor" | "faculty" | "partner" | "alumni";
  /** Alumni only: what they made */
  builtWhat?: string;
  /** Alumni only: the number overlaid on their video */
  stat?: string;
}

/**
 * Mentors, added 23 November 2026. Lines and tags come only from each
 * person's own LinkedIn or Instagram profile as read that day; photos are
 * their profile photos. Recheck before each season, roles change.
 */
export const people: Person[] = [
  {
    id: "suraj-racha",
    name: "Suraj Racha",
    line: "Cofounder, VIDUR. AI researcher at BharatGen. PhD, IIT Bombay.",
    tags: ["IIT Bombay alumnus", "AI and LLMs", "ML teacher"],
    photo: "/media/people/suraj-racha.jpg",
    programs: ["hackathon", "engineers"],
    role: "mentor",
    source: "https://www.linkedin.com/in/suraj-racha-a9519b186/",
  },
  {
    id: "anish-mayanache",
    name: "Anish Mayanache",
    line: "MTech in Signal Processing and Communication. Research assistant, IIT Bombay.",
    tags: ["IIT Bombay MTech", "Signal processing", "Electronics"],
    photo: "/media/people/anish-mayanache.jpg",
    programs: ["hackathon", "engineers"],
    role: "mentor",
    source: "https://www.linkedin.com/in/anish-mayanache-7b8729213/",
  },
  {
    id: "anmol-sureka",
    name: "Anmol Sureka",
    line: "Research Head, Enactus IIT Bombay. AI engineering intern at Prodigal.",
    tags: ["IIT Bombay BTech", "AI engineering", "Entrepreneur"],
    photo: "/media/people/anmol-sureka.jpg",
    programs: ["hackathon", "engineers", "founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/anmolsureka/",
  },
  {
    id: "roshan-vadassery",
    name: "Roshan Vadassery",
    line: "Founder, Permissionless. Former CTO, MeTime. 400k+ on Instagram.",
    tags: ["Founder", "AI and WebRTC", "Autonomous flight"],
    photo: "/media/people/roshan-vadassery.jpg",
    programs: ["hackathon", "engineers", "founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/roshan-vadassery/",
  },
  {
    id: "sumit-jethwa",
    name: "Sumit Jethwa",
    line: "Digital transformation at IDFC FIRST Bank. MBA, IIM Indore.",
    tags: ["IIM Indore", "Digital products", "Banking"],
    photo: "/media/people/sumit-jethwa.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/sumit-jethwa/",
  },
  {
    id: "simran-shah",
    name: "Simran Shah",
    line: "Associate Brand Manager at Nykaa. MBA, IIM Indore.",
    tags: ["IIM Indore", "Brand management", "Marketing"],
    photo: "/media/people/simran-shah.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/simranshahh9/",
  },
  {
    id: "smeet-boricha",
    name: "Smeet Boricha",
    line: "Grocery Manager at ITC Limited. PGP, IIM Kozhikode.",
    tags: ["IIM Kozhikode", "Sales", "FMCG"],
    photo: "/media/people/smeet-boricha.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/smeetboricha/",
  },
  {
    id: "jayant-thanvi",
    name: "Jayant Thanvi",
    line: "Strategy consultant. Senior Mentor, City One Initiative. MA, SOAS University of London.",
    tags: ["Public speaking", "Debate and MUN", "Strategy"],
    photo: "/media/people/jayant-thanvi.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/jayant-thanvi/",
  },
  {
    id: "anam-fatima",
    name: "Anam Fatima",
    line: "Writer and educator. Cofounder, 1InchMargin. Former Teach For India Fellow.",
    tags: ["Writing", "Curriculum design", "Mentoring"],
    photo: "/media/people/anam-fatima.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/anam-fatima/",
  },
  {
    id: "chavi-bhutoria",
    name: "Chavi Bhutoria",
    line: "Digital creator. 80k+ followers on Instagram.",
    tags: ["Content creation", "Fashion", "Beauty"],
    photo: "/media/people/chavi-bhutoria.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.instagram.com/chavibhutoria/",
  },
];

export function peopleFor(programId: ProgramId | "home", role?: Person["role"]): Person[] {
  return people.filter(
    (p) => (programId === "home" || p.programs.includes(programId)) && (!role || p.role === role),
  );
}
