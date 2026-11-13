import { cn } from "@/lib/cn";

/**
 * Accordion built on native <details>: keyboard and screen reader support for free, zero JS.
 * Smooth open/close where the browser supports animating to `auto` (see globals.css).
 *
 *   <Accordion items={faqsByTag("home")} />
 *
 * Pair with FAQPage JSON-LD on the page (added in the SEO step).
 */
export function Accordion({
  items,
  onDark = false,
  name,
  className,
}: {
  items: readonly { q: string; a: React.ReactNode }[];
  onDark?: boolean;
  /** Same name = only one open at a time (exclusive accordion). */
  name?: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t", onDark ? "border-rule-dark" : "border-rule", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          name={name}
          className={cn("group border-b", onDark ? "border-rule-dark" : "border-rule")}
        >
          <summary
            className={cn(
              "flex cursor-pointer items-start justify-between gap-6 py-5 md:py-6",
              "transition-colors duration-(--duration-micro)",
              onDark ? "hover:text-accent-on-dark" : "hover:opacity-60",
            )}
          >
            <span className="flex gap-4 md:gap-6">
              <span
                className={cn(
                  "numeral pt-1.5 text-[0.75rem]",
                  onDark ? "text-muted-dark" : "text-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-h3">{item.q}</span>
            </span>
            <span
              aria-hidden
              className={cn(
                "relative mt-2 size-7 shrink-0 rounded-full transition-[rotate,background-color] duration-(--duration-base) ease-(--ease-out) group-open:rotate-45",
                onDark
                  ? "shadow-[inset_0_0_0_1px_var(--color-rule-dark)]"
                  : "shadow-[inset_0_0_0_1px_var(--color-rule)]",
              )}
            >
              <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-current" />
              <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-current" />
            </span>
          </summary>
          <div
            className={cn(
              "max-w-[62ch] pb-7 pl-9 md:pl-12",
              onDark ? "text-muted-dark" : "text-muted",
            )}
          >
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
