/**
 * About Us facts (added 23 November 2026). Team roles, the
 * orientation turnout and host schools come from BeOutlier's own One Pager;
 * the vision and story from CLAUDE.md. Never write "2025": say "Last Summer".
 */

/** The pathway, as BeOutlier describes it. Summer 2027 is Level 1. */
export const levels = [
  { level: "Level 1", when: "Summer 2027", text: "One house. One real project, built and shown to the world." },
  { level: "Level 2", when: "9 month accelerator", text: "Go deeper. Learn the skill sets behind what they built." },
  { level: "Level 3", when: "Internships", text: "Internships around the world, across diverse industries." },
];

export const vision = "A generation of problem solvers and change makers who dare to question, and create.";

export const numbers = [
  { value: "18", label: "Brands built by students" },
  { value: "₹5L+", label: "Earned by their brands" },
  { value: "45", label: "Outliers in the community" },
  { value: "15%", label: "Acceptance rate" },
];

export interface TeamMember {
  name: string;
  role: string;
  /** /media/team/<file>.jpg. Leave empty for a visible placeholder. */
  photo?: string;
}

export const foundingTeam: TeamMember[] = [
  { name: "Saurabh Bhutoria", role: "Product, student experience and brand." },
  { name: "Ishan Dubey", role: "Sales and partnerships." },
];

export const hostSchools = ["The Green Acres Academy", "Chatrabhuj Narsee School"];
