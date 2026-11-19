# Prompt for Claude Code: build the BeOutlier website

Paste everything below this line into Claude Code, from inside the project folder that holds `CLAUDE.md`.

---

You are building beoutlier.in, the website for BeOutlier, an experiential school for teenagers in India. `CLAUDE.md` in this folder is the single source of truth for positioning, voice rules, every line of copy, the sitemap and the brand tokens (section 13). Read it fully before doing anything. If anything in this prompt conflicts with `CLAUDE.md`, follow `CLAUDE.md` and tell me.

**The site has one job: collect applications.** Every design and engineering decision should make it easier for a teenager to get excited and for a parent to apply. Brand and storytelling serve that job.

Work in three phases. Stop at the end of Phase 1 and wait for my approval before writing app code.

---

## Phase 1: Architecture plan (no app code yet)

Write `ARCHITECTURE.md` covering the sections below, then stop and show me a short summary.

### 1. Stack

- Next.js (App Router, TypeScript) + Tailwind CSS, deployed on Vercel.
- `next/font` for Anton, Archivo Black, Inter Tight and a monospace (JetBrains Mono).
- No CMS. All program data lives in one typed file (see 3).
- Keep dependencies minimal. Justify every package you add in one line.

### 2. Routes and layouts

Two route groups with different layouts:

**Main site** (`(site)` group, with header, menu and footer):

| Route | Page |
|---|---|
| `/` | Home |
| `/the-code` | The Code (meritocratic model) |
| `/programs` | All programs |
| `/faculty` | Mentors and partners |
| `/parents` | For Parents |
| `/schools` | For Schools |
| `/apply` | Unified Summer 2027 application form |
| `/apply/thank-you` | Confirmation, varies by program |
| `/privacy`, `/terms` | Required for ads and for collecting data about minors |

**Landing pages** (`(landing)` group, no menu, one button, one form, sticky apply bar on mobile):

| Route | Program |
|---|---|
| `/hackathon` | Robotics Hackathon |
| `/founders` | Founders Fellowship (House of Founders) |
| `/engineers` | Robotics Residential, FLAME (House of Engineers) |
| `/designers` | Design and Architecture Residential, Goa (House of Designers) |

Pages whose copy is not yet in `CLAUDE.md` (The Code, Faculty, Parents, Schools) get a clean structure with clearly marked placeholders. Do not invent copy, numbers, names or quotes for them.

### 3. Content model

One file, `content/programs.ts`, typed, holding every program: id, house, title, tagline, location, venue, dates, ages or grades, fee (or fee range), seats, status, form type, landing route.

- `status` is one of `open`, `closing_soon`, `waitlist`, `sold_out`. Status and seats drive the "drop" cards, badges and button labels everywhere.
- Seat counts are updated by hand in this file. Never fake scarcity: no random counters, no countdown timers that reset.
- Drop order on the Home page: the most recent drop (currently the Hackathon) is pinned first and largest, then the three Summer 2027 houses.

Also: `content/site.ts` for contact details (WhatsApp +91 88286 90027, team@beoutlier.in, Instagram @beoutlier.in), and `content/people.ts` for mentor faces (empty array with the shape defined, filled later).

### 4. Components

List each component with its props and where it is used. At minimum:

- `VideoHero` (looping muted video, poster image, one button)
- `Marquee` (the ticker line)
- `DropCard` and `HouseCard` (driven by `programs.ts`, status badge, seats line)
- `PhotoStrip` (auto scrolling, pauses on hover and for reduced motion)
- `ReelsFeed` (vertical student videos that swipe like Reels on mobile)
- `FacesGrid` (face plus one line)
- `AdmissionSteps` (the four steps plus the "85 out of 100" line)
- `ParentStudentToggle` (switches tone and section emphasis on Home; remembers choice per visitor)
- `ApplicationForm` (see 5)
- `StickyApplyBar` (mobile only, on landing pages)
- `Eyebrow` (the "/ SECTION · 01" monospace label), `Button` (hard offset shadow), `Footer`

### 5. Lead capture (the core of the site)

**Forms**

- One `ApplicationForm` component used everywhere, in two modes:
  - `apply` mode for Summer 2027 programs (Founders, Engineers, Designers). On `/apply` the student first picks a house; on a landing page the program is preselected and hidden.
  - `booking` mode for the Hackathon (open to all, no selection).
- Two short steps on mobile, so it feels like an application but takes under 2 minutes:
  - Step 1, the student: student name, grade (Founders) or age (residentials and Hackathon), school, city, preferred campus (Founders only, from `programs.ts`). Hackathon adds an optional "Coming with friends? Add their names."
  - Step 2, the parent: parent name, parent WhatsApp number (Indian mobile, validated, +91 prefilled), parent email, and a required checkbox: "I am the parent or guardian and I agree to BeOutlier contacting me about this application." Link to `/privacy`. This consent matters because applicants are minors.
- Hidden fields captured automatically: program id, page URL, referrer, UTM source, medium, campaign, content and term, `fbclid`, and a generated `lead_id`. Capture UTMs on first landing and keep them for the session so they survive navigation to `/apply`.
- Honeypot field and basic server side rate limiting per IP. No captcha unless spam appears.
- Large tap targets, real `<label>`s, inline validation messages, no data lost if a step fails.

**Pipeline: form → Google Sheet → email**

Use a Google Apps Script web app bound to the Sheet. It is free, needs no service account keys, and does both jobs in one place.

