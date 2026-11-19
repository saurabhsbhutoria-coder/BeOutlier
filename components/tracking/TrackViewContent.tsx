"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/track";

/** Fires ViewContent once per landing page view, after the Pixel has had a moment to load. */
export function TrackViewContent({ programId, title }: { programId: string; title: string }) {
  useEffect(() => {
    const t = setTimeout(() => trackViewContent(programId, title), 1200);
    return () => clearTimeout(t);
  }, [programId, title]);
  return null;
}
