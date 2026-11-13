import { site } from "@/content/site";
import type { Faq } from "@/content/faq";

/** Structured data helpers. Rendered as <script type="application/ld+json"> by <JsonLd />. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        email: site.email,
        sameAs: [site.instagram, site.linkedin, site.github],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        email: site.email,
        image: `${site.url}/opengraph-image`,
        description:
          "Premium websites for clinics, med spas and local brands. Designed with care, built fast, live in 7 days at a fixed price.",
        areaServed: ["IN", "NP", "US", "GB", "AU"].map((c) => ({ "@type": "Country", name: c })),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city.split(",")[0],
          addressCountry: "IN",
        },
        parentOrganization: { "@id": `${site.url}/#org` },
        knowsAbout: ["Web design", "Website development", "Local SEO", "Ad creatives"],
      },
    ],
  };
}

export function faqLd(items: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
