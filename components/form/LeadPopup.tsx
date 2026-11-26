"use client";

import { useEffect, useRef, useState } from "react";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import type { ProgramId } from "@/content/programs";

/** Seconds on the page before the form opens by itself. */
const DELAY_MS = 5000;
const PREFIX = "popup-";

/**
 * The landing page form, opened by itself 5 seconds after the page loads
 * (added 26 November 2026, to capture more leads from ads).
 * Opens once per visit (per tab session), and never when the visitor is
 * already at the form, typing in it, or has applied. Close with the X,
 * Escape or a tap outside. What they typed carries over to the page form.
 */
export function LeadPopup({
  programId,
  mode,
  eyebrow,
  heading,
  line,
}: {
  programId: ProgramId;
  mode: "apply" | "booking";
  eyebrow: string;
  heading: string;
  line?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const seenKey = `bo_popup_seen_${programId}`;

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(seenKey) || sessionStorage.getItem("bo_last_lead"));
    } catch {
      /* storage blocked: still show it once on this page view */
    }
    if (seen) return;

    const t = window.setTimeout(() => {
      // Not if they are already at the form or typing anywhere on the page
      const apply = document.getElementById("apply");
      const r = apply?.getBoundingClientRect();
      const formInView = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      const typing = document.activeElement?.closest("form, input, select, textarea");
      if (formInView || typing) return;

      try {
        sessionStorage.setItem(seenKey, "1");
      } catch {
        /* ignore */
      }
      setMounted(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [seenKey]);

  // Open once the dialog is on the page
  useEffect(() => {
    const d = ref.current;
    if (!mounted || !d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
  }, [mounted]);

  // Leaving the page (e.g. to the thank you page) never leaves scrolling locked
  useEffect(() => () => {
    document.documentElement.style.overflow = "";
  }, []);

  const close = () => ref.current?.close();

  const onClose = () => {
    document.documentElement.style.overflow = "";
    // Hand what was typed to the page form
    window.dispatchEvent(
      new CustomEvent("bo:draft-sync", { detail: { key: `bo_draft_${programId}`, from: PREFIX } }),
    );
  };

  if (!mounted) return null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="lead-popup-title"
      className="lead-popup m-0 mt-auto max-h-[92svh] w-full max-w-none overflow-y-auto rounded-t-[22px] bg-sand p-0 text-ink backdrop:bg-ink/70 sm:m-auto sm:max-h-[90svh] sm:w-[min(640px,calc(100vw-2rem))] sm:rounded-[22px]"
    >
      <div className="relative px-4 pt-5 pb-5 sm:px-8 sm:pt-8 sm:pb-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/70 text-ink transition-colors hover:bg-white sm:top-5 sm:right-5"
        >
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="label flex items-center gap-2 pr-12 text-ink/70">
          <span className="inline-block size-2 rounded-full bg-mint-deep" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id="lead-popup-title" className="display mt-3 pr-10 text-4xl leading-[0.95] sm:text-6xl">
          {heading}
        </h2>
        {line ? <p className="mt-3 max-w-md text-base leading-snug sm:text-lg">{line}</p> : null}
        <div className="mt-5 sm:mt-6">
          <ApplicationForm mode={mode} programId={programId} idPrefix={PREFIX} />
        </div>
      </div>
    </dialog>
  );
}
