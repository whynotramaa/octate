import { founding as foundingConfig } from "../content/pricing.ts";

type FoundingConfig = {
  enabled: boolean;
  slotsTotal: number;
  slotsLeft: number;
  standardFrom: string;
};

/**
 * Founding UI shows only if enabled && slotsLeft > 0 && today < standardFrom.
 * Pages that use this set `revalidate` so the UI disappears on its own after the date passes.
 */
export function isFoundingActive(
  config: FoundingConfig = foundingConfig,
  now: Date = new Date(),
): boolean {
  if (!config.enabled || config.slotsLeft <= 0) return false;
  const cutoff = new Date(`${config.standardFrom}T00:00:00Z`);
  return now.getTime() < cutoff.getTime();
}
