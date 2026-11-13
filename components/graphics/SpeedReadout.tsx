"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Problem 01. Measures THIS page on the visitor's own device and shows it against
 * Google's 2.5s "good" LCP line. Real data, not an illustration.
 * Uses Largest Contentful Paint where supported, else First Contentful Paint, and says which.
 */
type Reading = { seconds: number; metric: "LCP" | "FCP" } | null;

const SCALE = 5; // seconds across the bar
const CELLS = 20;

export function SpeedReadout() {
  const [reading, setReading] = useState<Reading>(null);

  useEffect(() => {
    let done = false;
    const finish = (ms: number, metric: "LCP" | "FCP") => {
      if (done) return;
      done = true;
      setReading({ seconds: Math.max(0.1, Math.round(ms / 100) / 10), metric });
    };
    let lcp = 0;
    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((list) => {
        const last = list.getEntries().at(-1);
        if (last) lcp = last.startTime;
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // not supported, fall through to FCP
    }
    const settle = () => {
      po?.disconnect();
      if (lcp > 0) return finish(lcp, "LCP");
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      if (fcp) finish(fcp.startTime, "FCP");
    };
    // LCP is final once the user interacts or after a short settle window.
    const t = window.setTimeout(settle, 1500);
    window.addEventListener("pointerdown", settle, { once: true });
    window.addEventListener("scroll", settle, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      po?.disconnect();
    };
  }, []);

  const filled = reading
    ? Math.min(CELLS, Math.max(1, Math.round((reading.seconds / SCALE) * CELLS)))
    : 0;
  const good = reading ? reading.seconds <= 2.5 : true;

  return (
    <div className="flex h-full flex-col">
      <p className="label text-muted">This page, on your phone</p>
      <p className="numeral mt-auto text-[2.6rem] leading-none" aria-live="polite">
        {reading ? (
          <>
            {reading.seconds.toFixed(1)}
            <span className="text-[1.4rem]">s</span>
          </>
        ) : (
          <span className="text-muted">··</span>
        )}
      </p>
      <div className="relative mt-4" aria-hidden>
        <div className="grid grid-cols-20 gap-[3px]">
          {Array.from({ length: CELLS }, (_, i) => (
            <span
              key={i}
              className={cn(
                "aspect-square transition-colors duration-300",
                i < filled
                  ? good
                    ? i === filled - 1
                      ? "bg-accent"
                      : "bg-ink"
                    : "bg-accent"
                  : "bg-paper-3",
              )}
              style={{ transitionDelay: `${i * 25}ms` }}
            />
          ))}
        </div>
        {/* Google's "good" threshold at 2.5s = the middle of the scale */}
        <span className="bg-ink absolute -top-1.5 -bottom-1.5 left-1/2 w-px" />
      </div>
      <div className="text-muted mt-2 flex justify-between text-[0.6875rem]">
        <span>0s</span>
        <span>Google&apos;s &ldquo;good&rdquo; line, 2.5s</span>
        <span>5s</span>
      </div>
      <p className="text-muted mt-3 text-[0.75rem]">
        {reading
          ? `Measured live${reading.metric === "FCP" ? " (first paint)" : ""}. Most slow sites land on the right.`
          : "Measuring on your device"}
      </p>
    </div>
  );
}
