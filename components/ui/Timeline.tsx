import { cn } from "@/lib/cn";

/**
 * Timeline built on the octate system: eight dots, Day 0 to Day 7.
 * The last dot (launch) carries the accent, same as the full stop in the logo.
 * Horizontal on desktop, vertical on mobile.
 *
 *   <Timeline steps={processSteps} onDark />
 */
export type TimelineStep = { day: string; title: string; body: string; span: [number, number] };

export const processSteps: TimelineStep[] = [
  {
    day: "Day 0",
    title: "Call",
    body: "15 minutes. We learn your business and goals.",
    span: [0, 0],
  },
  {
    day: "Day 1",
    title: "Brief",
    body: "You send logo, photos and services. We send a one-page plan and a fixed quote.",
    span: [1, 1],
  },
  {
    day: "Day 2 to 6",
    title: "Build",
    body: "We design and build. You get a live preview link to review on your phone.",
    span: [2, 6],
  },
  {
    day: "Day 7",
    title: "Launch",
    body: "We go live, connect Google, and hand over everything. Free care starts.",
    span: [7, 7],
  },
];

export function EightDots({
  active = 7,
  range,
  onDark = false,
  className,
  size = "md",
}: {
  /** Dots up to this index are filled. */
  active?: number;
  /** Fill only the dots inside [from, to]; overrides `active`. */
  range?: [number, number];
  onDark?: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex items-center", size === "sm" ? "gap-1" : "gap-1.5", className)}
    >
      {Array.from({ length: 8 }, (_, i) => {
        const on = range ? i >= range[0] && i <= range[1] : i <= active;
        return (
          <span
            key={i}
            className={cn(
              "rounded-full",
              size === "sm" ? "size-1.5" : "size-2",
              i === 7
                ? on
                  ? onDark
                    ? "bg-accent-on-dark"
                    : "bg-ink"
                  : "border border-current opacity-50"
                : on
                  ? "bg-current"
                  : "border border-current opacity-40",
            )}
          />
        );
      })}
    </span>
  );
}

export function Timeline({
  steps = processSteps,
  onDark = false,
}: {
  steps?: TimelineStep[];
  onDark?: boolean;
}) {
  const muted = onDark ? "text-muted-dark" : "text-muted";
  const rule = onDark ? "bg-rule-dark" : "bg-rule";
  return (
    <div>
      {/* Desktop: the 8-dot rail, then four steps, each marking the days it covers */}
      <div className="hidden lg:block">
        <div className="relative grid grid-cols-8">
          <span
            aria-hidden
            className={cn("absolute top-[5px] right-[6.25%] left-[6.25%] h-px", rule)}
          />
          {Array.from({ length: 8 }, (_, d) => (
            <div key={d} className="relative flex flex-col items-center gap-3">
              <span
                aria-hidden
                className={cn(
                  "relative size-[11px] rounded-full",
                  d === 7
                    ? onDark
                      ? "bg-accent-on-dark"
                      : "bg-ink"
                    : onDark
                      ? "bg-paper"
                      : "bg-ink",
                )}
              />
              <span className={cn("label", muted)}>{`D${d}`}</span>
            </div>
          ))}
        </div>
        <ol className="mt-10 grid grid-cols-4 gap-x-8">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className={cn("border-t pt-5", onDark ? "border-rule-dark" : "border-rule")}
            >
              <EightDots
                range={s.span}
                size="sm"
                onDark={onDark}
                className={onDark ? "text-paper" : "text-ink"}
              />
              <p className={cn("label mt-4", muted)}>{s.day}</p>
              <h3 className="text-h3 mt-2">{s.title}</h3>
              <p className={cn("text-small mt-2 max-w-[30ch]", muted)}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile and tablet: vertical rail */}
      <ol className="relative lg:hidden">
        <span aria-hidden className={cn("absolute top-2 bottom-2 left-[5px] w-px", rule)} />
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            style={{ "--reveal-i": i } as React.CSSProperties}
            className="relative pb-10 pl-9 last:pb-0"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 left-0 size-[11px] rounded-full",
                i === steps.length - 1
                  ? onDark
                    ? "bg-accent-on-dark"
                    : "bg-ink"
                  : onDark
                    ? "bg-paper"
                    : "bg-ink",
              )}
            />
            <p className={cn("label", muted)}>{s.day}</p>
            <h3 className="text-h3 mt-1.5">{s.title}</h3>
            <p className={cn("mt-2 max-w-[44ch]", muted)}>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
