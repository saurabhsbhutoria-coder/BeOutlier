"use client";

import { useEffect, useState } from "react";
import { microcopy } from "@/content/microcopy";

type Mode = "student" | "parent";

/**
 * Switches Home between loud (Student) and calm (Parent).
 * Both versions are in the HTML; this flips html[data-mode] and remembers the choice.
 */
export function ParentStudentToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("student");

  useEffect(() => {
    setMode(document.documentElement.getAttribute("data-mode") === "parent" ? "parent" : "student");
  }, []);

  const choose = (m: Mode) => {
    setMode(m);
    document.documentElement.setAttribute("data-mode", m);
    try {
      localStorage.setItem("bo_mode", m);
    } catch {
      /* not remembered, still switched */
    }
  };

  const t = microcopy.toggle;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-xs font-bold uppercase tracking-[0.18em]" id="mode-label">
        {t.label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby="mode-label"
        className="inline-flex rounded-full border-2 border-navy bg-offwhite p-1 shadow-hard-navy"
      >
        {(["student", "parent"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => choose(m)}
            className={`heavy min-h-10 rounded-full px-5 text-sm uppercase tracking-wide transition-colors ${
              mode === m ? "bg-navy text-offwhite" : "text-navy hover:bg-stone"
            }`}
          >
            {m === "student" ? t.student : t.parent}
          </button>
        ))}
      </div>
    </div>
  );
}