1. The form posts to a Next.js route handler, `app/api/apply/route.ts`.
2. The route validates the payload server side (zod), drops honeypot hits, adds a timestamp in IST, and forwards it with a shared secret to the Apps Script URL. The Apps Script URL and secret live only in server env vars, never in the browser.
3. The Apps Script (`google-apps-script/Code.gs`, which you write):
   - Checks the secret.
   - Uses `LockService` so simultaneous submissions never overwrite each other.
   - Appends one row to a `Leads` tab, creating the header row if missing.
   - Sends an instant notification email to the team (address from a script property, default team@beoutlier.in) with the subject `New lead: <program> · <student name> · <city>` and every field in a readable table, plus a one tap WhatsApp link to the parent number.
   - Sends the parent a short confirmation email in the brand voice, with the next step for that program (aptitude test link to follow for Summer 2027; booking confirmation call for the Hackathon). No exclamation marks, no dashes.
   - Returns JSON success or a clear error.
4. If the Apps Script call fails, retry once. If it still fails, show: "Something broke on our side. WhatsApp us on +91 88286 90027 and we'll take your application there." Log the failure with the full payload so no lead is lost silently.
5. On success, redirect to `/apply/thank-you?program=<id>`, which shows the next step for that program and, for the Hackathon, introduces the House of Engineers.

**Sheet columns, in this order**

`lead_id, submitted_at_ist, program, house, form_type, student_name, grade, age, school, city, preferred_campus, friends, parent_name, parent_whatsapp, parent_email, consent, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, page_url, referrer, status, notes`

`status` defaults to `New`. The team moves it through: `New, Test sent, Test done, Call done, Selected, Rejected, Enrolled`. Add a second tab, `Funnel`, with formulas counting applications, offers and enrolments per program, plus the offer rate, so the "15% get in" claim can be checked at any time.

### 6. Tracking

- Meta Pixel on every page: `PageView`; `ViewContent` on each landing page; `Lead` on successful submit.
- Meta Conversions API from the route handler for the same `Lead` event, sharing one `event_id` with the browser event so Meta deduplicates.
- Google Analytics 4: `generate_lead` with the program as a parameter.
- All IDs and tokens from env vars. Tracking must never block or slow the form.

### 7. Design system in code

- Put the tokens from `CLAUDE.md` section 13 into the Tailwind theme: colours, fonts, the hard offset shadow, 14px card radius.
- Follow its contrast rules exactly: navy text on coral, white text only on navy.
- Design references (feel only, never copy layouts, assets or copy):
  - **mu20.co**: looping video hero, auto scrolling photo strips, bracketed or numbered section labels, numbered pillar cards with small tag pills, a community video mosaic, kinetic split word headlines across image tiles.
  - **merch.samayraina.co**: dark, confident, one button video hero, drop and pre order language, short cheeky lines (a footer joke line), slide out menu.
  - **Last year's BeOutlier brochure**: coral grounds, stacked Anton headlines, navy cards with coral offset shadows, monospace eyebrow labels.
- Lessons from the references to avoid: stat counters must render real numbers without JavaScript (no "0+" flashing), and every `tel:` and `mailto:` link must match the text shown.
- Motion: subtle scroll reveals and the marquee only. Respect `prefers-reduced-motion`.

### 8. Performance, SEO and accessibility

- Mobile first; most traffic comes from Meta ads on phones. Target Lighthouse mobile 90+ on every landing page.
- Videos: compressed MP4, poster image, lazy load below the fold, never autoplay with sound.
- `next/image` for all photos. Metadata, Open Graph images and `sitemap.xml` per page.
- Keyboard navigable, visible focus, alt text on every image, 4.5:1 text contrast.

### 9. Folder layout, env vars and assets

Show the folder tree. List every env var with what it is for:
`APPS_SCRIPT_URL, APPS_SCRIPT_SECRET, NEXT_PUBLIC_META_PIXEL_ID, META_CAPI_TOKEN, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_SITE_URL`.
List the assets you need from me (logo SVG, student photos, flea market video, mentor faces) and where to drop them (`/public/brand`, `/public/media`).

### 10. Open questions

List anything in `CLAUDE.md` that is missing or contradictory and blocks the build. Use visible placeholders like `[DATES]` for everything else.

---

## Phase 2: Build (after I approve the plan)

Build in this order, and show me each step running locally before moving on:

1. Project setup, tokens, fonts, layouts.
2. `ApplicationForm`, `/api/apply`, `Code.gs` and `/apply` with the thank you page. Test the full path end to end: submit, row appears in the Sheet, team email arrives, parent email arrives.
3. `/hackathon` first, since it goes live first.
4. `/founders`, `/engineers`, `/designers`.
5. Home.
6. The remaining main site pages with placeholders.
7. Tracking, metadata, `/privacy`, `/terms`.

Copy comes word for word from `CLAUDE.md`. Do not rewrite it. If something reads wrong, flag it instead.

---

## Phase 3: Hand over

Write `SETUP.md` for a non developer, in short numbered steps in plain language:

1. Create the Google Sheet and paste in `Code.gs`.
2. Set the script properties (secret, team email).
3. Deploy the script as a web app and copy its URL.
4. Add the env vars in Vercel.
5. Push to GitHub and deploy on Vercel.
6. Connect the GoDaddy domain to Vercel (which DNS records go where).
7. Submit a test application on a phone and check the Sheet and both emails.
8. How to change a program's status or seats in `programs.ts`.

Finish with a checklist of everything I still need to provide.
