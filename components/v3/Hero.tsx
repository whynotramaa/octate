import { site } from "@/content/site";
import { founding } from "@/content/pricing";
import { isFoundingActive } from "@/lib/founding";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

/** 96 rays (8 × 12), alternating lengths: the burst behind the headline. */
const RAYS = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2;
  const r2 = i % 2 ? 84 : 100;
  const f = (n: number) => n.toFixed(2);
  return `M${f(Math.cos(a) * 12)} ${f(Math.sin(a) * 12)}L${f(Math.cos(a) * r2)} ${f(Math.sin(a) * r2)}`;
}).join("");

/** A few loose pixels, like dust on the page. Positions in % of the hero. */
const DUST: [number, number][] = [
  [8, 22],
  [24, 78],
  [61, 14],
  [77, 70],
  [91, 36],
  [46, 88],
];

export function HeroV3() {
  const foundingOn = isFoundingActive();
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="v3-grid absolute inset-0 -z-10" />

      {/* vertical rail, like a magazine spine */}
      <p
        aria-hidden
        className="text-muted absolute top-1/2 left-[max(1rem,calc((100vw-75rem)/2-2.5rem))] hidden -translate-y-1/2 -rotate-90 text-[0.75rem] tracking-[0.04em] whitespace-nowrap xl:block"
      >
        Clinics · Med spas · Local brands
      </p>

      {DUST.map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          aria-hidden
          className="bg-ink absolute -z-10 size-[5px]"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}

      <div className="container-site relative flex flex-col items-center justify-center pt-14 pb-20 text-center md:py-24 lg:min-h-[calc(100svh-4.5rem)]">
        {foundingOn ? (
          <p className="bg-ink text-paper relative inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2.5 text-[0.8125rem]">
            <span aria-hidden className="pixel-cursor bg-accent size-2" />
            Founding rate · {founding.slotsLeft} of {founding.slotsTotal} spots left
          </p>
        ) : null}

        <div className="v3-anchor mt-7">
          <span aria-hidden className="v3-word">
            seven
          </span>
          <svg aria-hidden viewBox="-100 -100 200 200" className="v3-burst">
            <path d={RAYS} stroke="#D4FF3A" strokeWidth="0.45" fill="none" />
          </svg>

          <h1 className="v3-h1 relative">
            Websites that make your business look as good as it is.
          </h1>
        </div>
        <p className="text-muted relative mx-auto mt-7 max-w-[44ch] text-[clamp(1.0625rem,1rem+0.35vw,1.3rem)] leading-[1.5]">
          Premium sites for clinics, med spas and local brands. Designed with care, built fast, live
          in 7 days at a fixed price.
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <ButtonLink href={site.calLink} size="lg" arrow track="cta_book_call">
            Book a 15-min call
          </ButtonLink>
          <TextLink href="/pricing" arrow track="cta_pricing">
            See pricing
          </TextLink>
        </div>
        <p className="text-muted relative mt-8 text-[0.8125rem]">
          Fixed price · 50% after you approve · You own everything
        </p>
      </div>
    </section>
  );
}
