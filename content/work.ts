import type { ConceptId } from "@/components/graphics/ConceptScreen";

/**
 * Work index. Until the MDX case studies land (build step 5), cards read from here.
 * Concepts are studio work, not client work: isConcept MUST be true and they never get
 * results or speed numbers. Real client projects add `speed` only from a measured PageSpeed run.
 * TODO(owner): add real client projects with screenshots and measured speed.
 */
export type WorkEntry = {
  slug: string;
  title: string;
  industry: string;
  filter: "Clinics" | "Med spa" | "Real estate" | "Food & hospitality";
  city: string;
  deliverable: string;
  isConcept: boolean;
  concept?: ConceptId;
  result?: string;
  speed?: { score: number; lcp: string };
};

export const work: readonly WorkEntry[] = [
  {
    slug: "ananda-skin",
    title: "ananda skin",
    industry: "Skin clinic",
    filter: "Clinics",
    city: "Kathmandu",
    deliverable: "Website and booking",
    isConcept: true,
    concept: "skin",
  },
  {
    slug: "halcyon-aesthetics",
    title: "Halcyon Aesthetics",
    industry: "Med spa",
    filter: "Med spa",
    city: "Austin",
    deliverable: "Website and treatment menu",
    isConcept: true,
    concept: "spa",
  },
  {
    slug: "smile-studio",
    title: "Smile Studio",
    industry: "Dental clinic",
    filter: "Clinics",
    city: "Pune",
    deliverable: "Website and WhatsApp booking",
    isConcept: true,
    concept: "dental",
  },
];
