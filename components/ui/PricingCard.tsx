import { founding, type Region, type Tier } from "@/content/pricing";
import { isFoundingActive } from "@/lib/founding";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { ButtonLink } from "./Button";
import { Badge } from "./Tag";
import { Price } from "./Price";

/**
 * Pricing card. Founding price large, standard rate as plain small text under it
 * (never a strikethrough). After founding ends, only the standard price shows.
 *
 *   <PricingCard tier={tier} />                    // full list (pricing page)
 *   <PricingCard tier={tier} compact />            // top 3 includes (home offer)
 *   <PricingCard tier={tier} lock="INTL" />        // region-locked landing pages
 */
export function PricingCard({
  tier,
  compact = false,
  lock,
  now,
  href,
  className,
}: {
  tier: Tier;
  compact?: boolean;
  lock?: Region;
  now?: Date;
  href?: string;
  className?: string;
}) {
  const active = isFoundingActive(founding, now);
  const featured = Boolean(tier.badge);
  const main = active ? tier.founding : tier.standard;
  const includes = compact ? tier.includes.slice(0, 3) : tier.includes;
  const ctaHref = href ?? (tier.id === "partner" ? site.calLink : `/contact?plan=${tier.id}`);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-lg p-6 md:p-8",
        featured ? "bg-ink text-paper on-dark" : "bg-paper shadow-hairline",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-h3">{tier.name}</h3>
        {tier.badge ? (
          <Badge className={featured ? "bg-accent-on-dark text-ink" : ""}>{tier.badge}</Badge>
        ) : null}
      </header>
      <p className={cn("mt-2 max-w-[34ch]", featured ? "text-muted-dark" : "text-muted")}>
        {tier.tagline}
      </p>

      <div className="mt-8">
        {main ? (
          <>
            <p className="flex items-baseline gap-2">
              {compact ? (
                <span className={cn("text-small", featured ? "text-muted-dark" : "text-muted")}>
                  from
                </span>
              ) : null}
              <Price
                prices={main}
                lock={lock}
                className="numeral text-[2.5rem] leading-none md:text-[2.75rem]"
              />
            </p>
            {active && tier.standard ? (
              <p className={cn("text-small mt-2", featured ? "text-muted-dark" : "text-muted")}>
                Standard rate <Price prices={tier.standard} lock={lock} /> from{" "}
                {formatDate(founding.standardFrom)}
              </p>
            ) : null}
          </>
        ) : (
          <p className="numeral text-[2.5rem] leading-none md:text-[2.75rem]">{tier.priceLabel}</p>
        )}
        <p className={cn("label mt-4", featured ? "text-muted-dark" : "text-muted")}>
          Delivery · {tier.delivery}
        </p>
      </div>

      <ul
        className={cn(
          "mt-7 flex-1 space-y-2.5 border-t pt-6",
          featured ? "border-rule-dark" : "border-rule",
        )}
      >
        {includes.map((item) => (
          <li key={item} className="text-small flex gap-3">
            <span
              aria-hidden
              className={cn(
                "mt-[0.55em] size-1.5 shrink-0 rounded-full",
                featured ? "bg-accent-on-dark" : "bg-accent",
              )}
            />
            {item}
          </li>
        ))}
      </ul>

      {!compact && tier.excludes?.length ? (
        <div className={cn("text-small mt-6", featured ? "text-muted-dark" : "text-muted")}>
          <p className="label">Not included</p>
          <p className="mt-2">{tier.excludes.join(" · ")}</p>
        </div>
      ) : null}

      <ButtonLink
        href={ctaHref}
        variant={featured ? "primary-dark" : tier.id === "partner" ? "secondary" : "primary"}
        size="lg"
        arrow
        className="mt-8 w-full"
        track={tier.id === "partner" ? "cta_book_call" : "cta_pricing"}
        trackProps={{ tier: tier.id }}
      >
        {tier.cta}
      </ButtonLink>
    </article>
  );
}
