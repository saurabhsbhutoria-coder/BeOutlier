# BeOutlier website: architecture plan (Phase 1)

Status: **approved and built** (19 November 2026). Section 10's questions are answered in `CLAUDE.md` section 13.

**Changes after approval**
- Brand tokens come from the BeOutlier One Pager design: navy #1B1F4B, coral #F47171, mint #5FD9B6, yellow #F4D35E, off white #FAFAF7. Section 7's provisional values are replaced.
- Every form collects: student name, age, grade, school, board, city, parent name, phone, email, plus consent. Founders adds preferred campus; Hackathon adds friends.
- The Sheet has a `board` column after `school`, and the status list adds `Paid` for Hackathon bookings.
- Hackathon is paid online at booking: the thank you page and the parent email link to `NEXT_PUBLIC_HACKATHON_PAYMENT_URL`.
- "Applying takes 5 minutes." 45 teenagers in 2025. 150+ Outliers.
Sources: `CLAUDE.md` (single source of truth) and `BUILD_PROMPT.md`. Where the two conflict, this plan follows `CLAUDE.md` and lists the conflict in section 10.

The site has one job: collect applications. Every choice below is judged against that.

---

## 1. Stack

| Piece | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router, TypeScript), current stable, exact version pinned | Route groups, route handlers, `next/font`, `next/image`, `next/og`, `after()` are all built in |
| Styling | Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/postcss`) | Tokens live in one `@theme` block in `app/globals.css` |
| Validation | `zod` | One schema shared by the form (inline errors) and the route handler (server check) |
| Hosting | Vercel | Brief requirement |
| Data | Google Sheet + Apps Script web app | Free, no service account keys, Sheet and email in one place |
| CMS | None | All program data lives in `content/programs.ts` |

**Dependencies, complete list:** `next`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/postcss`, `zod`, `typescript`, `@types/*`, `eslint` + `eslint-config-next`. Nothing else. No animation library (CSS + IntersectionObserver), no carousel library (CSS scroll snap), no form library (one form, plain React state), no analytics SDK (official Pixel and gtag snippets via `next/script`).

**Fonts** through `next/font/google`, self hosted at build time, `display: swap`, exposed as CSS variables:

| Variable | Font | Use |
|---|---|---|
| `--font-display` | Anton | Stacked headlines, hero, close lines |
| `--font-heavy` | Archivo Black | Card titles, numbers, button text |
| `--font-body` | Inter Tight | Body copy, forms |
| `--font-mono` | JetBrains Mono | Eyebrows (`/ SECTION · 01`), tags, seat lines |

Only the weights used are loaded, to keep the landing pages light.

---

## 2. Routes and layouts

```
app/
  layout.tsx                 root: <html>, fonts, tracking scripts, attribution capture
  globals.css                Tailwind + design tokens
  (site)/
    layout.tsx               Header (logo, slide out menu, Apply button) + Footer
    page.tsx                 /              Home
    the-code/page.tsx        /the-code      The Code (placeholders)
    programs/page.tsx        /programs      All programs (from programs.ts)
    faculty/page.tsx         /faculty       Mentors and partners (placeholders)
    parents/page.tsx         /parents       For Parents (placeholders)
    schools/page.tsx         /schools       For Schools (placeholders)
    apply/page.tsx           /apply         Unified Summer 2027 form, pick a house first
    apply/thank-you/page.tsx /apply/thank-you?program=<id>   noindex
    privacy/page.tsx         /privacy
    terms/page.tsx           /terms
  (landing)/
    layout.tsx               Logo only (not a link out), no menu, slim footer, StickyApplyBar
    hackathon/page.tsx       /hackathon
    founders/page.tsx        /founders
    engineers/page.tsx       /engineers
    designers/page.tsx       /designers
  api/apply/route.ts         POST: validate, forward to Apps Script, fire CAPI
  sitemap.ts, robots.ts, not-found.tsx
  opengraph-image.tsx        default OG image (next/og); one per landing page
```

**Landing page rule (one button, one form).** Each landing page has exactly one form, embedded at the bottom under `#apply`. The hero button, the close button and the mobile sticky bar are the same action: they scroll to that form and focus the first field. There are no outbound links except the footer legal links (`/privacy`, `/terms`), which the consent checkbox needs anyway.

