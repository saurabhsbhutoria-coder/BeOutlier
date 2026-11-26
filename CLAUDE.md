# BeOutlier Website — Build Brief

Read this file fully before building anything. It is the single source of truth for copy, structure and rules.

## 1. What BeOutlier is

An experiential school for teenagers in India. For Summer 2027, programs run in Mumbai, Pune and Goa, and students come from all over India. It does not compete with schools. It adds the layer schools leave out: learning by doing, in front of real people.

The site must feel like an exclusive inner circle that teenagers want in on and parents trust.

## 2. Voice rules (non-negotiable)

- Bold, crisp, brutally honest. Say the fact, then stop.
- Never salesy, never cringe, never anti-school.
- No hyphens or dashes in any copy. No exclamation marks. No emojis anywhere.
- Banned words: unlock, empower, holistic, future ready, 21st century skills, world class, transformative, journey, nurture, potential.
- Banned phrase: "Real money, real customers".
- No stock photos. Only real student photos and videos.
- Every claim must be true. Write "IIT Bombay alumni" (updated 23 November 2026, was "IIT Bombay students"), never "IIT Bombay" alone. The IIT Bombay logo is used only on the Robotics Hackathon tag (see section 14).

## 3. Tech setup

- Next.js + Tailwind, hosted on Vercel, code on GitHub. Domain on GoDaddy, pointed to Vercel.
- Mobile first. Most traffic comes from Meta ads on phones.
- Every form submission goes to a Google Sheet, with an instant alert to the sales team.
- Tracking on every page: Meta Pixel + Conversions API, Google Analytics 4, UTM parameters saved with each lead.
- Landing pages are standalone: no menu, one button, one form.
- Video first. Student videos autoplay muted and swipe like Reels.

## 4. Design

- Brand palette and references: [to be added by Saurabh].
- Reference for energy and layout: last year's fellowship brochure (coral, navy, mint, off white; heavy condensed display type).
- Reference for exclusivity: thefoundery.in (one line carries the site, visible selection steps, faces with one line each).
- Student / Parent toggle at the top of the Home page. Student mode is loud and fast. Parent mode is calm: outcomes, safety, fees, testimonials.

## 5. Sitemap

Main site: Home, The Code, Programs, Faculty, For Parents, For Schools.

Landing pages:
1. /hackathon — Robotics Hackathon
2. /founders — Founders Fellowship (House of Founders)
3. /engineers — Robotics Fellowship, FLAME (House of Engineers). Residential.
4. /designers — Design and Architecture Fellowship, Goa (House of Designers). Residential.

## 6. Admissions (Summer 2027 programs)

Primary CTA everywhere: **Apply for Summer 2027**

1. Apply.
2. Aptitude test.
3. Screening call.
4. Selection letter, then enrol. Or a rejection letter, with an invitation to apply next year.

BeOutlier decides admission at every campus. Partner schools only collect fees.
Claim: 15% get in. Enforce it as a rule: offer seats to at most 15 of every 100 applicants. Track applications vs offers from day one.

The hackathon is open to all. No test, no call.

---

## 7. Home page

**Top strip**
Robotics Hackathon. Mumbai. 26 and 27 December. 51 seats. [Book a seat] → /hackathon

**Hero**
A school beyond classrooms.
Experiential learning for India's curious teenagers.
[Apply for Summer 2027]

**Ticker**
Not just a summer camp. Not a course. A community. An experiential school.

**01**
Teenagers know a lot.
They rarely get to use it.
Not for lack of ability. For lack of a place to try.
We built that place.

**02. Where it started**
In 2025, 45 teenagers built brands from scratch in 10 days.
They sourced, priced, pitched and sold to strangers.
Some sold out. Some lost money. Every one of them knows why.
[Flea market video]

**03. The houses**
Summer 2027. Three houses. Pick one.

| House | Program | What you do | Details | Link |
|---|---|---|---|---|
| Founders | Founders Fellowship | Build a brand. Pitch investors. Sell it at a live flea market. | 10 days. Day scholar. Mumbai and Pune. Grades 6 to 12. ₹40,000 | /founders |
| Engineers | Robotics Fellowship | Build a working robot with IIT Bombay alumni. Take it home. | 4 days. FLAME University, Pune. Last week of May. Ages 14 to 19. ₹40,000 | /engineers |
| Designers | Design and Architecture Fellowship | Learn architecture by building it, with the Houses of Goa. | 4 days. Goa. First week of June. Ages 14 to 19. ₹40,000 | /designers |

