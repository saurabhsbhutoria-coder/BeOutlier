"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function SlideMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const a = items[0];
        const z = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="inline-flex size-11 items-center justify-center rounded-[10px] border-2 border-offwhite/30 hover:border-mint"
      >
        <span className="sr-only">Open menu</span>
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </button>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 bg-navy/60"
          onClick={() => setOpen(false)}
        />
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-coral p-6 text-navy shadow-[-8px_0_0_0_var(--color-navy)] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-[10px] border-2 border-navy"
            >
              <span className="sr-only">Close menu</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="mt-6">
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/" className="display block py-1 text-5xl hover:text-offwhite">
                  Home
                </Link>
              </li>
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="display block py-1 text-5xl hover:text-offwhite"
                    aria-current={pathname === n.href ? "page" : undefined}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <ButtonLink href="/apply" variant="navy" size="lg">
              {site.primaryCta}
            </ButtonLink>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em]">
              <a href={site.whatsapp.href} className="underline underline-offset-4">
                WhatsApp {site.whatsapp.display}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
