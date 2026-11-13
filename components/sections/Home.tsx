import { site } from "@/content/site";
import { tiers } from "@/content/pricing";
import { faqsByTag } from "@/content/faq";
import { TextLink } from "@/components/ui/TextLink";
import { Section, Folio } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { RegionToggle } from "@/components/ui/RegionToggle";
import { FoundingBanner } from "@/components/ui/FoundingBanner";
import { PricingCard } from "@/components/ui/PricingCard";
import { ProcessPlot, dayPixelRanges, plotWindow } from "@/components/graphics/ProcessPlot";
import { processSteps } from "@/components/ui/Timeline";

/* ------------------------------------------------------------------ 7.5 Offer */
export function Offer() {
  return (
    <Section
      folio="03"
      name="Pricing"
      title="Three ways to work with us."
      tone="paper-2"
      headerAside={<RegionToggle />}
    >
      <FoundingBanner className="mb-5" />
      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <div
            key={t.id}
            data-reveal
            style={{ "--reveal-i": i } as React.CSSProperties}
            className="flex"
          >
            <PricingCard tier={t} compact className="w-full" />
          </div>
        ))}
      </div>
      <p className="text-muted mt-8 text-center">
        50% to start. The other 50% only after you approve the final site.{" "}
        <TextLink href="/pricing" arrow track="cta_pricing">
          Compare plans
        </TextLink>
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ 7.6 Process (dark #1) */
export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="plot-track on-dark bg-ink text-paper relative lg:h-[260vh]"
    >
      <div className="py-section lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div className="container-site w-full">
          <Folio folio="04" name="Process" onDark />
          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-6">
              <h2 id="process-title" className="text-h2 max-w-[14ch]">
                From first call to launch in 7 days.
              </h2>
              <ol className="mt-10 space-y-6">
                {processSteps.map((s) => {
                  const a = plotWindow(dayPixelRanges[s.span[0]]![0]).a;
                  const b = plotWindow(dayPixelRanges[s.span[1]]![1]).b;
                  return (
                    <li
                      key={s.title}
                      className="plot-step relative grid grid-cols-[6.5rem_1fr] gap-4 border-t border-[var(--color-rule-dark)] pt-5"
                      style={
                        { "--a": `${a}%`, "--b": `${Math.min(a + 6, b)}%` } as React.CSSProperties
                      }
                    >
                      <p className="step-day label text-muted-dark pt-1.5">{s.day}</p>
                      <div>
                        <h3 className="text-h3">{s.title}</h3>
                        <p className="text-muted-dark mt-1.5 max-w-[40ch]">{s.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-10">
                <TextLink href="/process" arrow onDark>
                  How we work
                </TextLink>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ProcessPlot className="mx-auto max-w-[22rem] lg:max-w-[30rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 7.8 FAQ */
export function HomeFaq() {
  const items = faqsByTag("home");
  return (
    <Section folio="06" name="Questions" tone="paper-2">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-h2">Questions owners ask us.</h2>
          <p className="text-muted mt-5 max-w-[32ch]">
            Something else on your mind?{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
              Ask us directly
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} name="home-faq" />
        </div>
      </div>
    </Section>
  );
}