**Thank you page** sits in the `(site)` group so a new applicant can then explore the site. For the Hackathon it introduces the House of Engineers using copy that already exists in `CLAUDE.md` (the `/engineers` hero line) and links to `/engineers`.

Pages with no copy yet (The Code, Faculty, Parents, Schools) get a real layout with visible placeholders like `[THE CODE: COPY TO COME]`. No invented copy, numbers, names or quotes.

---

## 3. Content model

### `content/programs.ts`

```ts
export type ProgramId = 'hackathon' | 'founders' | 'engineers' | 'designers';
export type House = 'founders' | 'engineers' | 'designers';
export type Status = 'open' | 'closing_soon' | 'waitlist' | 'sold_out';
export type FormType = 'apply' | 'booking';

export type Eligibility =
  | { kind: 'age'; min: number; max: number }     // "Ages 14 to 19"
  | { kind: 'grade'; min: number; max: number };  // "Grades 6 to 12"

export type Fee =
  | { kind: 'fixed'; amount: number }             // ₹40,000
  | { kind: 'from'; amount: number }              // From ₹25,000
  | { kind: 'tbc' };                              // renders [FEE]

export interface Campus {
  id: string;            // 'mumbai-lower-parel'
  city: 'Mumbai' | 'Pune';
  name: string;          // 'Lower Parel'
  dates: string | null;  // null renders [DATES]
  fee: number | null;    // null renders [FEE]
}

export interface Program {
  id: ProgramId;
  house: House | null;             // null for the Hackathon
  houseName: string | null;        // 'House of Founders'
  title: string;                   // 'Founders Fellowship'
  tagline: string;                 // hero line, word for word from CLAUDE.md
  cardLine: string;                // "What you do" column of the houses table
  cities: string[];
  venue: string | null;            // 'FLAME University, Pune'
  dates: string;                   // display string: 'Last week of May'
  eligibility: Eligibility;
  fee: Fee;
  seats: { total: number | null; left: number | null };  // hand edited, never computed
  selective: boolean;              // true renders "15% get in" and the admission steps
  status: Status;
  formType: FormType;
  route: `/${string}`;
  campuses?: Campus[];             // Founders only
  season: 'summer-2027' | 'december-2026';
}

export const programs: Program[] = [ /* hackathon, founders, engineers, designers */ ];
export const dropOrder: ProgramId[] = ['hackathon', 'founders', 'engineers', 'designers'];
```

Rules:
- Facts (fees, dates, venues, ages, seats) render from this file everywhere, so one edit updates every page. Prose stays in the page files, word for word from `CLAUDE.md`.
- `status` and `seats` drive badges, seat lines and button labels on every card and page. No random counters, no countdowns, nothing computed. `seats.left` stays `null` until the team decides to show it.
- `dropOrder`: the latest drop (Hackathon) is pinned first and largest on Home, then the three houses.
- Helpers: `getProgram(id)`, `formatFee(fee)` (Indian digit grouping, `₹25,000`), `ctaLabel(program)`.

### `content/site.ts`

```ts
export const site = {
  name: 'BeOutlier',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  whatsapp: { display: '+91 88286 90027', e164: '+918828690027', href: 'https://wa.me/918828690027' },
  email: { display: 'team@beoutlier.in', href: 'mailto:team@beoutlier.in' },
  instagram: { display: '@beoutlier.in', href: 'https://instagram.com/beoutlier.in' },
  primaryCta: 'Apply for Summer 2027',
};
```
Every `tel:`, `mailto:` and WhatsApp link is generated from the same object as its visible text, so they can never drift apart.

### `content/people.ts`

```ts
export interface Person {
  id: string;
  name: string;
  line: string;                 // the one line under the face
  photo: string;                // /media/people/<id>.jpg
  programs: ProgramId[];        // which pages show them
  role: 'mentor' | 'faculty' | 'partner' | 'alumni';
  builtWhat?: string;           // alumni: what they made
  stat?: string;                // alumni: the number overlaid on their video
}
export const people: Person[] = [];   // filled later
```
When the array is empty for a page, `FacesGrid` renders a visible placeholder block, not fake faces.

### `content/microcopy.ts`

All UI text that `CLAUDE.md` does not supply (form labels, errors, status badges, thank you text, email text). Kept in one file so you can review and edit it in one pass. See open question 8.

---

## 4. Components

