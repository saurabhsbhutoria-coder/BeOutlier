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

export const mainNav = [
  { href: "/programs", label: "Programs" },
  { href: "/the-code", label: "The Code" },
  { href: "/faculty", label: "Faculty" },
  { href: "/parents", label: "For Parents" },
  { href: "/schools", label: "For Schools" },
] as const;

/**
 * IIT Bombay tag on the Robotics Hackathon block.
 * NOTE: CLAUDE.md section 2 allows the IIT Bombay logo only on this tag.
 * Requested by BeOutlier on 22 November 2026; set
 * showLogo to false to fall back to the text tag only.
 */
export const iitBombayTag = {
  showLogo: true,
  logo: "/brand/partners/iit-bombay.png",
  text: "Mentored by IIT Bombay alumni",
} as const;
