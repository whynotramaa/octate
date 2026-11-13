"use client";

import { regions, type Region } from "@/content/pricing";
import { persistRegion, regionLabels } from "@/lib/region";
import { cn } from "@/lib/cn";

/**
 * Region pill: India ₹ | Nepal रू | International $.
 * The active state is pure CSS (follows <html data-region>), so the server HTML is correct
 * and the only JS is the click handler.
 *
 *   <RegionToggle />
 */
export function RegionToggle({ className }: { className?: string }) {
  function choose(r: Region) {
    persistRegion(r);
    // Analytics listener picks this up in the analytics step.
    window.dispatchEvent(
      new CustomEvent("octate:track", { detail: { event: "region_change", region: r } }),
    );
  }
  return (
    <div
      role="group"
      aria-label="Show prices for"
      className={cn("bg-paper shadow-hairline inline-flex rounded-full p-1", className)}
    >
      {regions.map((r) => (
        <button
          key={r}
          type="button"
          data-region-option={r}
          onClick={() => choose(r)}
          className="hover:bg-paper-2 rounded-full px-3.5 py-2 text-[0.875rem] font-semibold transition-colors duration-(--duration-base) ease-(--ease-out) sm:px-4"
        >
          {regionLabels[r].name} <span className="font-normal">{regionLabels[r].symbol}</span>
        </button>
      ))}
    </div>
  );
}