| Component | Props | Used on |
|---|---|---|
| `TopStrip` | `program: Program` | Home (Hackathon strip, links to `/hackathon`) |
| `VideoHero` | `headline: string[]`, `sub: string[]`, `poster: string`, `video?: {mp4, webm?}`, `cta: {label, href}` | Home, all landing pages |
| `Marquee` | `text: string`, `speed?` | Home ticker; pauses with reduced motion |
| `Eyebrow` | `label: string`, `index?: string` | Every section (`/ SECTION · 01`) |
| `Button` | `href or onClick`, `variant: 'coral' \| 'navy' \| 'ghost'`, `size`, `disabled` | Everywhere; hard offset shadow, 48px min tap target |
| `StatusBadge` | `status: Status` | `DropCard`, `HouseCard`, landing heroes |
| `SeatsLine` | `seats` | Cards, landing heroes, close blocks |
| `DropCard` | `program: Program`, `size: 'pinned' \| 'normal'` | Home (pinned Hackathon), `/programs` |
| `HouseCard` | `program: Program` | Home section 03, `/programs`, `/apply` house picker |
| `PhotoStrip` | `images: {src, alt}[]`, `direction`, `speed` | Home, Founders; pauses on hover, focus and reduced motion |
| `ReelsFeed` | `items: {src, poster, caption, stat?}[]` | Home section 05, Founders flea market |
| `FacesGrid` | `people: Person[]`, `placeholder: string` | Home 04, every landing page, `/faculty` |
| `NumberedList` | `items: string[]` | The 10 days, walk away with |
| `DayPlan` | `days: {label, text}[]` | The two days / four days |
| `InfoTable` | `rows: {label, value}[]` | For parents tables, Founders daily schedule, campuses |
| `ProjectGrid` | `items: {title, text}[]` | Hackathon "What you build" |
| `AdmissionSteps` | `variant: 'full' \| 'short'`, `extraLine?: string` | Home 06, Founders, Engineers and Designers (short: "Same four steps.") |
| `ParentStudentToggle` | none (reads and writes mode) | Home only |
| `ModeSection` | `mode: 'student' \| 'parent' \| 'both'` | Home, wraps sections whose emphasis changes |
| `ApplicationForm` | `mode: 'apply' \| 'booking'`, `programId?: ProgramId`, `showHousePicker?: boolean` | `/apply`, all landing pages |
| `StickyApplyBar` | `label: string`, `target: '#apply'` | Landing layout, mobile only, hides when the form is on screen |
| `Header`, `SlideMenu`, `Footer` | none | `(site)` layout; Footer carries one short cheeky line (copy to come) |
| `LandingFooter` | none | `(landing)` layout: logo, contact, legal links |
| `AttributionCapture` | none | Root layout (client, renders nothing) |
| `TrackViewContent` | `programId` | Each landing page (client, renders nothing) |
| `Reveal` | `children` | Subtle scroll reveal; no effect with reduced motion |

### Student / Parent toggle

- Sits at the top of Home. Both versions are in the server HTML; a `data-mode` attribute on `<html>` switches emphasis with CSS. No layout shift, both versions indexable.
- **Student** (default): coral and navy, marquee, Reels feed high, loud type.
- **Parent**: off white ground, calm type sizes, motion off, section 07 expanded and moved up: fees (from `programs.ts`), safety and supervision (from the `/engineers` and `/designers` parent tables), what your child brings home (from the "walk away with" lists). Testimonials are a placeholder until real ones exist.
- Remembered per visitor in `localStorage` (`bo_mode`), applied by a tiny inline script before first paint so there is no flash. `?mode=parent` in the URL forces parent mode, so ads aimed at parents land in the right tone.

---

## 5. Lead capture

### 5.1 The form

One `ApplicationForm`, two modes, two steps.

**Step 1, the student**

| Field | Founders | Engineers / Designers | Hackathon |
|---|---|---|---|
| Student name | yes | yes | yes |
| Grade (select 6 to 12) | yes | | |
| Age (select 14 to 19) | | yes | yes |
| School | yes | yes | yes |
| City | yes | yes | yes |
| Preferred campus (from `programs.ts`) | yes | | |
| Coming with friends? Add their names. (optional) | | | yes |

On `/apply` a house picker (three `HouseCard`s as radio buttons) comes first; on a landing page the program is preset and hidden.

