import { comparison, tiers } from "@/content/pricing";
import { cn } from "@/lib/cn";

/**
 * Plan comparison. Sticky first column and horizontal scroll on mobile.
 * Checks and short text only, no paragraphs.
 *
 *   <ComparisonTable />
 */
export function ComparisonTable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative -mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) md:mx-0 md:px-0",
        className,
      )}
    >
      <table className="text-small w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">What each plan includes</caption>
        <thead>
          <tr className="border-ink border-b">
            <th scope="col" className="bg-paper sticky left-0 z-10 py-4 pr-4 font-normal">
              <span className="label text-muted">Plan</span>
            </th>
            {tiers.map((t) => (
              <th key={t.id} scope="col" className="px-4 py-4 align-bottom">
                <span className="font-display text-[1.5rem] leading-none font-normal">
                  {t.name}
                </span>
                {t.badge ? <span className="label text-muted mt-1 block">{t.badge}</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-rule border-b">
              <th
                scope="row"
                className="bg-paper sticky left-0 z-10 py-4 pr-4 font-semibold whitespace-nowrap"
              >
                {row.label}
              </th>
              {tiers.map((t) => {
                const v = row.values[t.id];
                return (
                  <td key={t.id} className={cn("px-4 py-4", t.badge && "bg-paper-2/60")}>
                    {v === true ? (
                      <span className="inline-flex items-center gap-2">
                        <svg viewBox="0 0 16 16" className="text-ink size-4" aria-hidden>
                          <path
                            d="m3 8.5 3 3L13 4.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="sr-only">Included</span>
                      </span>
                    ) : v === false ? (
                      <span className="text-muted">
                        <span aria-hidden>·</span>
                        <span className="sr-only">Not included</span>
                      </span>
                    ) : (
                      v
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
