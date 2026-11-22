"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Mobile only. Appears once the hero has scrolled away, hides while the form
 * is on screen. Same action as every other button on the page: go to the form.
 */
export function StickyApplyBar({ label, target = "apply" }: { label: string; target?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById(target);
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.05 });
      io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [target]);

  const show = pastHero && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-mint p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <ButtonLink href={`#${target}`} tabIndex={show ? 0 : -1} variant="ink" size="lg" className="w-full">
        {label}
      </ButtonLink>
    </div>
  );
}
