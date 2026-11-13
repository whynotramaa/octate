import { regions, type Region, type RegionPrices } from "@/content/pricing";
import { formatPrice, priceParts } from "@/lib/format";

/**
 * Region-aware price. Server renders all three; CSS shows the one matching
 * <html data-region>, which is set before first paint. No flash, no layout shift,
 * and crawlers see every price.
 *
 *   <Price prices={tier.founding} display />       // big: serif numerals, small raised symbol
 *   <Price prices={tier.standard} />               // inline, inside running text
 *   <Price prices={tier.founding} lock="INTL" />   // /med-spa
 */
function One({ amount, region, display }: { amount: number; region: Region; display: boolean }) {
  if (!display) return <>{formatPrice(amount, region)}</>;
  const { symbol, number } = priceParts(amount, region);
  return (
    <span className="price-display">
      <span className="price-sym">{symbol}</span>
      {number}
    </span>
  );
}

export function Price({
  prices,
  lock,
  display = false,
  className,
}: {
  prices: RegionPrices;
  lock?: Region;
  display?: boolean;
  className?: string;
}) {
  if (lock)
    return (
      <span className={className}>
        <One amount={prices[lock]} region={lock} display={display} />
      </span>
    );
  return (
    <span className={className}>
      {regions.map((r) => (
        <span key={r} data-price-region={r}>
          <One amount={prices[r]} region={r} display={display} />
        </span>
      ))}
    </span>
  );
}
