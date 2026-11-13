import { Folio } from "@/components/ui/Section";
import { PixelIcon } from "@/components/ui/Pixel";

/**
 * Why octate, as an editorial index: four big rows. On hover (desktop) the row's pixel icon
 * slides in and the title steps right. On touch it's simply a clean list.
 */
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

export function WhyIndex() {
  return (
    <section className="bg-paper py-section defer-render" aria-labelledby="why-title">
      <div className="container-site">
        <Folio folio="05" name="Why octate" />
        <h2 id="why-title" className="text-h2 mt-10">
          Why owners pick octate.
        </h2>
        <ol className="mt-14 border-b border-[var(--color-rule)]">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className="why-row group/why grid gap-4 border-t border-[var(--color-rule)] py-8 md:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-8"
            >
              <span className="numeral text-muted text-[0.875rem] lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display flex items-center gap-5 text-[clamp(2rem,1.3rem+2.6vw,4rem)] leading-[1] lg:col-span-7">
                <PixelIcon name={r.icon} className="why-icon text-accent size-[0.62em] shrink-0" />
                <span className="why-title">{r.title}</span>
              </h3>
              <p className="text-muted max-w-[40ch] lg:col-span-4">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