**Step 2, the parent:** parent name, parent WhatsApp (`+91` prefilled, accepts spaces, validated as a 10 digit Indian mobile starting 6 to 9), parent email, and a required checkbox: "I am the parent or guardian and I agree to BeOutlier contacting me about this application." with a link to `/privacy`.

**Behaviour**
- Real `<label>`s, `autocomplete` and `inputmode` set (`tel`, `email`), 48px tap targets, 16px inputs so iOS does not zoom.
- Inline errors on blur and on Next, from the shared zod schema. Focus moves to the first error.
- Draft saved to `sessionStorage` on every change (never the consent box), so a refresh or failed submit loses nothing. Cleared on success.
- Honeypot: a visually hidden `company` field. Filled means bot.
- Submit button disables while sending; one retry happens server side.

**Hidden fields**, filled automatically: `program_id`, `page_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `lead_id`.

**Attribution.** `AttributionCapture` runs on every page. On the first page of a visit it reads the UTMs and `fbclid` from the URL and the external `document.referrer`, and stores them in `sessionStorage` (`bo_attr`). Later pages never overwrite them, so they survive the click from a landing page to `/apply`. It also reads the `_fbp` and `_fbc` cookies (building `_fbc` from `fbclid` if missing) for Conversions API matching.

**`lead_id`** is generated in the browser when the form mounts: `BO-YYMMDD-XXXXXX` (random base32). It is the Sheet key, the dedupe key for retries, and the shared `event_id` for the Pixel and Conversions API.

### 5.2 Pipeline: form → route handler → Apps Script → Sheet + emails

```
Browser                     /api/apply (Vercel, Node)                 Apps Script web app
───────                     ─────────────────────────                 ───────────────────
POST JSON  ───────────────▶ zod validate
                            honeypot? → 200 {ok} and stop (silent)
                            rate limit per IP
                            derive program, house, form_type from programs.ts
                            add submitted_at_ist (Asia/Kolkata)
                            POST {secret, lead} ─── 8s timeout ─────▶ check secret
                            retry once on failure                     LockService lock
                                                                      dedupe by lead_id
                                                                      append row to Leads
                                                                      email team
                                                                      email parent
                            ◀────────────────────────────────────── {ok:true} or {ok:false,error}
                            after(): Meta CAPI Lead (non blocking)
◀── {ok:true, leadId}
Pixel Lead + GA4 generate_lead
router.push(/apply/thank-you?program=<id>)
```

**Route handler details (`app/api/apply/route.ts`)**
- Runtime: Node. Body limit 10 KB.
- The client says only which program; the server looks up house, form type and title from `programs.ts`, so nobody can submit a fake program.
- Rate limit: 5 submissions per IP per 10 minutes, in memory. On Vercel this is per server instance, so it is a speed bump, not a wall. If spam appears, add a shared store (Upstash) or Cloudflare Turnstile; neither is needed on day one.
- The secret goes in the JSON body, because Apps Script `doPost` cannot read request headers. URL and secret are server env vars only.
- On final failure: `console.error('LEAD_FORWARD_FAILED', fullPayload)` so the lead is recoverable from Vercel logs, and the response tells the browser to show: "Something broke on our side. WhatsApp us on +91 88286 90027 and we'll take your application there." with a WhatsApp link that opens a prefilled message.
- Values starting with `=`, `+`, `-` or `@` are prefixed with `'` before they reach the Sheet, so nobody can inject a formula.

### 5.3 Apps Script (`google-apps-script/Code.gs`)

- `doPost(e)`: parse JSON, compare secret with Script Property `SHARED_SECRET` (constant time compare), take `LockService.getScriptLock()` with a 20 second wait.
- `Leads` tab: created with the header row if missing. If `lead_id` already exists (a retry), return success without a second row or second email.
- Append the row in the exact column order below, `status` = `New`.
- Release the lock, then send emails (outside the lock so the Sheet is never held up by mail).
- **Team email** to Script Property `TEAM_EMAIL` (default `team@beoutlier.in`). Subject: `New lead: <program> · <student name> · <city>`. Body: every field in an HTML table, plus a one tap `https://wa.me/91XXXXXXXXXX` link to the parent.
- **Parent email**: short, brand voice, no exclamation marks, no dashes. Summer 2027: the aptitude test link follows. Hackathon: we will call to confirm the booking. Draft text goes in `microcopy.ts` comments and `Code.gs` for your approval.
- Returns `ContentService` JSON: `{ok:true, leadId}` or `{ok:false, error}`.
- `setup()` function you run once from the editor: creates `Leads` and `Funnel`, freezes the header, adds the `status` dropdown, adds conditional formatting.

