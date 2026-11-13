import { founding } from "@/content/pricing";
import { isFoundingActive } from "@/lib/founding";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Founding banner. Renders nothing once founding is over (see lib/founding.ts).
 * The seats are real: filled = taken, hollow = open, straight from content/pricing.ts.
 *
 *   <FoundingBanner />
 */
export function FoundingBanner({ className, now }: { className?: string; now?: Date }) {
  if (!isFoundingActive(founding, now)) return null;
  const taken = founding.slotsTotal - founding.slotsLeft;
  return (
    <div
      className={cn(
        "bg-accent text-paper flex flex-col gap-4 rounded-lg px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7",
        className,
      )}
    >
      <p className="font-semibold">
        Founding rate <span aria-hidden>·</span> first {founding.slotsTotal} clients{" "}
        <span aria-hidden>·</span>{" "}
        <span className="numeral">
          {founding.slotsLeft} of {founding.slotsTotal}
        </span>{" "}
        left
      </p>
      <div className="flex items-center gap-4">
        <span
          role="img"
          aria-label={`${taken} of ${founding.slotsTotal} founding seats taken`}
          className="flex gap-1.5"
        >
          {Array.from({ length: founding.slotsTotal }, (_, i) => (
            <span
              key={i}
              className={cn(
                "size-2.5 rounded-full",
                i < taken ? "bg-paper" : "border-paper/70 border",
              )}
            />
          ))}
        </span>
        <span className="label text-paper/80">Until {formatDate(founding.standardFrom)}</span>
      </div>
    </div>
  );
}
