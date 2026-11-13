import { site } from "@/content/site";
import { tiers } from "@/content/pricing";
import { work } from "@/content/work";
import { faqsByTag } from "@/content/faq";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Section, Folio } from "@/components/ui/Section";
import { StatStrip } from "@/components/ui/StatStrip";
import { Accordion } from "@/components/ui/Accordion";
import { RegionToggle } from "@/components/ui/RegionToggle";
import { FoundingBanner } from "@/components/ui/FoundingBanner";
import { PricingCard } from "@/components/ui/PricingCard";
import { WorkCard } from "@/components/ui/WorkCard";
import { EightDots } from "@/components/ui/Timeline";
import { PixelIcon } from "@/components/ui/Pixel";
import { HeroStage } from "@/components/graphics/HeroStage";
import { SpeedReadout } from "@/components/graphics/SpeedReadout";
import { CompareGraphic, TapsGraphic } from "@/components/graphics/ProblemGraphics";
import { ProcessPlot, dayPixelRanges, plotWindow } from "@/components/graphics/ProcessPlot";
import { WorkVisual } from "@/components/graphics/WorkVisual";
import { processSteps } from "@/components/ui/Timeline";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ 7.1 Hero */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 lg:pb-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-6">
          <EightDots size="sm" className="text-ink" />
          <p className="label text-muted mt-4 tracking-[0.1em]">
            octate studio · web, ads and tech for growing businesses
          </p>
          <h1 className="text-display mt-5 max-w-[15ch]">
            Websites that make your business look as good as it{" "}
            <span className="text-accent">is</span>.
          </h1>
          <p className="text-lead text-muted mt-6 max-w-[42ch]">
            Premium sites for clinics, med spas and local brands. Designed with care, built fast,
            live in 7 days at a fixed price.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={site.calLink} size="lg" arrow track="cta_book_call">
              Book a 15-min call
            </ButtonLink>
            <TextLink href="/pricing" arrow track="cta_pricing">
              See pricing
            </TextLink>
          </div>
          <ul className="text-small text-muted mt-7 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {["Fixed price", "50% after you approve", "You own everything"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="bg-accent inline-block size-1.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 xl:col-span-6">
          <HeroStage />
        </div>
      </div>
      <div className="container-site mt-16 lg:mt-24">
        <StatStrip />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 7.3 Problem */
const problems = [
  {
    n: "01",
    title: "They find you on their phone.",
    body: "If your site is slow or broken on mobile, they go back to Google and tap the next result.",
    graphic: <SpeedReadout />,
  },
  {
    n: "02",
    title: "They compare you in seconds.",
    body: "Next to a clinic with a clean, modern site, yours decides who looks more trustworthy.",
    graphic: <CompareGraphic />,
  },
  {
    n: "03",
    title: "They leave if booking is hard.",
    body: "Every extra step between interest and appointment costs you real customers.",
    graphic: <TapsGraphic />,
  },
];

export function Problem() {
  return (
    <Section
      folio="01"
      name="The problem"
      title="Your customers judge you before they ever call."
      tone="paper-2"
    >
      <ol className="grid gap-5 lg:grid-cols-3">
        {problems.map((p, i) => (
          <li
            key={p.n}
            data-reveal
            style={{ "--reveal-i": i } as React.CSSProperties}
            className="bg-paper flex flex-col rounded-lg p-6 shadow-[0_0_0_1px_var(--color-rule)] md:p-7"
          >
            <div className="h-[16rem]">{p.graphic}</div>
            <div className="mt-7 border-t border-[var(--color-rule)] pt-6">
              <p className="numeral text-accent text-[0.8125rem]">{p.n}</p>
              <h3 className="text-h3 mt-2">{p.title}</h3>
              <p className="text-muted mt-3">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ 7.4 Work */
export function RecentWork() {
  return (
    <Section
      folio="02"
      name="Work"
      title="Recent work"
      sub="A mix of client projects and studio concepts. Concepts are labelled."
      headerAside={
        <TextLink href="/work" arrow>
          See all work
        </TextLink>
      }
    >
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {work.slice(0, 6).map((w, i) => (
          <div
            key={w.slug}
            data-reveal
            style={{ "--reveal-i": i } as React.CSSProperties}
            className={cn(i % 3 === 1 && "lg:mt-16", i % 3 === 2 && "lg:mt-8")}
          >
            <WorkCard
              index={i + 1}
              item={{
                ...w,
                placeholder: w.concept ? (
                  <WorkVisual concept={w.concept} url={`${w.slug}.com`} />
                ) : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

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

/* ------------------------------------------------------------------ 7.7 Why octate */
const reasons = [
  {
    icon: "fast" as const,
    title: "Fast, without cutting corners.",
    body: "We build with modern AI tools, then design, write and test every page by hand. You get agency quality in days, not months.",
  },
  {
    icon: "price" as const,
    title: "One fixed price.",
    body: "You know the full cost before we start. No hourly billing, no surprise invoices.",
  },
  {
    icon: "code" as const,
    title: "Engineers, not template sellers.",
    body: "We write real code. Your site is fast, secure, and built to grow into booking systems, apps and automations.",
  },
  {
    icon: "key" as const,
    title: "You own everything.",
    body: "Domain, code, content and accounts are yours. No lock-in.",
  },
];

export function WhyOctate() {
  return (
    <Section folio="05" name="Why octate" title="Why owners pick octate.">
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {reasons.map((r, i) => (
          <div
            key={r.title}
            data-reveal
            style={{ "--reveal-i": i % 2 } as React.CSSProperties}
            className="grid grid-cols-[3rem_1fr] gap-5 border-t border-[var(--color-rule)] pt-7"
          >
            <PixelIcon name={r.icon} className="text-accent size-8" />
            <div>
              <h3 className="text-h3">{r.title}</h3>
              <p className="text-muted mt-3 max-w-[46ch]">{r.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
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