**`Leads` columns, in order**

`lead_id, submitted_at_ist, program, house, form_type, student_name, grade, age, school, city, preferred_campus, friends, parent_name, parent_whatsapp, parent_email, consent, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, page_url, referrer, status, notes`

`status` dropdown: `New, Test sent, Test done, Call done, Selected, Rejected, Enrolled`.

**`Funnel` tab** (one row per program, live formulas):

| Program | Applications | Offers | Enrolled | Offer rate | Within 15%? |
|---|---|---|---|---|---|
| Founders Fellowship | `COUNTIF(Leads!C:C, A2)` | `COUNTIFS(C:C, A2, Y:Y, "Selected") + COUNTIFS(C:C, A2, Y:Y, "Enrolled")` | `COUNTIFS(C:C, A2, Y:Y, "Enrolled")` | `Offers / Applications` | red when above 15% |

Rows for Founders, Engineers, Designers and a Summer 2027 total. The Hackathon gets bookings and enrolled counts only, since it is open to all. This is how "15% get in" stays checkable: an offer is only made by moving a row to `Selected`, and the tab turns red if any program goes over.

### 5.4 Thank you page

`/apply/thank-you?program=<id>` shows the next step for that program (copy in `microcopy.ts`). Hackathon version adds the House of Engineers block linking to `/engineers`. `noindex`.

---

## 6. Tracking

| Event | Where | How |
|---|---|---|
| `PageView` | every page | Meta Pixel base code in root layout; re-fired on client route changes |
| `ViewContent` | each landing page | `TrackViewContent` with `content_name` = program |
| `Lead` (browser) | form success | `fbq('track','Lead',{content_name}, {eventID: lead_id})` |
| `Lead` (server) | `/api/apply` | Conversions API inside `after()`, same `event_id`, hashed (SHA 256) parent email and phone, `fbp`, `fbc`, IP, user agent, `event_source_url` |
| `generate_lead` | form success | `gtag('event','generate_lead',{program})` |
| GA4 page views | every page | gtag config, plus route change hook |

- All IDs from env vars. If an ID is missing, that script simply does not load (so local dev and previews send nothing).
- Scripts load with `next/script` after the page is interactive. Tracking calls are wrapped so a blocked or failed script can never stop the form. CAPI runs after the response is sent, so it adds zero wait.
- Student names and school names are never sent to Meta or Google. Only parent contact data, hashed, goes to CAPI.

---

## 7. Design system in code

`CLAUDE.md` has no section 13 (see open question 1). Until the real palette arrives, these **provisional** tokens follow the brochure described in `CLAUDE.md` section 4 (coral, navy, mint, off white; heavy condensed type). Swapping them later is a one block change.

```css
@theme {
  --color-coral: #FF6F59;      /* provisional */
  --color-navy: #0F1B3D;       /* provisional */
  --color-mint: #A8E6CF;       /* provisional */
  --color-offwhite: #FAF6EE;   /* provisional */
  --color-ink: #0F1B3D;
  --radius-card: 14px;
  --shadow-hard: 6px 6px 0 0 var(--color-coral);   /* navy cards */
  --shadow-hard-navy: 4px 4px 0 0 var(--color-navy); /* buttons on coral */
  --font-display: var(--font-anton);
  /* heavy, body, mono likewise */
}
```

Contrast (checked with these values):

| Pair | Ratio | Allowed |
|---|---|---|
| Navy on coral | 6.2 : 1 | yes, all text |
| Navy on mint | 12 : 1 | yes |
| Navy on off white | about 16 : 1 | yes |
| White on navy | about 17 : 1 | yes, the only place white text is used |
| Coral on navy | 6.2 : 1 | yes |
| White on coral | 2.7 : 1 | **never** |

Rules enforced in code: no `text-white` utility outside navy surfaces (lint check in review), focus ring visible on every surface.

