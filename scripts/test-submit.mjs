/**
 * Posts one test lead to a running site, for end to end checks.
 * Usage:  npm run test:submit                 (http://localhost:3000, Hackathon)
 *         npm run test:submit -- https://beoutlier.in founders
 * Then check: a row in the Leads tab, the team email, the parent email.
 * Use your own email below so the parent confirmation reaches you.
 */
const base = process.argv[2] || "http://localhost:3000";
const program = process.argv[3] || "hackathon";
const email = process.env.TEST_EMAIL || "test@example.com";

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const d = new Date(Date.now() + 330 * 60000);
const id =
  "BO-" +
  String(d.getUTCFullYear()).slice(2) +
  String(d.getUTCMonth() + 1).padStart(2, "0") +
  String(d.getUTCDate()).padStart(2, "0") +
  "-" +
  Array.from({ length: 6 }, () => A[Math.floor(Math.random() * 32)]).join("");

const lead = {
  lead_id: id,
  program_id: program,
  student_name: "Test Student",
  age: program === "founders" ? "13" : "16",
  grade: program === "founders" ? "Grade 8" : "Grade 11",
  school: "Test School",
  board: "CBSE",
  city: "Mumbai",
  preferred_campus: program === "founders" ? "Mumbai, Chembur" : "",
  friends: program === "hackathon" ? "Test Friend" : "",
  parent_name: "Test Parent",
  parent_whatsapp: "9876543210",
  parent_email: email,
  consent: true,
  page_url: `${base}/${program}?utm_source=test`,
  referrer: "",
  utm_source: "test",
  utm_medium: "script",
  utm_campaign: "end-to-end",
  utm_content: "",
  utm_term: "",
  fbclid: "",
  fbp: "",
  fbc: "",
  company: "",
};

const res = await fetch(`${base}/api/apply`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
});
console.log(res.status, await res.text());
console.log("lead_id:", id);
