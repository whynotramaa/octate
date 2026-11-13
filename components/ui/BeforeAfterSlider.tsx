"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Before/after comparison. A native range input drives it, so keyboard and screen readers
 * work out of the box (arrow keys move the divider).
 *
 *   <BeforeAfterSlider before={<Image .../>} after={<Image .../>} label="Homepage redesign" />
 */
export function BeforeAfterSlider({
  before,
  after,
  label,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  label: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className={cn("relative", className)}>
      <div className="bg-paper-2 relative aspect-[4/3] overflow-hidden rounded-lg select-none">
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before}
        </div>
        <span className="label bg-ink/85 text-paper absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6875rem]">
          {beforeLabel}
        </span>
        <span className="label bg-paper/90 text-ink absolute top-3 right-3 rounded-full px-2.5 py-1 text-[0.6875rem]">
          {afterLabel}
        </span>
        <div
          aria-hidden
          className="bg-paper pointer-events-none absolute inset-y-0 w-px"
          style={{ left: `${pos}%` }}
        >
          <span className="bg-paper text-ink shadow-lift absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-full">
            <svg viewBox="0 0 20 20" className="size-5">
              <path
                d="M7 5 2.5 10 7 15M13 5l4.5 5-4.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          {label}: drag to compare {beforeLabel.toLowerCase()} and {afterLabel.toLowerCase()}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="label text-muted mt-3">{label}</figcaption>
    </figure>
  );
}
