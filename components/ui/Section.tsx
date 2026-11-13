import { cn } from "@/lib/cn";

/**
 * Section: page band with the print-style folio line, heading and sub.
 *
 *   <Section folio="01" name="Work" title="Recent work" sub="A mix of client projects...">
 *     ...grid...
 *   </Section>
 *
 * tone="ink" makes a dark section (max 2 per page). Children can read `.on-dark`.
 * Headings are H2 by default; pass `as="h1"` on page heroes.
 */
export function Section({
  id,
  folio,
  name,
  title,
  sub,
  tone = "paper",
  as: Heading = "h2",
  headerAside,
  className,
  children,
}: {
  id?: string;
  folio?: string;
  name?: string;
  title?: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "paper" | "paper-2" | "ink";
  as?: "h1" | "h2";
  headerAside?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = tone === "ink";
  return (
    <section
      id={id}
      className={cn(
        "py-section defer-render",
        tone === "paper" && "bg-paper",
        tone === "paper-2" && "bg-paper-2",
        dark && "on-dark bg-ink text-paper",
        className,
      )}
    >
      <div className="container-site">
        {folio || name ? <Folio folio={folio} name={name} onDark={dark} /> : null}
        {title ? (
          <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Heading className={cn(Heading === "h1" ? "text-display" : "text-h2")}>
                {title}
              </Heading>
              {sub ? (
                <p
                  className={cn(
                    "text-lead mt-5 max-w-[56ch]",
                    dark ? "text-muted-dark" : "text-muted",
                  )}
                >
                  {sub}
                </p>
              ) : null}
            </div>
            {headerAside ? (
              <div className="lg:col-span-4 lg:justify-self-end">{headerAside}</div>
            ) : null}
          </div>
        ) : null}
        {children ? <div className={cn(title ? "mt-12 md:mt-16" : "mt-8")}>{children}</div> : null}
      </div>
    </section>
  );
}

/** "01 / Work ─────────── octate studio" running head, like a magazine folio. */
export function Folio({
  folio,
  name,
  onDark = false,
}: {
  folio?: string;
  name?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("label flex items-center gap-3", onDark ? "text-muted-dark" : "text-muted")}>
      {folio ? <span className="numeral text-[0.75rem] tracking-[0.08em]">{folio}</span> : null}
      {folio && name ? <span aria-hidden>/</span> : null}
      {name ? <span>{name}</span> : null}
      <span aria-hidden className={cn("h-px flex-1", onDark ? "bg-rule-dark" : "bg-rule")} />
      <span aria-hidden className="hidden sm:inline">
        octate studio
      </span>
    </div>
  );
}
