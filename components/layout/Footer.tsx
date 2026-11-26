import Link from "next/link";
import { Logo } from "@/components/ui/bits";
import { footerNav, site } from "@/content/site";
import { houses, programs } from "@/content/programs";
import { microcopy } from "@/content/microcopy";

/** Small line icons for the contact links (decorative; the text says what each is). */
const icons = {
  whatsapp: (
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Zm-3 4.6c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1 1.5 1.7 2 .5.4 1.1.7 1.6.9.2.1.4 0 .5-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.4 0 .5-.1 1.1-.5 1.5-.5.5-1.3.8-2 .7-1.2-.2-2.4-.7-3.4-1.4a9 9 0 0 1-2.9-3.4c-.4-.8-.5-1.7-.2-2.5.2-.5.5-.9.9-1.1.1-.2.4-.2.5-.2Z" fill="currentColor" />
  ),
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.5 7 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </>
  ),
};

const contactLinks = [
  { key: "whatsapp", label: "WhatsApp", href: site.whatsapp.href, text: site.whatsapp.display, external: true },
  { key: "email", label: "Email", href: site.email.href, text: site.email.display, external: false },
  { key: "instagram", label: "Instagram", href: site.instagram.href, text: site.instagram.display, external: true },
] as const;

/** WhatsApp, email and Instagram, each as an icon and its handle. chips: rounded pills in a row. */
function Contacts({ chips = false }: { chips?: boolean }) {
  return (
    <ul className={chips ? "flex flex-wrap gap-2.5" : "flex flex-col gap-3.5 text-sm text-white/80"}>
      {contactLinks.map((c) => (
        <li key={c.key}>
          <a
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
            aria-label={`${c.label} ${c.text}`}
            className={
              chips
                ? "group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 py-2 pr-4.5 pl-3 text-sm text-white/85 transition-colors hover:border-mint hover:text-mint"
                : "group inline-flex items-center gap-3 transition-colors hover:text-mint"
            }
          >
            <span
              className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-mint transition-colors group-hover:bg-mint group-hover:text-ink"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="size-4">
                {icons[c.key]}
              </svg>
            </span>
            {c.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Legal() {
  return (
    <ul className="label flex flex-wrap gap-x-6 gap-y-2 !text-[10px] text-white/50">
      <li>
        <Link href="/privacy" className="transition-colors hover:text-white">
          Privacy
        </Link>
      </li>
      <li>
        <Link href="/terms" className="transition-colors hover:text-white">
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
      <p className="label flex items-center gap-2 text-mint"><span className="dot" aria-hidden="true" />{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Footer() {
  const hackathon = programs.find((p) => p.id === "hackathon");
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="shell grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-10 sm:h-12" />
        </div>
        <Column title="Summer 2027">
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            {houses().map((h) => (
              <li key={h.id}>
                {h.published ? (
                  <Link href={h.route} className="transition-colors hover:text-mint">
                    {h.houseName}
                  </Link>
                ) : (
                  <span className="text-white/55">
                    {h.houseName}
                    <span className="label mt-1 block whitespace-nowrap !text-[10px] text-mint">Coming soon</span>
                  </span>
                )}
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
        <Column title="Explore">
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            {footerNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-mint">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="BeOutlier">
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            {[
              { href: "/about", label: "About Us" },
              { href: "/parents", label: "Every detail for parents" },
              { href: "/apply", label: site.primaryCta },
            ].map((n) => (
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
      <div className="border-t border-white/15">
        <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-sand">{microcopy.footer.joke}</p>
          <Legal />
        </div>
      </div>
    </footer>
  );
}

/** Landing pages: no menu, no outbound navigation. Contact and legal only, in two tidy rows. */
export function LandingFooter() {
  return (
    <footer className="on-dark bg-ink pb-24 text-white sm:pb-0">
      <div className="shell py-12 sm:py-14">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Logo className="h-9 w-fit" />
            <p className="text-sm text-white/60 sm:border-l sm:border-white/15 sm:pl-6">{site.description}</p>
          </div>
          <Contacts chips />
        </div>
        <div className="mt-10 border-t border-white/15 pt-6">
          <Legal />
        </div>
      </div>
    </footer>
  );
}
