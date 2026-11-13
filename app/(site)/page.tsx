import type { Metadata } from "next";
import { HeroV3 } from "@/components/v3/Hero";
import { ServicesV3 } from "@/components/v3/Services";
import { WhyV3 } from "@/components/v3/Why";
import { DialV3 } from "@/components/v3/Dial";
import { ReachV3, LeadsV3, SpeedV3, PricingV3, FaqV3, CtaV3 } from "@/components/v3/Sections";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqsByTag } from "@/content/faq";
import { faqLd, organizationLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "octate studio · Premium websites for clinics and med spas, live in 7 days" },
  description:
    "Premium websites for clinics, med spas and local brands in India, Nepal, the US, UK and Australia. Fixed price, live in 7 days, 50% after you approve.",
  alternates: { canonical: "/" },
};

// Founding prices re-check hourly, so they switch off on their own after the cutoff date.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqLd(faqsByTag("home"))} />
      <HeroV3 />
      <ServicesV3 />
      <WhyV3 />
      <DialV3 />
      <LeadsV3 />
      <ReachV3 />
      <SpeedV3 />
      <PricingV3 />
      <FaqV3 />
      <CtaV3 />
    </>
  );
}