**Feel references** (no layouts, assets or copy copied):
- `thefoundery.in`: one line carries the site, visible selection steps, faces with one line each.
- `mu20.co`: looping video hero, auto scrolling photo strips, numbered section labels, numbered cards with tag pills, community video mosaic, split word headlines across image tiles.
- `merch.samayraina.co`: dark and confident, one button hero, drop language, short cheeky lines, slide out menu.
- Last year's brochure: coral grounds, stacked Anton headlines, navy cards with coral offset shadows, monospace eyebrows.

**Lessons applied:** every number on the page is rendered on the server (no "0+" counters), every contact link is generated from the same value as its text. Motion is limited to the marquee, photo strips and subtle reveals, and all of it stops under `prefers-reduced-motion`.

---

## 8. Performance, SEO, accessibility

- Mobile first, designed at 375px, then scaled up. Target Lighthouse mobile 90+ on every landing page.
- Hero: the poster is the LCP element (`next/image`, `priority`); the video starts loading only after the page is interactive. Hero videos: H.264 MP4, 720p, under about 2 MB, muted, `playsInline`, loop. Never autoplay with sound; a tap unmutes.
- Videos below the fold: `preload="none"`, start only when on screen, pause when off screen (IntersectionObserver). `ReelsFeed` uses CSS scroll snap, plays only the visible clip.
- Photos: `next/image`, AVIF/WebP, sized per breakpoint, real alt text.
- Metadata per page (`generateMetadata`), Open Graph image per landing page, `sitemap.xml`, `robots.txt`, canonical URLs. Thank you page `noindex`.
- Keyboard navigable, skip link, visible focus, labelled controls, `aria-live` for form errors and submit state, 4.5:1 text contrast minimum.

---

## 9. Folder layout, env vars, assets

```
beoutlier/
  CLAUDE.md  ARCHITECTURE.md  BUILD_PROMPT.md  SETUP.md (Phase 3)
  app/                        see section 2
  components/
    ui/        Button, Eyebrow, StatusBadge, SeatsLine, InfoTable, NumberedList
    media/     VideoHero, PhotoStrip, ReelsFeed, Marquee
    sections/  TopStrip, DropCard, HouseCard, FacesGrid, AdmissionSteps, DayPlan, ProjectGrid
    form/      ApplicationForm, StepStudent, StepParent, HousePicker, fields
    layout/    Header, SlideMenu, Footer, LandingFooter, StickyApplyBar
    mode/      ParentStudentToggle, ModeSection
    tracking/  AttributionCapture, TrackViewContent, MetaPixel, GoogleAnalytics
  content/
    programs.ts  site.ts  people.ts  microcopy.ts
  lib/
    schema.ts      zod schema shared by form and API
    attribution.ts sessionStorage read and write
    leadId.ts      id generator
    phone.ts       Indian mobile normalise and validate
    capi.ts        Meta Conversions API call
    rateLimit.ts
    format.ts      ₹ formatting, IST timestamps
  google-apps-script/
    Code.gs
    appsscript.json
  public/
    brand/     logo.svg, logo-mark.svg, favicon
    media/
      home/        hero.mp4, hero-poster.jpg, flea-market.mp4, photos
      hackathon/   founders/   engineers/   designers/
      people/      <person-id>.jpg
      reels/       <clip>.mp4 + <clip>.jpg poster
  scripts/
    test-submit.mjs   posts a test lead to a running site, for end to end checks
```

**Environment variables**

| Name | Where | Purpose |
|---|---|---|
| `APPS_SCRIPT_URL` | server only | The deployed Apps Script web app URL |
| `APPS_SCRIPT_SECRET` | server only | Shared secret; must match Script Property `SHARED_SECRET` |
| `NEXT_PUBLIC_META_PIXEL_ID` | browser | Meta Pixel ID |
| `META_CAPI_TOKEN` | server only | Conversions API access token |
| `NEXT_PUBLIC_GA_ID` | browser | GA4 measurement ID (`G-XXXX`) |
| `NEXT_PUBLIC_SITE_URL` | both | `https://beoutlier.in`; canonical URLs, OG, sitemap |
| `META_TEST_EVENT_CODE` (optional) | server only | Routes CAPI events to Meta's Test Events tab while testing |

**Assets I need from you**

