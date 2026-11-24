"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mainNav, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function SlideMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The header uses backdrop blur, which would trap a fixed overlay inside it,
  // so the overlay is portalled to <body>.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      // preventScroll: returning focus must not pull the page back up to the header
      buttonRef.current?.focus({ preventScroll: true });
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
        className="inline-flex size-10 items-center justify-center border border-ink/40 transition-colors hover:border-ink hover:bg-ink hover:text-mint"
      >
        <span className="sr-only">Open menu</span>
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path d="M0 3h20M0 11h20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {mounted ? createPortal(
      <div
        className={`fixed inset-0 z-[60] overflow-hidden transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 bg-ink/50"
          onClick={() => setOpen(false)}
        />
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          // Any link tapped in the menu closes it at once. Links to sections of
          // the page you are on (/#faq) never change the path, so this is the
          // only thing that closes the menu for them.
          onClickCapture={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink p-6 text-white on-dark transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center border border-white/30 hover:border-mint hover:text-mint"
            >
              <span className="sr-only">Close menu</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="mt-6">
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/" className="display block border-b border-white/15 py-3 text-4xl transition-[color,padding] duration-300 hover:pl-3 hover:text-mint">
                  Home
                </Link>
              </li>
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="display block border-b border-white/15 py-3 text-4xl transition-[color,padding] duration-300 hover:pl-3 hover:text-mint"
                    aria-current={pathname === n.href ? "page" : undefined}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <ButtonLink href="/apply" variant="mint" size="lg">
              {site.primaryCta}
            </ButtonLink>
            <p className="label text-white/70">
              <a href={site.whatsapp.href} className="underline underline-offset-4">
                WhatsApp {site.whatsapp.display}
              </a>
            </p>
          </div>
        </div>
      </div>,
      document.body,
      ) : null}
    </>
  );
}
