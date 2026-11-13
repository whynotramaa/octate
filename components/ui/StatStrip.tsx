import { stats as defaultStats } from "@/content/stats";
import { cn } from "@/lib/cn";

/**
 * Four stats in a row (2x2 on mobile), wide Coconat numerals, hairline rules between.
 * Always reads from content/stats.ts unless a list is passed in.
 *   <StatStrip />
 */
export function StatStrip({
  items = defaultStats,
  onDark = false,
  className,
}: {
  items?: readonly { value: string; label: string }[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-y lg:grid-cols-4",
        onDark ? "border-rule-dark" : "border-rule",
        className,
      )}
    >
      {items.map((s, i) => (
        <div
          key={s.label}
          data-reveal
          style={{ "--reveal-i": i } as React.CSSProperties}
          className={cn(
            "flex flex-col-reverse gap-3 px-1 py-7 sm:px-5 md:py-9",
            // vertical rules between columns, horizontal rule between mobile rows
            i % 2 === 1 &&
              (onDark ? "border-rule-dark border-l pl-5" : "border-rule border-l pl-5"),
            i >= 2 &&
              (onDark
                ? "border-rule-dark border-t lg:border-t-0"
                : "border-rule border-t lg:border-t-0"),
            i === 2 && (onDark ? "lg:border-rule-dark lg:border-l" : "lg:border-rule lg:border-l"),
          )}
        >
          <dt className={cn("text-small max-w-[18ch]", onDark ? "text-muted-dark" : "text-muted")}>
            {s.label}
          </dt>
          <dd className="numeral text-number whitespace-nowrap">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