| Asset | Drop into |
|---|---|
| Logo SVG (full and mark), favicon | `public/brand/` |
| Home hero video + a still for the poster | `public/media/home/` |
| Flea market video (Home 02, Founders) | `public/media/home/` |
| Student photos per program (for strips and heroes) | `public/media/<program>/` |
| Student Reels clips (vertical, 9:16) with the number for each overlay | `public/media/reels/` |
| Mentor, faculty and partner faces + one line each | `public/media/people/` + tell me the lines |
| Alumni faces + what each built | `public/media/people/` |

Raw videos are fine; I will compress them for the web.

---

## 10. Open questions

**Conflicts between `BUILD_PROMPT.md` and `CLAUDE.md`**

1. **Section 13 does not exist.** The prompt says brand tokens are in `CLAUDE.md` section 13; the file ends at section 12 and section 4 says the palette is "to be added by Saurabh". I will build on the provisional tokens in section 7 unless you send the real ones. Does that work?
2. **Form fields.** `CLAUDE.md` lists only "parent's phone" for the parent. The prompt adds parent name, parent email and a consent checkbox. Without the email there is no parent confirmation email, and without consent we are collecting a minor's data with no recorded agreement. I recommend the prompt's fuller form. Approve?
3. **"Applying takes 10 minutes."** The prompt asks for a form that takes under 2 minutes. The line is still true as an upper bound, so I will keep it word for word unless you want it changed.

**Missing facts (placeholders until you send them)**

4. Founders: remaining campuses (`[3 more]` in Mumbai and Pune), dates, and the fee per campus. The Home card says "From ₹25,000" while the campus table says "₹25,000 or ₹40,000": which campuses are which?
5. `[X]` teenagers in 2025 and `[X]` Outliers so far.
6. **Hackathon payment.** ₹10,000: is it paid online at booking, or collected after the confirmation call? The plan assumes after the call, so no payment gateway. If you want online payment, Razorpay is a separate step.
7. **"A day inside IIT Bombay with the students who build for Techfest."** This names IIT Bombay as a place and names Techfest. Please confirm both are true and cleared, given the rule about never using "IIT Bombay" alone.

**Copy the build needs that `CLAUDE.md` does not have**

8. Form labels and errors, status badges ("Closing soon", "Waitlist", "Sold out"), the button label for waitlist and sold out, thank you text per program, both email texts, the footer joke line, the 404 page. I will draft all of it in `content/microcopy.ts`, following the voice rules, and mark every line `DRAFT` for you to approve. Is that OK, or do you want to write these yourself?
9. Where the pinned Hackathon drop card sits on Home. My plan: straight after the ticker, before section 01, with no new heading. Section 03 then stays "Three houses. Pick one."

**Business and legal checks (they do not block the build, but they block launch)**

10. **Privacy policy and terms.** Applicants are minors, so India's DPDP Act (verifiable parental consent, limits on tracking children) applies. I can draft `/privacy` and `/terms` from the real data flows in this plan, marked for lawyer review, but I should not be the final word on legal text.
11. **Email limits.** Apps Script on a free Gmail account can send about 100 emails a day; on Google Workspace about 1,500. Every lead sends two. Please run the script from the Workspace account that owns team@beoutlier.in, if it is Workspace.
12. **Vercel plan.** The free Hobby plan is for non commercial use only. A business site running ads should be on Vercel Pro (about $20 a month), which also gives more video bandwidth.
13. **Schools named.** "Previously hosted at DSB International School, The Green Acres Academy, The NEXT School, Goregaon Sports Club": confirm each is happy to be named.

**Setup on this machine**

14. Git is not installed on this computer, so I cannot push to GitHub yet. Install Git for Windows (or tell me and I will give you the one command). I will also need the GitHub account or repo name to use.
15. I put the project in `beoutlier/` inside your working folder, because that folder already holds an unrelated project (`index.html`, `src/`, `tools/`, `dist/`) that I have not touched.

---

## Phase 2 build order (after approval)

1. Project setup, tokens, fonts, both layouts.
2. `ApplicationForm`, `/api/apply`, `Code.gs`, `/apply`, thank you page. End to end test: submit, row in Sheet, team email, parent email. (Needs a Google account to deploy the script, see open question 11.)
3. `/hackathon` (goes live first).
4. `/founders`, `/engineers`, `/designers`.
5. Home.
6. The Code, Programs, Faculty, Parents, Schools with placeholders.
7. Tracking, metadata, OG images, `/privacy`, `/terms`.

Each step runs locally for you to see before the next one starts.
