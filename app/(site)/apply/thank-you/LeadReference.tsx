"use client";

import { useEffect, useState } from "react";

/** Shows the reference id of the lead just submitted, if this browser has it. */
export function LeadReference({ label }: { label: string }) {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bo_last_lead");
      if (raw) setId(JSON.parse(raw).leadId ?? null);
    } catch {
      /* ignore */
    }
  }, []);
  if (!id) return null;
  return (
    <p className="label mt-10 text-bone/60">
      {label}: <span className="whitespace-nowrap text-mint">{id}</span>
    </p>
  );
}
