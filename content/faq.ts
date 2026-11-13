import { founding, tiers } from "./pricing.ts";
import { formatDate, formatPrice } from "../lib/format.ts";

export type FaqTag = "home" | "pricing" | "medspa" | "clinics";
export type Faq = { q: string; a: string; tags: readonly FaqTag[] };

const launch = tiers.find((t) => t.id === "launch");
const signature = tiers.find((t) => t.id === "signature");

// Prices in answers are built from pricing.ts so no number is hard-coded here.
const launchStandard = launch?.standard
  ? `${formatPrice(launch.standard.IN, "IN")}, ${formatPrice(launch.standard.NP, "NP")} or ${formatPrice(launch.standard.INTL, "INTL")}`
  : "";
const usdLaunch = launch?.founding ? formatPrice(launch.founding.INTL, "INTL") : "";
const usdSignature = signature?.founding ? formatPrice(signature.founding.INTL, "INTL") : "";

export const faqs: readonly Faq[] = [
  // Home
  {
    q: "We already have a website. Why change?",
    a: "Most sites we see are slow on mobile, hard to book from, or look dated next to competitors. We'll show you exactly what to fix on a free call. If yours is fine, we'll say so.",
    tags: ["home"],
  },
  {
    q: "Why is it faster than other agencies?",
    a: "We use AI tools for the repetitive build work and spend our time on design, copy and testing. Same quality bar, much less waiting.",
    tags: ["home"],
  },
  {
    q: "Who owns the website?",
    a: "You do. Domain, code, content and logins are handed over at launch.",
    tags: ["home", "clinics"],
  },
  {
    q: "What do I need to give you?",
    a: "Your logo, some photos, your services and prices, and 15 minutes for a call. We handle the rest.",
    tags: ["home"],
  },
  {
    q: "What if I want changes later?",
    a: "Every plan includes free care after launch. After that, you can pay per change or move to a Partner plan.",
    tags: ["home"],
  },
  {
    q: "How do payments work?",
    a: "50% to start, 50% after you approve the final site. UPI and bank transfer in India and Nepal, international transfer abroad.",
    tags: ["home"],
  },
  {
    q: "Can you make ads and creatives too?",
    a: "Yes. Signature includes 3 ad creatives, and Partner includes a monthly pack. Our creatives are AI-assisted and we label them that way.",
    tags: ["home"],
  },
  {
    q: "Do you work outside India?",
    a: "Yes. We work with businesses in India and Nepal, and with med spas in the US, UK and Australia.",
    tags: ["home"],
  },

  // Pricing
  {
    q: "Is the founding rate real?",
    a: `Yes. It applies to our first ${founding.slotsTotal} clients. From ${formatDate(founding.standardFrom)}, standard prices apply: Launch becomes ${launchStandard}.`,
    tags: ["pricing"],
  },
  {
    q: "What is the difference between Launch and Signature?",
    a: "Launch is one long page with up to 7 sections. Signature is up to 8 pages, with copywriting, online booking, local SEO pages, analytics and ad creatives included.",
    tags: ["pricing"],
  },
  {
    q: "What if I don't like the final site?",
    a: "You don't pay the second half until you approve it. Revision rounds are included: 1 on Launch, 2 on Signature.",
    tags: ["pricing"],
  },
  {
    q: "What does Partner cost?",
    a: "It's custom, because every business needs something different. Tell us what you need and we'll quote a fixed monthly price.",
    tags: ["pricing"],
  },

  // Med spa
  // TODO(owner): list supported booking tools once confirmed.
  {
    q: "Can you connect our booking software?",
    a: "Usually, yes. Most med spa booking tools offer an embed or a booking link, and we design the site around it. Tell us which one you use on the call.",
    tags: ["medspa"],
  },
  {
    q: "How do you handle before-and-after photos?",
    a: "We only use photos you provide with your patients' consent. We design the gallery; you stay in control of what goes in it.",
    tags: ["medspa"],
  },
  {
    q: "Do you work with our time zone?",
    a: "Yes. We schedule calls in your business hours and send updates you can review on your phone whenever suits you.",
    tags: ["medspa"],
  },
  {
    q: "How do we pay from the US or UK?",
    a: `By international bank transfer, in USD. Launch starts at ${usdLaunch} and Signature at ${usdSignature}. 50% to start, 50% only after you approve the final site.`,
    tags: ["medspa"],
  },

  // Clinics
  // TODO(owner): confirm the exact WhatsApp booking flow offered.
  {
    q: "Can patients book on WhatsApp?",
    a: "Yes. Every site gets a one-tap WhatsApp button so patients can message your clinic straight from their phone.",
    tags: ["clinics"],
  },
  // TODO(owner): confirm whether Hindi pages are in Launch or Signature.
  {
    q: "Can the site be in Hindi?",
    a: "Yes. We can add Hindi pages alongside English.",
    tags: ["clinics"],
  },
  {
    q: "Can I pay by UPI?",
    a: "Yes. UPI or bank transfer. 50% to start, and 50% only after you approve the final site.",
    tags: ["clinics"],
  },
];

export function faqsByTag(tag: FaqTag): Faq[] {
  return faqs.filter((f) => f.tags.includes(tag));
}