Each card: [Enter the house]

**04. Who you build with**
Not teachers. People who have done it.
[Faces with one line each]

**05. The Outliers**
150+ Outliers so far. This is what they made.
[Alumni faces, what each built, video feed with numbers as overlays]

**06. How you get in**
Applying takes 5 minutes. Getting in doesn't.
1. Apply.
2. Aptitude test. Nothing to memorise.
3. Screening call. We want to hear how you think.
4. A letter. Selected or not. If not, come back next year.
85 out of 100 won't make it.

**07. For parents** (toggle)
Everything you'd ask us on a call. Fees. Safety. Supervision. What your child brings home.

**Close**
Average is crowded. Be an Outlier.
[Apply for Summer 2027]

---

## 8. Landing page: Robotics Hackathon (/hackathon)

Rewritten 26 November 2026 to read as a serious build event, not a hobby day (structure from established student hackathons: tracks, format, judging, stakes). Fee changed to ₹8,000 per student; meals are not included.

**Hero** (26 November 2026: full bleed video background like Home, public/media/hackathon/, desktop and phone files)
Build a robot that thinks.
[IIT Bombay tag with logo] Mentored by folks from IIT Bombay
Robotics and AI Hackathon. 26 and 27 December. The Green Acres Academy, Chembur.
Ages 14 to 19. Teams of 3. No experience needed.
₹8,000 per student. 51 seats. 17 teams. [Book a seat]

**01. The challenge**
Four problem statements. Your team takes one. Every team builds with Arduino and AI. Each track is a problem engineers are solving right now.

| Track | Project | What it does |
|---|---|---|
| Autonomy | Self driving car | A car that reads the road ahead and steers around obstacles on its own. |
| Human machine interaction | Gesture controlled robotic arm | A camera reads your hand. The arm follows every move. |
| Computer vision | Face recognition door | Recognises the faces it knows and opens. Stays locked for everyone else. |
| Sustainability | Smart waste bin | Sees what goes in and sorts it into wet or dry waste, by itself. |

**02. Starting from zero**
You walk in with curiosity. You walk out having built a working robot. No coding or electronics needed. Day 1 opens with training in Arduino circuits and AI, and every team gets the full hardware kit before the build begins.

**03. The format** (10 am to 7 pm, both days)
Day 1. Training in Arduino circuits and AI. Teams lock in their problem statement. The build begins.
Day 2. Build, test, break, rebuild. Final demos before the judges.

**04. How teams are judged** (DRAFT, for BeOutlier to confirm)
Judged on what works. Not on what was planned. It works, live, in front of the judges. It solves the problem the team chose. The team can explain every part of how it works. It was built here, by the team, in two days.

**05. What is at stake** (rewritten 26 November 2026; Techfest is no longer named anywhere on the site)
₹20,000 prize pool. Top 3 projects win cash. Split (confirmed by BeOutlier, 26 November 2026): 1st ₹10,000, 2nd ₹6,000, 3rd ₹4,000, each a cash prize for the team.
The best teams also earn internship opportunities with stalwarts in AI and engineering.
For every student: a taste of building something cool with AI and circuits; every student keeps what they build; a room of geniuses; global exposure; a strong pre collegiate profile; a globally recognised certificate.

**06. Who you build with**
IIT Bombay alumni who build this for fun. (BeOutlier chose to keep this line, 25 November 2026.)
Mentors: Anish Mayanache, Gagan G, Giridhara Datta, Prabhakar J, Woodrow Gonsalves, each with an IIT Bombay badge.

**07. For parents**
Venue: The Green Acres Academy, Chembur.
Timings: 10 am to 7 pm, both days.
Included: every hardware part and kit the team builds with.
Meals: not included. Please send a packed lunch and water.
Supervision: 1 mentor for every 9 students.
Fee: ₹8,000 per student. Paid online at booking.

**Close**
51 seats. 17 teams. Booking closes when seats fill.
[Book a seat]

**Form**
Student name, age, school, parent's phone, city. Optional: "Coming with friends? Add their names."

**After booking**
Thank you page introduces the House of Engineers and links to /engineers.

---

## 9. Landing page: Founders Fellowship (/founders)

