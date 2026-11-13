/**
 * Studio concept sites, drawn in HTML so they stay crisp inside device mockups and cost no image bytes.
 * All styling lives in CSS (.cs-* in globals.css), themed by data attributes, sized in container
 * query units. Keeping it out of inline styles keeps the page's hydration payload small.
 * These are CONCEPTS: anything showing them must carry a Concept tag.
 */
export type ConceptId = "skin" | "spa" | "dental";

const copy: Record<
  ConceptId,
  { brand: string; city: string; headline: string; sub: string; cta: string; chips: string[] }
> = {
  skin: {
    brand: "ananda skin",
    city: "Kathmandu",
    headline: "Clear skin, honest advice.",
    sub: "Dermatology clinic in Lazimpat. Same-week appointments.",
    cta: "Book a consult",
    chips: ["Acne", "Pigmentation", "Laser"],
  },
  spa: {
    brand: "Halcyon",
    city: "Austin",
    headline: "Quiet results. Real expertise.",
    sub: "Injectables and skin treatments by licensed nurse injectors.",
    cta: "Reserve a visit",
    chips: ["Tox", "Filler", "Facials"],
  },
  dental: {
    brand: "Smile Studio",
    city: "Pune",
    headline: "Dentistry that doesn't hurt to book.",
    sub: "Family and cosmetic dentistry in Baner. Open Sundays.",
    cta: "Book on WhatsApp",
    chips: ["Aligners", "Implants", "Kids"],
  },
};

export function ConceptScreen({
  id,
  layout = "mobile",
}: {
  id: ConceptId;
  layout?: "mobile" | "desktop";
}) {
  const t = copy[id];
  const mobile = layout === "mobile";
  return (
    <div aria-hidden className="cs" data-concept={id} data-layout={layout}>
      <div className="cs-nav">
        <span className="cs-brand">{t.brand}</span>
        {mobile ? (
          <span className="cs-burger">
            <i />
            <i />
          </span>
        ) : (
          <span className="cs-links">
            <span>Treatments</span>
            <span>Doctors</span>
            <span>Prices</span>
            <span className="cs-btn">{t.cta}</span>
          </span>
        )}
      </div>
      <div className="cs-hero">
        <div className="cs-arch">
          <i />
          <i />
          <span>{t.city}</span>
        </div>
        <div className="cs-copy">
          <p className="cs-h">{t.headline}</p>
          <p className="cs-sub">{t.sub}</p>
          <span className="cs-btn">{t.cta}</span>
          <span className="cs-chips">
            {t.chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </span>
        </div>
      </div>
      {mobile ? (
        <div className="cs-bar">
          <span>Call</span>
          <span>WhatsApp us</span>
        </div>
      ) : null}
    </div>
  );
}
