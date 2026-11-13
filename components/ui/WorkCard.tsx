import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import { Tag } from "./Tag";

/**
 * Work card. Large screenshot, print-style caption, result line or Concept tag.
 * Hover: image scales slightly and the arrow slides in.
 * Concepts ALWAYS show the Concept tag on the image and never show results or speed.
 *
 *   <WorkCard item={work} index={3} />
 */
export type WorkItem = {
  slug: string;
  title: string;
  industry: string;
  city?: string;
  deliverable: string;
  isConcept: boolean;
  result?: string;
  /** Measured mobile PageSpeed score + LCP. Only for live client sites. */
  speed?: { score: number; lcp: string };
  cover?: string | StaticImageData;
  /** Fallback when no screenshot exists yet: a drawn placeholder screen. */
  placeholder?: React.ReactNode;
};

export function WorkCard({
  item,
  index,
  className,
  priority = false,
}: {
  item: WorkItem;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn("group/work relative", className)}>
      <Link href={`/work/${item.slug}`} className="block focus-visible:outline-offset-4">
        <div className="bg-paper-2 relative aspect-[4/3] overflow-hidden rounded-lg">
          <div className="absolute inset-0 transition-transform duration-(--duration-reveal) ease-(--ease-out) group-hover/work:scale-[1.03]">
            {item.cover ? (
              <Image
                src={item.cover}
                alt={`${item.title}: ${item.deliverable.toLowerCase()} for a ${item.industry.toLowerCase()} business${item.isConcept ? " (studio concept)" : ""}`}
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority={priority}
              />
            ) : (
              item.placeholder
            )}
          </div>
          {item.isConcept ? <Tag variant="concept" className="absolute top-3 left-3" /> : null}
          <span
            aria-hidden
            className="bg-paper text-ink shadow-lift absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full opacity-0 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-out) group-hover/work:translate-y-0 group-hover/work:opacity-100"
          >
            <svg viewBox="0 0 16 16" className="size-4">
              <path
                d="M4 12 12 4M5.5 4H12v6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="label text-muted">
              {index !== undefined ? (
                <span className="numeral">Fig. {String(index).padStart(2, "0")} · </span>
              ) : null}
              {item.industry}
              {item.city ? ` · ${item.city}` : ""}
            </p>
            <h3 className="font-display mt-2 text-[1.6rem] leading-tight">{item.title}</h3>
          </div>
        </div>
        <p className="text-small text-muted mt-1.5">
          {item.deliverable}
          {!item.isConcept && item.result ? ` · ${item.result}` : ""}
        </p>
        {!item.isConcept && item.speed ? (
          <p className="label text-ink mt-3">
            Mobile speed <span className="numeral">{item.speed.score}</span> · LCP{" "}
            <span className="numeral">{item.speed.lcp}</span>
          </p>
        ) : null}
      </Link>
    </article>
  );
}
