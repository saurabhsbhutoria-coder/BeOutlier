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
  /** Where the details were taken from (LinkedIn or Instagram), for checking later */
  source?: string;
  /** /media/people/<id>.jpg. Empty: the card shows initials, never a fake face. */
  photo: string;
  /** Degree at IIT Bombay, as the person's own profile states it ("M.Tech"). Shown as an IIT Bombay badge on the hackathon page. */
  iitb?: string | true;
  /** false keeps the person off the Home mentor slider (program pages only). */
  home?: boolean;
  programs: ProgramId[];
  role: "mentor" | "faculty" | "partner" | "alumni";
  /** Alumni only: what they made */
  builtWhat?: string;
  /** Alumni only: the number overlaid on their video */
  stat?: string;
}

/**
 * Mentors, added 23 November 2026. Lines come only from each
 * person's own LinkedIn or Instagram profile as read that day; photos are
 * their profile photos. Recheck before each season, roles change.
 */
export const people: Person[] = [
  {
    id: "suraj-racha",
    name: "Suraj Racha",
    line: "Cofounder, VIDUR. AI researcher at BharatGen. PhD, IIT Bombay.",
    photo: "/media/people/suraj-racha.jpg",
    programs: ["engineers"],
    role: "mentor",
    source: "https://www.linkedin.com/in/suraj-racha-a9519b186/",
  },
  {
    id: "anish-mayanache",
    name: "Anish Mayanache",
    line: "MTech in Signal Processing and Communication. Research assistant, IIT Bombay.",
    photo: "/media/people/anish-mayanache.jpg",
    programs: ["hackathon", "engineers"],
    role: "mentor",
    iitb: "M.Tech",
    source: "https://www.linkedin.com/in/anish-mayanache-7b8729213/",
  },
  {
    id: "anmol-sureka",
    name: "Anmol Sureka",
    line: "Research Head, Enactus IIT Bombay. AI engineering intern at Prodigal.",
    photo: "/media/people/anmol-sureka.jpg",
    programs: ["engineers", "founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/anmolsureka/",
  },
  {
    id: "roshan-vadassery",
    name: "Roshan Vadassery",
    line: "Founder, Permissionless. Former CTO, MeTime. 400k+ on Instagram.",
    photo: "/media/people/roshan-vadassery.jpg",
    programs: ["engineers", "founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/roshan-vadassery/",
  },
  {
    id: "sumit-jethwa",
    name: "Sumit Jethwa",
    line: "Digital transformation at IDFC FIRST Bank. MBA, IIM Indore.",
    photo: "/media/people/sumit-jethwa.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/sumit-jethwa/",
  },
  {
    id: "simran-shah",
    name: "Simran Shah",
    line: "Associate Brand Manager at Nykaa. MBA, IIM Indore.",
    photo: "/media/people/simran-shah.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/simranshahh9/",
  },
  {
    id: "smeet-boricha",
    name: "Smeet Boricha",
    line: "Grocery Manager at ITC Limited. PGP, IIM Kozhikode.",
    photo: "/media/people/smeet-boricha.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/smeetboricha/",
  },
  {
    id: "jayant-thanvi",
    name: "Jayant Thanvi",
    line: "Strategy consultant. Senior Mentor, City One Initiative. MA, SOAS University of London.",
    photo: "/media/people/jayant-thanvi.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/jayant-thanvi/",
  },
  {
    id: "anam-fatima",
    name: "Anam Fatima",
    line: "Writer and educator. Cofounder, 1InchMargin. Former Teach For India Fellow.",
    photo: "/media/people/anam-fatima.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.linkedin.com/in/anam-fatima/",
  },
  {
    id: "chavi-bhutoria",
    name: "Chavi Bhutoria",
    line: "Digital creator. 80k+ followers on Instagram.",
    photo: "/media/people/chavi-bhutoria.jpg",
    programs: ["founders"],
    role: "mentor",
    source: "https://www.instagram.com/chavibhutoria/",
  },
  // Robotics Hackathon mentors, added 25 November 2026 (with Anish above).
  {
    id: "gagan-g",
    name: "Gagan G",
    line: "AI and ML research engineer. Deep learning, computer vision and optimisation. Patent holder.",
    photo: "/media/people/gagan-g.jpg",
    programs: ["hackathon"],
    role: "mentor",
    iitb: "M.Tech",
    home: false,
    source: "https://www.linkedin.com/in/gagan-g-iitb/",
  },
  {
    id: "giridhara-datta",
    name: "Giridhara Datta",
    line: "M.Tech in Integrated Circuits and Systems. Former embedded systems engineer at ENMAZ Engineering.",
    photo: "/media/people/giridhara-datta.jpg",
    programs: ["hackathon"],
    role: "mentor",
    iitb: "M.Tech",
    home: false,
    source: "https://www.linkedin.com/in/giridhara-datta/",
  },
  {
    id: "prabhakar-j",
    name: "Prabhakar J",
    line: "M.Tech in Integrated Circuits and Systems. Former automation engineer at Vedanta Aluminium: PLCs and ABB robots.",
    photo: "/media/people/prabhakar-j.jpg",
    programs: ["hackathon"],
    role: "mentor",
    iitb: "M.Tech",
    home: false,
    source: "https://www.linkedin.com/in/prabhakar-j-463673198/",
  },
  {
    // IIT Bombay confirmed by BeOutlier on 25 November 2026 (his LinkedIn lists Sardar Patel
    // Institute of Technology only, and no degree at IIT Bombay, so the badge shows no degree).
    // Photo is 100px on LinkedIn: initials until a real photo is added.
    id: "woodrow-gonsalves",
    name: "Woodrow Gonsalves",
    line: "Student, Sardar Patel Institute of Technology, Mumbai.",
    photo: "",
    programs: ["hackathon"],
    role: "mentor",
    iitb: true,
    home: false,
    source: "https://www.linkedin.com/in/woodrow-gonsalves-022b03269/",
  },
];

export function peopleFor(programId: ProgramId | "home", role?: Person["role"]): Person[] {
  return people.filter(
    (p) =>
      (programId === "home" ? p.home !== false : p.programs.includes(programId)) && (!role || p.role === role),
  );
}
