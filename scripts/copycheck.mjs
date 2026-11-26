/**
 * Voice rules check (CLAUDE.md section 2). Run: npm run copycheck
 * Flags: banned words and phrase, dashes, exclamation marks, emojis,
 * hyphenated words in visible copy, and "IIT Bombay" not followed by "students".
 * Heuristic: it reads JSX text and string literals that look like sentences.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dirs = ["app", "components", "content", "google-apps-script"];
const banned = [
  "unlock", "empower", "holistic", "future ready", "21st century skills", "world class",
  "transformative", "journey", "nurture", "potential", "real money, real customers",
];
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|gs)$/.test(name)) out.push(p);
  }
  return out;
}

const looksLikeClasses = (s) => /(^|\s)(text|bg|px|py|mt|mb|grid|flex|rounded|border|shadow|font|tracking|leading|w|h|max|min|gap|p|m|sm:|lg:|hover:|focus)[-:[]/.test(s);
const problems = [];

for (const d of dirs) {
  for (const file of walk(join(root, d))) {
    const src = readFileSync(file, "utf8");
    const rel = relative(root, file);
    const lines = src.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments
      const texts = [];
      const isCopy = (s) => /^[A-Z0-9₹[(]/.test(s.trim()) && !/[=;{}$:]|px|#[0-9A-F]{3}/i.test(s) && !looksLikeClasses(s);
      for (const m of line.matchAll(/>([^<>{}]+)</g)) if (isCopy(m[1])) texts.push(m[1]);
      for (const m of line.matchAll(/(["'`])((?:(?!\1).)*\s(?:(?!\1).)*)\1/g)) {
        if (isCopy(m[2])) texts.push(m[2]);
      }
      // Copy on its own line between JSX tags
      if (/^\s+[A-Z][^<>{}=;]*[.,]?\s*$/.test(line) && isCopy(line)) texts.push(line);
      for (const t of texts) {
        const low = t.toLowerCase();
        for (const b of banned) if (new RegExp(`\\b${b}\\b`).test(low)) problems.push([rel, i + 1, `banned "${b}"`, t]);
        if (/[–—]/.test(t)) problems.push([rel, i + 1, "dash", t]);
        if (/[A-Za-z]-[A-Za-z]/.test(t) && !/[./@_]|\$\{/.test(t.match(/\S*[A-Za-z]-[A-Za-z]\S*/)?.[0] ?? "")) {
          problems.push([rel, i + 1, "hyphen", t]);
        }
        if (/[A-Za-z)]!(\s|$)/.test(t)) problems.push([rel, i + 1, "exclamation", t]);
        if (emoji.test(t)) problems.push([rel, i + 1, "emoji", t]);
        if (/IIT Bombay(?! students| alumni| alumnus| MTech| BTech|\.| with the students)/.test(t) && !/(M\.Tech|MTech|BTech|PhD), IIT Bombay|folks from IIT Bombay/.test(t) && !/inside IIT Bombay with the students/.test(t) && t.trim() !== "IIT Bombay") {
          problems.push([rel, i + 1, 'IIT Bombay without "students"', t]);
        }
      }
    });
  }
}

if (problems.length) {
  for (const [f, l, why, t] of problems) console.log(`${f}:${l}  ${why}  ->  ${t.trim().slice(0, 100)}`);
  console.log(`\n${problems.length} possible voice issue(s). Review each; some may be code, not copy.`);
  process.exitCode = 1;
} else {
  console.log("Copy check passed.");
}