**Hero**
Build a brand. Sell it live. Keep what you make.
Founders Fellowship. House of Founders. Summer 2027.
10 days. Mumbai and Pune. Grades 6 to 12. 15% get in.
[Apply for Summer 2027]

**What it is**
Ten days. Offline. You form a team, build a brand from a blank page, source materials in the wholesale market, pitch it to investors and sell it at a live flea market. We give you seed capital to start, and what you earn at the stall is yours.

**The 10 days**
8 masterclasses. 1 Demo Day. 1 flea market.
1. Problem solving like a consultant
2. Design thinking
3. Market research with AI tools
4. Pricing and unit economics
5. Market visit: sourcing and vendor negotiation
6. Customer personas
7. Branding
8. How to sell
9. Demo Day: pitch to investors
10. Live flea market, open to the public

**Every day**

| Time | Block | What happens |
|---|---|---|
| 11 am to 1 pm | Masterclass | One idea, taught through real cases. |
| 1 pm to 2 pm | Lunch | Bring your tiffin, or opt into our meal plan. |
| 2 pm to 4 pm | Workshop | Apply it to your own brand, that same day. |

**What you walk away with**
1. Your own brand. Name, product, packaging, built from zero.
2. Your profits. Whatever you sell is yours to keep.
3. Your journal. Everything you learned, in your own handwriting.
4. A shot at the prize pool. The best brands get scouted by investors.
5. The Outliers network. Alumni, mentors and every cohort after you.

Some teams sell out. Some lose money. Every team knows why.

**Who you learn from**
People who have built things. 1 mentor for every 9 students.
[Mentor faces with one line each — to be added]

**Previously hosted at**
DSB International School. The Green Acres Academy. The NEXT School. Goregaon Sports Club.

**Campuses for 2027**

| City | Campus | Dates | Fee |
|---|---|---|---|
| Mumbai | Lower Parel, Chembur, Kandivali, [3 more] | [ ] | ₹40,000 |
| Pune | Amanora, [3 more] | [ ] | ₹40,000 |

**How you get in**
Applying takes 5 minutes. Getting in doesn't.
1. Apply.
2. Aptitude test. Nothing to memorise.
3. Screening call. We want to hear how you think.
4. A letter. Selected or not. If not, come back next year.
85 out of 100 won't make it. Every campus, same bar.

**The flea market**
Shop what the next generation built.
Open to all. Bring family. The students set the prices. You decide what sells out.

**Close**
Average is crowded.
[Apply for Summer 2027]

**Form**
Student name, grade, school, parent's phone, city, preferred campus.

---

## 10. Landing page: Robotics Fellowship (/engineers)

**Hero**
Four days on a university campus. One robot you built yourself.
Robotics Fellowship. House of Engineers. Residential. FLAME University, Pune.
Last week of May. Ages 14 to 19. Built with IIT Bombay alumni.
₹40,000. Stay and meals included. 15% get in.
[Apply for Summer 2027]

**What it is**
You live on campus for four days. You learn Arduino circuits and AI from IIT Bombay alumni. Then your team builds a machine that sees, decides and moves, and puts it up against every other team's.

**The four days**
Day 1. Move in. Orientation with your parents. Meet your team. First circuit.
Day 2. Sensors, motors and AI. Pick your build.
Day 3. Build all day. Break it. Fix it.
Day 4. The arena. Every robot competes. Then you take yours home.

**What you could build**
Self driving rover, gesture controlled robotic arm, face recognition lock, smart sorting machine. Your team picks one.

**Before you start**
No experience needed. Bring the curiosity. We bring the rest.

**After dark**
Bonfires. Fun nights. Expeditions. Cultural evenings.
Mentors join in. Nobody's on their phone.

**What you walk away with**
A working robot, yours to keep.
Four days of campus life.
A team you built it with.

**Who you build with**
IIT Bombay alumni who build this for fun.
[Faces with one line each]

**For parents**

| | |
|---|---|
| Stay | On the FLAME campus. 3 students per room. |
| Meals | All included. |
| Arrival | You drop your child at campus and stay for the Day 1 orientation. |
| Supervision | 1 mentor for every 9 students. Wardens on duty. |
| Safety | Doctor and medical team on campus. Security team. CCTV surveillance. |
| Evenings | Supervised cultural activities, expeditions and bonfire nights with mentors. |
| Fee | ₹40,000. |

**How you get in**
Same four steps. 85 out of 100 won't make it.

