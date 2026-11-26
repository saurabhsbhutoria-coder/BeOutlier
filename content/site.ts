/**
 * Contact details. Every visible number, email and handle is rendered
 * from the same object as its link, so the text and the link never drift.
 */
export const site = {
  name: "BeOutlier",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://beoutlier.in").replace(/\/$/, ""),
  tagline: "Think.Learn.Create",
  description: "Experiential learning for India's outlier teenagers.",
  primaryCta: "Apply for Summer 2027",
  whatsapp: {
    display: "+91 88286 90027",
    digits: "918828690027",
    href: "https://wa.me/918828690027",
    tel: "tel:+918828690027",
  },
  email: {
    display: "team@beoutlier.in",
    href: "mailto:team@beoutlier.in",
  },
  instagram: {
    display: "@beoutlier.in",
    href: "https://www.instagram.com/beoutlier.in/",
  },
} as const;

export function whatsappLink(text?: string): string {
  return text ? `${site.whatsapp.href}?text=${encodeURIComponent(text)}` : site.whatsapp.href;
}

/** Menu: sections of the Home page, plus About Us (changed 23 November 2026). */
export const mainNav = [
  { href: "/#houses", label: "Programs" },
  { href: "/#mentors", label: "Mentors" },
  { href: "/#stories", label: "Stories" },
  { href: "/#parents", label: "For Parents" },
  { href: "/#faq", label: "FAQs" },
  { href: "/about", label: "About Us" },
] as const;

/** Footer "Explore" column: every key section of the Home page. */
export const footerNav = [
  { href: "/#houses", label: "The three houses" },
  { href: "/#mentors", label: "Mentors" },
  { href: "/#stories", label: "Hear it from the Outliers" },
  { href: "/#testimonials", label: "Parent testimonials" },
  { href: "/#take-home", label: "What you take home" },
  { href: "/#admissions", label: "How you get in" },
  { href: "/#parents", label: "For Parents" },
  { href: "/#faq", label: "FAQs" },
] as const;

/**
 * IIT Bombay tag on the Robotics Hackathon block.
 * NOTE: CLAUDE.md section 2 allows the IIT Bombay logo only on this tag.
 * Requested by BeOutlier on 22 November 2026; set
 * showLogo to false to fall back to the text tag only.
 */
/**
 * Logos on the certificate (Home section 07), requested 23 November 2026.
 * Both carry the State Emblem of India, which only authorised bodies may use
 * (State Emblem of India (Prohibition of Improper Use) Act, 2005). Keep show
 * false until BeOutlier has written permission from AIM and from MCA.
 */
export const certificateLogos = {
  show: false,
  items: [
    { src: "/brand/partners/aim-niti-aayog.webp", alt: "Atal Innovation Mission, NITI Aayog", width: 424, height: 160 },
    { src: "/brand/partners/mca.webp", alt: "Ministry of Corporate Affairs, Government of India", width: 116, height: 160 },
  ],
} as const;

export const iitBombayTag = {
  showLogo: true,
  logo: "/brand/partners/iit-bombay.png",
  text: "Mentored by folks from IIT Bombay",
} as const;
