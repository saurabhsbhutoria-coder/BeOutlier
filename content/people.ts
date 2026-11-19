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
  /** /media/people/<id>.jpg */
  photo: string;
  programs: ProgramId[];
  role: "mentor" | "faculty" | "partner" | "alumni";
  /** Alumni only: what they made */
  builtWhat?: string;
  /** Alumni only: the number overlaid on their video */
  stat?: string;
}

export const people: Person[] = [];

export function peopleFor(programId: ProgramId | "home", role?: Person["role"]): Person[] {
  return people.filter(
    (p) => (programId === "home" || p.programs.includes(programId)) && (!role || p.role === role),
  );
}