**Close**
Four days. One campus. Limited rooms.
[Apply for Summer 2027]

**Form**
Student name, age, school, parent's phone, city.

---

## 11. Landing page: Design and Architecture Fellowship (/designers)

**Hero**
Four days in Goa. Learn architecture by building it.
Design and Architecture Fellowship. House of Designers. Residential. In collaboration with the Houses of Goa.
First week of June. Ages 14 to 19. ₹40,000. Stay and meals included. 15% get in.
[Apply for Summer 2027]

**What it is**
You study how Goa was built. You walk its heritage lanes. Then your team designs and builds something of its own, by hand.

**The four days**
Day 1. Arrive. Orientation with your parents. Inside the Houses of Goa museum.
Day 2. Heritage expedition and cultural walk. Sketch what you see. Get your brief.
Day 3. Design and build. Hands on, real materials.
Day 4. Show your work. Defend your design. Best one wins. Then home.

**What you build**
An architectural project for a real space in Goa, and an artistic piece made with your own hands.
It stays in Goa. That's the point of building it for Goa.

**Before you start**
No experience needed. Bring the curiosity. We bring the rest.

**After dark**
Bonfires. Fun nights. Expeditions. Cultural evenings.
Mentors join in. Nobody's on their phone.

**Who you build with**
The Houses of Goa team, founded by architect Gerard da Cunha.
[Faces with one line each]

**For parents**

| | |
|---|---|
| Stay | International Centre Goa. 3 students per room. |
| Meals | All included. |
| Arrival | You drop your child off and stay for the Day 1 orientation. |
| Supervision | 1 mentor for every 9 students. Wardens on duty. |
| Safety | Doctor and medical team on site. Security team. CCTV surveillance. |
| Evenings | Supervised cultural activities, expeditions and bonfire nights with mentors. |
| Fee | ₹40,000. |

**How you get in**
Same four steps. 85 out of 100 won't make it.

**Close**
Four days. One coast. Limited rooms.
[Apply for Summer 2027]

**Form**
Student name, age, school, parent's phone, city.

---

## 12. Still to fill

- Brand palette, fonts and reference sites
- Founders Fellowship: remaining campuses, dates and fee per campus
- Mentor and faculty faces with one line each, for all pages
- Alumni numbers and student videos for the Home page
- For Parents, For Schools, The Code and Faculty pages (not written yet)

---

## 13. Decisions and brand tokens (added 19 November 2026)

**Brand tokens** (updated 22 November 2026: light, BeOutlier specific; inspired by the "BeOutlier Summer 2027" reference, without its loader, quiz or orange)

| Token | Hex | Use |
|---|---|---|
| White | #FFFFFF | Main ground |
| Ink (charcoal) | #25282A | Type, dark bands (hackathon drop, The Outliers, After dark, footer), buttons |
| Mint | #6CD4B1 | Header, hero and close bands, the outlier dot, button text on ink |
| Mint deep | #2A7D62 | Mint for text on white |
| Sand | #D9CBB8 | Parents band, form band |
| Linen | #F3EEE6 | Quiet alternate band |

Not used: #E99A62 (orange).

Motif: the outlier. A single mint dot that stands apart: it prefixes every section label, replaces the full stop in the hero line, and is the hero of the "How you get in" graph (a crowd of dots and the one that breaks away).

Logo: the original BeOutlier logo. public/brand/logo.webp and logo.png are the transparent cut; it sits on mint (its native ground) or charcoal, never on white.

Type: Anton for headlines (uppercase, stacked). Inter Tight for everything else. Square corners, hairline rules, ink block buttons with mint text and a sliding arrow.

Houses: expandable panels. Desktop: side by side, hover or focus widens one and brings its photo to colour. Phone: stacked bars, tap to open, one always open. Engineers and Designers use flea market photos as stand ins until real program photos exist.

**Forms (every program)**
Student name, age, grade, school, board, city, parent name, phone number, email. Founders adds preferred campus. Hackathon adds the optional friends field. A consent checkbox is required to submit.

**Founders Fellowship** dates and fees: to be disclosed later. Show "Dates and fees announced soon" style placeholders, never a guessed number.

**Hackathon payment**: paid online at booking. The booking form collects details, then sends the parent to the payment page. Gateway to be added by BeOutlier.

**Confirmed true and cleared**: Every school named under "Previously hosted at".

