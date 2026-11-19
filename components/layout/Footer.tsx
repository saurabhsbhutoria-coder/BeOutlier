import Link from "next/link";
import { Wordmark } from "@/components/ui/bits";
import { mainNav, site } from "@/content/site";
import { houses, programs } from "@/content/programs";
import { microcopy } from "@/content/microcopy";

function Contacts() {
  return (
    <ul className="flex flex-col gap-2 text-sm font-semibold">
      <li>
        <a href={site.whatsapp.href} className="hover:text-mint">
          WhatsApp {site.whatsapp.display}
        </a>
      </li>
      <li>
        <a href={site.email.href} className="hover:text-mint">
          {site.email.display}
        </a>
      </li>
      <li>
        <a href={site.instagram.href} className="hover:text-mint" rel="noopener" target="_blank">
          Instagram {site.instagram.display}
        </a>
      </li>
    </ul>
  );
}

function Legal() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-offwhite/70">
      <li>
        <Link href="/privacy" className="hover:text-mint">
          Privacy
        </Link>
      </li>
      <li>
        <Link href="/terms" className="hover:text-mint">
          Terms
        </Link>
      </li>
      <li>© {new Date().getFullYear()} {microcopy.footer.rights}</li>
    </ul>
  );
}

export function Footer() {
  const hackathon = programs.find((p) => p.id === "hackathon");
  return (
    <footer className="bg-navy text-offwhite">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark className="text-4xl" />
          <p className="mt-3 inline-block border-2 border-offwhite px-2 py-0.5 text-xs font-bold">{site.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-mint">/ Summer 2027</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold">
            {houses().map((h) => (
              <li key={h.id}>
                <Link href={h.route} className="hover:text-mint">
                  {h.houseName}
                </Link>
              </li>
            ))}
            {hackathon ? (
              <li>
                <Link href={hackathon.route} className="hover:text-mint">
                  {hackathon.title}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-mint">/ BeOutlier</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-mint">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-mint">/ Talk to us</p>
          <div className="mt-4">
            <Contacts />
          </div>
        </div>
      </div>
      <div className="border-t border-offwhite/15">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="heavy text-sm text-coral">{microcopy.footer.joke}</p>
          <Legal />
        </div>
      </div>
    </footer>
  );
}

/** Landing pages: no menu, no outbound navigation. Contact and legal only. */
export function LandingFooter() {
  return (
    <footer className="bg-navy pb-24 text-offwhite sm:pb-0">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Wordmark className="text-3xl" />
          <div className="mt-4">
            <Contacts />
          </div>
        </div>
        <Legal />
      </div>
    </footer>
  );
}
