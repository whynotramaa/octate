import type { Region } from "@/content/pricing";

/** Currency formatting per region. INR uses Indian digit grouping (1,00,000). */
export function formatPrice(amount: number, region: Region): string {
  switch (region) {
    case "IN":
      return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
    case "NP":
      // Nepali rupee shown with the local symbol and Indian-style grouping.
      return `रू${new Intl.NumberFormat("en-IN").format(amount)}`;
    case "INTL":
      return `$${new Intl.NumberFormat("en-US").format(amount)}`;
  }
}

/** Symbol and number separately, for display prices where the symbol is set small and raised. */
export function priceParts(amount: number, region: Region): { symbol: string; number: string } {
  const full = formatPrice(amount, region);
  const symbol = region === "IN" ? "₹" : region === "NP" ? "रू" : "$";
  return { symbol, number: full.slice(symbol.length) };
}

/** "2027-01-01" -> "Jan 1, 2027" (fixed locale and zone so server and client agree). */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
