import { site } from "@/content/site";
import { founding } from "@/content/pricing";
import { isFoundingActive } from "@/lib/founding";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Tag } from "@/components/ui/Tag";
import { StatStrip } from "@/components/ui/StatStrip";
import { ConceptScreen } from "@/components/graphics/ConceptScreen";

/**
 * Hero. The type is the hero.
 * - Headline set at ~9vw, edge to edge, three deliberate lines on desktop.
 * - A live concept site sits INSIDE the sentence, between "business" and "look".
 * - The full stop is the oxblood pixel, blinking like a cursor: the site is "live".
 * The H1 is plain text (the LCP element). The inline site and pixel are aria-hidden and
 * animate with clip-path/opacity only, so the line never reflows (CLS stays 0).
 */
function BookingRequest() {
  return (
    <div className="hero-toast bg-paper rounded-md p-4 shadow-[0_0_0_1px_var(--color-rule),var(--shadow-lift)]">
      <p className="label text-muted flex items-center gap-2 text-[0.625rem]">
        <span className="bg-accent inline-block size-2" aria-hidden />
        New booking request · just now
      </p>
      <p className="font-display mt-2 text-[1.2rem] leading-tight">Skin consult · Tue, 11:00</p>
      <p className="text-muted mt-1 text-[0.75rem]">via the clinic&apos;s website</p>
    </div>
  );
}

export function HeroV2() {
  const foundingOn = isFoundingActive();
  return (
    <section className="relative overflow-hidden">
      {/* 12-column hairline grid: the page's own construction lines */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="container-site relative pt-8 pb-14 md:pt-12 lg:pb-20">
        <div className="label text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="tracking-[0.1em]">
            octate studio · web, ads and tech for growing businesses
          </p>
          {foundingOn ? (
            <p className="text-accent flex items-center gap-2 tracking-[0.1em]">
              <span aria-hidden className="pixel-cursor bg-accent inline-block size-1.5" />
              Founding rate · {founding.slotsLeft} of {founding.slotsTotal} spots left
            </p>
          ) : null}
        </div>

        <h1 className="hero-h1 mt-8 md:mt-12">
          <span className="hero-line">Websites that make </span>
          <span className="hero-line">
            your business{" "}
            <span aria-hidden className="hero-inline">
              <ConceptScreen id="skin" layout="desktop" />
            </span>{" "}
          </span>
          <span className="hero-line">
            look as good as it <span className="text-accent">is</span>
            <span aria-hidden className="hero-stop pixel-cursor" />
            <span className="sr-only">.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-lead text-muted max-w-[40ch]">
              Premium sites for clinics, med spas and local brands. Designed with care, built fast,
              live in 7 days at a fixed price.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink
                href={site.calLink}
                size="lg"
                arrow
                track="cta_book_call"
                className="magnetic"
              >
                Book a 15-min call
              </ButtonLink>
              <TextLink href="/pricing" arrow track="cta_pricing">
                See pricing
              </TextLink>
            </div>
            <ul className="text-small text-muted mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5">
              {["Fixed price", "50% after you approve", "You own everything"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="bg-accent inline-block size-1.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-4 lg:col-start-9">
            <BookingRequest />
            <figcaption className="text-muted mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem]">
              <Tag variant="concept" />
              <span>Fig. 01 · Concept site inside the headline</span>
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="container-site pb-6">
        <StatStrip />
      </div>
    </section>
  );
}
