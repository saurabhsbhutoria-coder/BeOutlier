import Link from "next/link";
import { Logo } from "@/components/ui/bits";
import { mainNav, site } from "@/content/site";
import { houses, programs } from "@/content/programs";
import { microcopy } from "@/content/microcopy";

function Contacts() {
  return (
    <ul className="flex flex-col gap-3 text-sm text-bone/80">
      <li>
        <a href={site.whatsapp.href} className="transition-colors hover:text-mint">
          WhatsApp {site.whatsapp.display}
        </a>
      </li>
      <li>
        <a href={site.email.href} className="transition-colors hover:text-mint">
          {site.email.display}
        </a>
      </li>
      <li>
        <a href={site.instagram.href} className="transition-colors hover:text-mint" rel="noopener" target="_blank">
          Instagram {site.instagram.display}
        </a>
      </li>
    </ul>
  );
}

function Legal() {
  return (
    <ul className="label flex flex-wrap gap-x-6 gap-y-2 !text-[10px] text-bone/50">
      <li>
        <Link href="/privacy" className="transition-colors hover:text-bone">
          Privacy
        </Link>
      </li>
      <li>
        <Link href="/terms" className="transition-colors hover:text-bone">
          Terms
        </Link>
      </li>
      <li>© {new Date().getFullYear()} {microcopy.footer.rights}</li>
    </ul>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label text-bone/45">[ {title} ]</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Footer() {
  const hackathon = programs.find((p) => p.id === "hackathon");
  return (
    <footer className="border-t border-bone/10 bg-ink-deep text-bone">
      <div className="shell grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-10 sm:h-12" />
        </div>
        <Column title="Summer 2027">
          <ul className="flex flex-col gap-3 text-sm text-bone/80">
            {houses().map((h) => (
              <li key={h.id}>
                <Link href={h.route} className="transition-colors hover:text-mint">
                  {h.houseName}
                </Link>
              </li>
            ))}
            {hackathon ? (
              <li>
                <Link href={hackathon.route} className="transition-colors hover:text-mint">
                  {hackathon.title}
                </Link>
              </li>
            ) : null}
          </ul>
        </Column>
        <Column title="BeOutlier">
          <ul className="flex flex-col gap-3 text-sm text-bone/80">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-mint">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Talk to us">
          <Contacts />
        </Column>
      </div>
      <div className="border-t border-bone/10">
        <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-sand">{microcopy.footer.joke}</p>
          <Legal />
        </div>
      </div>
    </footer>
  );
}

/** Landing pages: no menu, no outbound navigation. Contact and legal only. */
export function LandingFooter() {
  return (
    <footer className="border-t border-bone/10 bg-ink-deep pb-24 text-bone sm:pb-0">
      <div className="shell flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo className="h-9" />
          <div className="mt-6">
            <Contacts />
          </div>
        </div>
        <Legal />
      </div>
    </footer>
  );
}
