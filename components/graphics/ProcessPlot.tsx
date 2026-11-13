import { EIGHT_PLOT } from "@/components/ui/Pixel";
import { cn } from "@/lib/cn";

/**
 * The big 8, plotted pixel by pixel as the Process section scrolls (CSS scroll timeline,
 * declared by `.plot-track` on the section). 22 pixels across Day 0 to Day 7; the last one,
 * launch, is the accent. Without scroll-timeline support it simply shows the finished 8.
 */
const START = 6; // % of the contain range where plotting begins
const SPAN = 80; // % of the range used for all 22 pixels

export function plotWindow(i: number, total = EIGHT_PLOT.length) {
  const a = START + (i / total) * SPAN;
  return { a, b: a + SPAN / total + 2 };
}

/** Which plot pixels belong to each day, for step and day-label timing. */
export const dayPixelRanges: [number, number][] = [
  [0, 1], // Day 0
  [2, 4], // Day 1
  [5, 7], // Day 2
  [8, 10], // Day 3
  [11, 13], // Day 4
  [14, 16], // Day 5
  [17, 19], // Day 6
  [20, 21], // Day 7
];

export function ProcessPlot({ className }: { className?: string }) {
  const last = EIGHT_PLOT.length - 1;
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="-0.5 -0.5 9 9"
        shapeRendering="crispEdges"
        className="h-auto w-full"
        role="img"
        aria-label="An 8 drawn on an 8 by 8 grid, plotted one pixel at a time from Day 0 to Day 7"
      >
        {/* the grid: one pattern instead of 64 elements */}
        <defs>
          <pattern id="plot-dots" width="1" height="1" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.045" className="fill-paper/30" />
          </pattern>
        </defs>
        <rect width="8" height="8" fill="url(#plot-dots)" shapeRendering="geometricPrecision" />
        {EIGHT_PLOT.map(([x, y], i) => {
          const { a, b } = plotWindow(i);
          return (
            <rect
              key={`${x}-${y}`}
              x={x + 0.04}
              y={y + 0.04}
              width={0.92}
              height={0.92}
              className={cn("plot-cell", i === last ? "fill-accent-on-dark" : "fill-paper")}
              style={{ "--a": `${a}%`, "--b": `${b}%` } as React.CSSProperties}
            />
          );
        })}
      </svg>

      {/* Day counter: one label per day, shown while that day's pixels are plotted */}
      <p className="label text-muted-dark absolute -bottom-2 left-0 grid translate-y-full">
        {dayPixelRanges.map(([from, to], d) => {
          const a = plotWindow(from).a;
          const b = d === 7 ? 100 : plotWindow(to).b;
          return (
            <span
              key={d}
              className={cn("plot-day col-start-1 row-start-1", d === 7 && "text-accent-on-dark")}
              style={{ "--a": `${a}%`, "--b": `${b}%` } as React.CSSProperties}
            >
              Day {d}
              {d === 7 ? " · live" : ""}
            </span>
          );
        })}
      </p>
    </div>
  );
}
