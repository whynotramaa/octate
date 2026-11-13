/**
 * Pricing source of truth. Founding UI shows only when
 * enabled && slotsLeft > 0 && today < standardFrom (see lib/founding.ts).
 */
export const founding = {
  enabled: true,
  slotsTotal: 10,
  slotsLeft: 10, // update by hand
  standardFrom: "2027-01-01", // date standard prices begin
} as const;

export const regions = ["IN", "NP", "INTL"] as const;
export type Region = (typeof regions)[number];
export type RegionPrices = Record<Region, number>;

export type Tier = {
  id: "launch" | "signature" | "partner";
  name: string;
  tagline: string;
  badge?: string;
  founding?: RegionPrices;
  standard?: RegionPrices;
  priceLabel?: string;
  delivery: string;
  includes: readonly string[];
  excludes?: readonly string[];
  cta: string;
};

export const tiers: readonly Tier[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "A sharp one-page site that gets you calls.",
    founding: { IN: 14999, NP: 24999, INTL: 599 },
    standard: { IN: 17999, NP: 29499, INTL: 699 },
    delivery: "7 days",
    includes: [
      "One long page, up to 7 sections",
      "Studio design system in your brand colours",
      "Mobile-first, loads in under 2 seconds",
      "Call, WhatsApp and enquiry form buttons",
      "Google Business Profile setup",
      "Basic on-page SEO",
      "We polish the content you give us",
      "1 revision round",
      "1 month of free care after launch",
    ],
    excludes: ["Copywriting from scratch", "Online booking", "Ad creatives"],
    cta: "Start with Launch",
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "The full premium site, written and designed for you.",
    badge: "Most chosen",
    founding: { IN: 39999, NP: 64999, INTL: 1799 },
    standard: { IN: 47199, NP: 76699, INTL: 2099 },
    delivery: "14 days",
    includes: [
      "Up to 8 pages",
      "Custom design direction, not a template",
      "All copy written by us",
      "Online booking with instant lead alerts",
      "Local SEO pages for your top services",
      "Google Analytics and Search Console set up",
      "3 AI-made ad creatives for Instagram or Meta",
      "2 revision rounds",
      "3 months of free care after launch",
    ],
    excludes: ["Custom apps or tools", "Monthly ad creative packs"],
    cta: "Choose Signature",
  },
  {
    id: "partner",
    name: "Partner",
    tagline: "Your ongoing tech team for growth, apps and ads.",
    priceLabel: "Custom",
    delivery: "Ongoing",
    includes: [
      "Everything in Signature",
      "New landing pages for every campaign",
      "Monthly ad creative pack",
      "CRM, automations and integrations",
      "Custom apps and internal tools",
      "Monthly SEO work and a plain-English report",
      "Priority turnaround",
    ],
    cta: "Book a call",
  },
];

/** Rows for the comparison table on /pricing. true = check, false = dash, string = short text. */
export const comparison: readonly {
  label: string;
  values: Record<Tier["id"], string | boolean>;
}[] = [
  {
    label: "Pages",
    values: { launch: "1 long page", signature: "Up to 8", partner: "Unlimited campaigns" },
  },
  {
    label: "Design",
    values: { launch: "Studio system", signature: "Custom direction", partner: "Custom" },
  },
  { label: "Copywriting", values: { launch: "We polish yours", signature: true, partner: true } },
  {
    label: "Leads and booking",
    values: {
      launch: "Call, WhatsApp, form",
      signature: "Online booking + alerts",
      partner: "CRM + automations",
    },
  },
  {
    label: "Google setup",
    values: {
      launch: "Business Profile",
      signature: "Analytics + Search Console",
      partner: "Monthly SEO",
    },
  },
  {
    label: "Ad creatives",
    values: { launch: false, signature: "3 creatives", partner: "Monthly pack" },
  },
  { label: "Revisions", values: { launch: "1 round", signature: "2 rounds", partner: "Ongoing" } },
  { label: "Delivery", values: { launch: "7 days", signature: "14 days", partner: "Priority" } },
  { label: "Free care", values: { launch: "1 month", signature: "3 months", partner: "Included" } },
  { label: "Custom apps", values: { launch: false, signature: false, partner: true } },
];
