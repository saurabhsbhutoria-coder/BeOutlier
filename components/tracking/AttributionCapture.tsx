"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/** Renders nothing. Saves UTMs, fbclid and referrer for the session. */
export function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      captureAttribution();
    } catch {
      /* never break the page */
    }
  }, [pathname]);
  return null;
}