**Copy changes**: "Applying takes 5 minutes." 45 teenagers in 2025. 150+ Outliers so far.

**Privacy and terms**: drafted by the build, reviewed by BeOutlier before launch.

---

## 14. Home page changes (22 November 2026)

**Order:** top strip, hero, ticker, 01, 02 Where it started, numbers, Robotics Hackathon (just above the houses), 03 houses, 04 who you build with, 05 student interviews, 06 parent testimonials, 07 what you take home, 08 how you get in, 09 for parents, close.

**02. Where it started:** vision line "A generation of problem solvers and change makers who dare to question, and create." The 2025 story stays word for word. The flea market video (same as the phone hero) plays in its own frame.

**Numbers:** 18 brands built by students. ₹5L+ earned by their brands. 45 Outliers in the community. 15% acceptance rate. (The 150+ figure is removed.)

**Robotics Hackathon block:** the dates in their own container (Sat 26 and Sun 27 December), venue, timings, ages, fee, seats. Tag: "Mentored by folks from IIT Bombay" (changed 26 November 2026) with the IIT Bombay logo. The logo is allowed on this tag only, at BeOutlier's request. Switch the logo off in content/site.ts (iitBombayTag.showLogo).

**05 and 06:** four student reels from @beoutlier.in (hosted on the site since 23 November 2026, because tracking protection blocks Instagram embeds in several browsers; line "Straight from @beoutlier.in") and seven parent testimonials (seven clips added 23 November 2026, line "Seven families. Unscripted."), each a horizontal slider of framed videos with arrows. Slots live in content/media.ts.

**04. Mentors (added 23 November 2026):** ten mentors in content/people.ts, each with a photo and one line, taken from their own LinkedIn or Instagram profile. Shown in one framed container as a two row slider, five per row on desktop. No keyword tags. Status at IIT Bombay as their profiles show it: Suraj Racha is an alumnus (dual degree 2018 to 2023, now PhD); Anish Mayanache (MTech, to 2028) and Anmol Sureka (BTech, to 2028) are current students. A mentor's line may name their IIT Bombay degree; that is not "IIT Bombay" alone.

**07. What you take home:** certificate template. Every student keeps the project they built, a documentation journal, a detailed evaluation report, and access to the Level 2 Accelerator program.

**Changes of 23 November 2026 (evening):**
- Never write "2025" on the site. Say "Last Summer" ("Last Summer, 45 teenagers built brands from scratch in 10 days.").
- 09. For parents on Home is short and vision led: "Summer 2027 is Level 1.", one paragraph on building something real and a strong profile, four facts (three houses, fee per house, format, supervision), then the pathway: Level 1 (Summer 2027), Level 2 (a 9 month accelerator to go deeper and learn the skill sets), Level 3 (internships around the world, across diverse industries). Full house by house details live on /parents and the landing pages only.
- Certificate: AIM (NITI Aayog) and MCA logos are ready but switched off (content/site.ts, certificateLogos.show) until BeOutlier confirms written permission, because both carry the State Emblem of India.
- Sections fade up gently as they scroll into view (components/ui/ScrollMotion.tsx), off for reduced motion.

**Changes of 23 November 2026 (night):**
- Menu: Programs, Mentors, Stories, For Parents, FAQs (each a section of Home) and About Us. The Code and For Schools are off the menu, footer and sitemap (the pages still exist, unlinked). The footer has an Explore column with every key Home section.
- Corners: video cards, mentor cards, FAQ items and About cards are rounded (soft frame, video inset). Buttons and section blocks stay square.
- Mentors: each in its own rounded card, two rows that slide together. No count label.
- 10. FAQs on Home (content/faq.ts), built only from facts in this file and content/programs.ts.
- About Us (/about): what BeOutlier is, the vision, how it started (Last Summer, the orientation where 70 came against 25 expected, 45 teenagers, the flea market), the numbers, the three levels, the founding team (Saurabh Bhutoria: product, student experience and brand; Ishan Dubey: sales and partnerships), advisors and the mentors. Team, advisors, the orientation and host schools come from BeOutlier's One Pager (content/about.ts). Founder photos: initials until real photos are added.

**Programs:** all three houses are ₹40,000. Founders Fellowship is a day scholar program; Robotics Fellowship and Design and Architecture Fellowship are residential. "Residential" is the format, never part of the name.
