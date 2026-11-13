import { cn } from "@/lib/cn";

/**
 * The octate full stop: a small ring sitting on a filled dot. Read together, an 8.
 * Usage: <Wordmark /> in header/footer, <Mark /> for favicon-like spots.
 *
 * The bottom dot is the "Day 7, live" dot from the process system, so it carries the accent.
 */
function FullStop({ onDark = false }: { onDark?: boolean }) {
  return (
    <svg
      viewBox="0 0 10 18"
      aria-hidden
      className="ml-[0.04em] inline-block h-[0.36em] w-[0.2em] shrink-0 self-baseline"
    >
      <circle cx="5" cy="4.1" r="2.85" fill="none" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="5" cy="13.4" r="3.9" className={onDark ? "fill-accent-on-dark" : "fill-accent"} />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  /** Show the small "studio" label next to the wordmark. */
  withStudio?: boolean;
  onDark?: boolean;
};

export function Wordmark({ className, withStudio = false, onDark = false }: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-2 leading-none", className)}
      aria-label="octate studio"
      role="img"
    >
      <span className="font-display inline-flex items-baseline tracking-[-0.02em]">
        octate
        <FullStop onDark={onDark} />
      </span>
      {withStudio ? (
        <span className={cn("label text-[0.32em]", onDark ? "text-muted-dark" : "text-muted")}>
          studio
        </span>
      ) : null}
    </span>
  );
}

/** Standalone mark: the full stop, zoomed. Used for favicon, avatar and small badges. */
export function Mark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <circle cx="16" cy="9.6" r="5.4" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="16" cy="22.2" r="7" className={onDark ? "fill-accent-on-dark" : "fill-accent"} />
    </svg>
  );
}
