import { regions, type Region, type RegionPrices } from "@/content/pricing";
import { formatPrice } from "@/lib/format";

/**
 * Region-aware price. Server renders all three; CSS shows the one matching
 * <html data-region>, which is set before first paint. No flash, no layout shift,
 * and crawlers see every price.
 *
 *   <Price prices={tier.founding} />            // follows the visitor's region
 *   <Price prices={tier.founding} lock="INTL" />  // /med-spa
 */
export function Price({
  prices,
  lock,
  className,
}: {
  prices: RegionPrices;
  lock?: Region;
  className?: string;
}) {
  if (lock) return <span className={className}>{formatPrice(prices[lock], lock)}</span>;
  return (
    <span className={className}>
      {regions.map((r) => (
        <span key={r} data-price-region={r}>
          {formatPrice(prices[r], r)}
        </span>
      ))}
    </span>
  );
}
