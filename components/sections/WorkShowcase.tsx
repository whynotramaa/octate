import Link from "next/link";
import { work } from "@/content/work";
import { Folio } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { Tag } from "@/components/ui/Tag";
import { WorkVisual } from "@/components/graphics/WorkVisual";

/**
 * Work, as a pinned horizontal showcase on desktop: you scroll down, the work slides sideways.
 * Driven by a CSS scroll timeline (no JS). Without support, or below 1024px, it's a normal
 * stacked list, so nothing is ever hidden.
 */
export function WorkShowcase() {
  const items = work.slice(0, 6);
  return (
    <section aria-labelledby="work-title" className="work-track defer-render bg-paper relative">
      <div className="work-pin">
        <div className="container-site pt-section lg:pt-0">
          <Folio folio="02" name="Work" />
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="work-title" className="text-h2">
                Recent work
              </h2>
              <p className="text-lead text-muted mt-4 max-w-[44ch]">
                A mix of client projects and studio concepts. Concepts are labelled.
              </p>
            </div>
            <TextLink href="/work" arrow>
              See all work
            </TextLink>
          </div>
        </div>

        <ol className="work-rail mt-12 lg:mt-14">
          {items.map((w, i) => (
            <li key={w.slug} className="work-slide">
              <Link href={`/work/${w.slug}`} className="group/work block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[16/10]">
                  <div className="absolute inset-0 transition-transform duration-(--duration-reveal) ease-(--ease-out) group-hover/work:scale-[1.025]">
                    <WorkVisual concept={w.concept!} url={`${w.slug}.com`} />
                  </div>
                  {w.isConcept ? <Tag variant="concept" className="absolute top-4 left-4" /> : null}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-none">
                    {w.title}
                  </h3>
                  <span className="label text-muted shrink-0">
                    <span className="numeral">Fig. {String(i + 1).padStart(2, "0")}</span>
                  </span>
                </div>
                <p className="text-muted mt-2">
                  {w.industry} · {w.city} · {w.deliverable}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
