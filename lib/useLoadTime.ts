"use client";

import { useEffect, useState } from "react";

export type LoadReading = { seconds: number; metric: "LCP" | "FCP" } | null;

/**
 * This page's real load time on the visitor's device: Largest Contentful Paint where the
 * browser supports it, else First Contentful Paint. Settles on first interaction or after 1.5s.
 */
export function useLoadTime(): LoadReading {
  const [reading, setReading] = useState<LoadReading>(null);
  useEffect(() => {
    let done = false;
    let lcp = 0;
    let po: PerformanceObserver | undefined;
    const finish = (ms: number, metric: "LCP" | "FCP") => {
      if (done) return;
      done = true;
      setReading({ seconds: Math.max(0.1, Math.round(ms / 100) / 10), metric });
    };
    try {
      po = new PerformanceObserver((list) => {
        const last = list.getEntries().at(-1);
        if (last) lcp = last.startTime;
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // unsupported: fall back to FCP below
    }
    const settle = () => {
      po?.disconnect();
      if (lcp > 0) return finish(lcp, "LCP");
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      if (fcp) finish(fcp.startTime, "FCP");
    };
    const t = window.setTimeout(settle, 1500);
    window.addEventListener("pointerdown", settle, { once: true });
    window.addEventListener("scroll", settle, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      po?.disconnect();
    };
  }, []);
  return reading;
}
