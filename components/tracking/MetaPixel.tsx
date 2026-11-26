"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/track";

/**
 * The Meta Pixel base code lives in <head> (app/layout.tsx, lib/pixel.ts) and
 * sends the first PageView. This only adds a PageView on each later client
 * side route change, so no page is counted twice.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
