"use client";

import { useLoadTime } from "@/lib/useLoadTime";

/**
 * Live, measured pieces. Both show THIS page's load time on the visitor's own device.
 */

/** Ring gauge for the blue "Engineers" card. Full ring = 5s; Google's "good" line is 2.5s. */
export function SpeedGauge() {
  const r = useLoadTime();
  const C = 2 * Math.PI * 42;
  const frac = r ? Math.min(1, r.seconds / 5) : 0;
  const good = r ? r.seconds <= 2.5 : true;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="size-24 shrink-0 -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E7E7E3" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={good ? "#1F9D55" : "#E8505B"}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${C * frac} ${C}`}
          style={{ transition: "stroke-dasharray 900ms cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
      <div>
        <p className="text-[0.75rem] text-[#63625E]">This page, on your phone</p>
        <p
          className="mt-1 text-[2rem] leading-none font-semibold tracking-[-0.03em]"
          aria-live="polite"
        >
          {r ? `${r.seconds.toFixed(1)}s` : "··"}
        </p>
        <p className="mt-1.5 text-[0.75rem] text-[#63625E]">
          Google&apos;s &ldquo;good&rdquo; line: 2.5s
        </p>
      </div>
    </div>
  );
}

/* Radar line work, precomputed as three paths (instead of 144 elements). */
const f = (n: number) => n.toFixed(2);
const seg = (a: number, r1: number, r2: number) =>
  `M${f(Math.cos(a) * r1)} ${f(Math.sin(a) * r1)}L${f(Math.cos(a) * r2)} ${f(Math.sin(a) * r2)}`;
const TICKS_LONG = Array.from({ length: 12 }, (_, i) => seg((i / 12) * Math.PI * 2, 78, 92)).join(
  "",
);
const TICKS_SHORT = Array.from({ length: 96 }, (_, i) => i)
  .filter((i) => i % 8 !== 0)
  .map((i) => seg((i / 96) * Math.PI * 2, 84, 92))
  .join("");
const BURST = Array.from({ length: 48 }, (_, i) =>
  seg((i / 48) * Math.PI * 2, 4, i % 2 ? 26 : 40),
).join("");

/**
 * Radar for the Speed section. Load time maps to angle (0s at the top, 5s all the way round),
 * so the lime dot lands where this page's real load time does. Google's 2.5s line sits at 180°.
 */
export function SpeedRadar() {
  const r = useLoadTime();
  const sec = r ? Math.min(5, r.seconds) : 0;
  const angle = (sec / 5) * 360; // clockwise from top
  const rad = ((angle - 90) * Math.PI) / 180;
  const R = 92;
  const dx = Math.cos(rad) * R;
  const dy = Math.sin(rad) * R;
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <svg viewBox="-120 -120 240 240" className="h-full w-full" aria-hidden>
        <path d={TICKS_LONG} stroke="#F4F4F0" strokeOpacity="0.55" strokeWidth="0.9" />
        <path d={TICKS_SHORT} stroke="#F4F4F0" strokeOpacity="0.18" strokeWidth="0.6" />
        <path d={BURST} stroke="#F4F4F0" strokeOpacity="0.28" strokeWidth="0.5" />
        <circle r="60" fill="none" stroke="#F4F4F0" strokeOpacity="0.08" />
        <circle r="92" fill="none" stroke="#F4F4F0" strokeOpacity="0.1" />
        {/* Google's 2.5s "good" line at 180° */}
        <line
          x1="0"
          y1="64"
          x2="0"
          y2="100"
          stroke="#F4F4F0"
          strokeOpacity="0.6"
          strokeDasharray="1.5 2"
        />
        {/* sweep */}
        <g className="radar-sweep">
          <path d="M0 0 L0 -92 A92 92 0 0 1 32 -86 Z" fill="url(#sweep)" />
        </g>
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D4FF3A" stopOpacity="0" />
            <stop offset="1" stopColor="#D4FF3A" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {/* this page */}
        {r ? (
          <g style={{ transition: "opacity 400ms" }}>
            <line
              x1="0"
              y1="0"
              x2={dx}
              y2={dy}
              stroke="#F4F4F0"
              strokeWidth="0.8"
              strokeDasharray="2 2.4"
            />
            <circle cx={dx} cy={dy} r="5.5" fill="#D4FF3A" />
            <circle cx={dx} cy={dy} r="5.5" fill="none" stroke="#D4FF3A" className="radar-ping" />
          </g>
        ) : null}
      </svg>
      {/* scale labels */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[0.6875rem] text-[#9B9A95]">
        0s
      </span>
      <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[0.6875rem] text-[#9B9A95]">
        1.25s
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.6875rem] text-[#9B9A95]">
        2.5s · good
      </span>
      <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[0.6875rem] text-[#9B9A95]">
        3.75s
      </span>
      <figcaption className="sr-only">
        {r
          ? `This page loaded in ${r.seconds.toFixed(1)} seconds on your device.`
          : "Measuring this page on your device."}
      </figcaption>
      {r ? (
        <p
          className="absolute rounded-full bg-[#D4FF3A] px-2.5 py-1 text-[0.75rem] font-semibold text-[#0B0B0B]"
          style={{
            left: `calc(50% + ${(dx / 240) * 100}% + 14px)`,
            top: `calc(50% + ${(dy / 240) * 100}% - 12px)`,
          }}
        >
          This page · {r.seconds.toFixed(1)}s
        </p>
      ) : null}
    </figure>
  );
}
