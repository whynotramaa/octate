import type { Metadata } from "next";
import { Offer, Process, HomeFaq } from "@/components/sections/Home";
import { HeroV2 } from "@/components/sections/HeroV2";
import { ProblemStack } from "@/components/sections/ProblemStack";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { WhyIndex } from "@/components/sections/WhyIndex";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqsByTag } from "@/content/faq";
import { faqLd, organizationLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "octate studio · Premium websites for clinics and med spas, live in 7 days" },
  description:
    "Premium websites for clinics, med spas and local brands in India, Nepal, the US, UK and Australia. Fixed price, live in 7 days, 50% after you approve.",
  alternates: { canonical: "/" },
};

// Founding prices and banner re-check hourly, so they switch off on their own after the cutoff date.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqLd(faqsByTag("home"))} />
      <HeroV2 />
      <ProblemStack />
      <WorkShowcase />
      <Offer />
      <Process />
      <WhyIndex />
      <HomeFaq />
      <CTABand
        dark
        title="Let's see what your site could look like."
        sub="Book a 15-minute call. We'll come with ideas specific to your business, not a sales script."
      />
    </>
  );
}
