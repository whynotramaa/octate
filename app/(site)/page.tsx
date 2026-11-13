import { Section } from "@/components/ui/Section";

// Placeholder until checkpoint 2 (full homepage).
export default function HomePage() {
  return (
    <Section
      as="h1"
      folio="00"
      name="Home"
      title={
        <>
          Websites that make your business look as good as it{" "}
          <span className="text-accent">is</span>.
        </>
      }
      sub="Premium sites for clinics, med spas and local brands. Designed with care, built fast, live in 7 days at a fixed price."
    />
  );
}
