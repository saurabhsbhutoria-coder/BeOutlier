/**
 * UI text that CLAUDE.md does not supply.
 * STATUS: DRAFT. Every line here is written by the build to the voice rules
 * (no dashes, no exclamation marks, no banned words) and waits for BeOutlier's review.
 */
import { site } from "./site";

export const microcopy = {
  form: {
    stepStudent: "The student",
    stepParent: "The parent",
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    pickHouse: "Pick your house",
    pickHouseHint: "You can apply to one house per form.",
    next: "Next",
    back: "Back",
    sending: "Sending",
    consent:
      "I am the parent or guardian and I agree to BeOutlier contacting me about this application.",
    privacyLink: "Read how we use your data",
    friendsHint: "Teams are 3. We will try to put you together.",
    phoneHint: "We send updates on WhatsApp.",
    labels: {
      student_name: "Student name",
      age: "Age",
      grade: "Grade",
      school: "School",
      board: "Board",
      city: "City",
      preferred_campus: "Preferred campus",
      friends: "Coming with friends? Add their names.",
      parent_name: "Parent name",
      parent_whatsapp: "Phone number",
      parent_email: "Email",
    },
    placeholders: {
      select: "Pick one",
    },
    errors: {
      student_name: "Enter the student's full name.",
      age: "Pick the student's age.",
      grade: "Pick the student's grade.",
      school: "Enter the school name.",
      board: "Pick the school board.",
      city: "Enter your city.",
      preferred_campus: "Pick a campus.",
      parent_name: "Enter the parent's name.",
      parent_whatsapp: "Enter a 10 digit Indian mobile number.",
      parent_email: "Enter a valid email address.",
      consent: "Tick the box to continue.",
      house: "Pick a house.",
    },
    failed: `Something broke on our side. WhatsApp us on ${site.whatsapp.display} and we'll take your application there.`,
    rateLimited: `Too many tries from this connection. Wait a few minutes, or WhatsApp us on ${site.whatsapp.display}.`,
    soldOut: "Every seat is taken.",
  },
  thankYou: {
    apply: {
      title: "Application in.",
      body: "We read every one. The aptitude test link reaches the parent's email and WhatsApp next.",
      steps: ["Apply. Done.", "Aptitude test. Link on its way.", "Screening call.", "A letter. Selected or not."],
    },
    booking: {
      title: "Details in. One step left.",
      bodyPay: "Your seat is held once the payment goes through.",
      bodyNoPay: "We will call the parent to confirm the booking and share the payment link.",
      payCta: (amount: string) => `Pay ${amount} and lock the seat`,
      reference: "Booking reference",
    },
    houseOfEngineersEyebrow: "After the hackathon",
    back: "Back to the site",
  },
  footer: {
    joke: "Average is crowded. The footer is not.",
    rights: "BeOutlier",
  },
  notFound: {
    title: "This page did not make it in.",
    body: "Most pages here are selective. This one does not exist.",
    cta: "Go home",
  },
  toggle: {
    label: "I am a",
    student: "Student",
    parent: "Parent",
  },
  placeholders: {
    faces: "[FACES WITH ONE LINE EACH: TO BE ADDED]",
    video: "[VIDEO TO BE ADDED]",
    dates: "[DATES]",
    fee: "[FEE]",
    moreCampuses: "[3 MORE]",
    testimonials: "[PARENT TESTIMONIALS: TO BE ADDED]",
  },
} as const;
