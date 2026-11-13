import { site, whatsappHref } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./Button";
import { EightDots } from "./Timeline";

/**
 * CTA band. `dark` for the closing section of a page (counts toward the 2 dark sections).
 *
 *   <CTABand title="Let's see what your site could look like." sub="..." dark />
 */
export function CTABand({
  title,
  sub,
  dark = false,
  showEmail = true,
  whatsappMessage,
  className,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
  showEmail?: boolean;
  whatsappMessage?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "py-section defer-render",
        dark ? "on-dark bg-ink text-paper" : "bg-paper-2",
        className,
      )}
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <EightDots className={dark ? "text-paper" : "text-ink"} onDark={dark} />
          <h2 className="font-display mt-8 max-w-[14ch] text-[clamp(2.75rem,1.2rem+5.6vw,7rem)] leading-[0.95] tracking-[-0.025em]">
            {title}
            <span
              aria-hidden
              className={cn(
                "pixel-cursor ml-[0.12em] inline-block h-[0.62em] w-[0.34em] align-baseline",
                dark ? "bg-accent-on-dark" : "bg-accent",
              )}
            />
          </h2>
          {sub ? (
            <p
              className={cn("text-lead mt-5 max-w-[52ch]", dark ? "text-muted-dark" : "text-muted")}
            >
              {sub}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <ButtonLink
            href={site.calLink}
            size="lg"
            variant={dark ? "primary-dark" : "primary"}
            arrow
            track="cta_book_call"
          >
            Book a call
          </ButtonLink>
          <ButtonLink
            href={whatsappHref(whatsappMessage)}
            size="lg"
            variant={dark ? "secondary-dark" : "secondary"}
            track="cta_whatsapp"
          >
            Message on WhatsApp
          </ButtonLink>
          {showEmail ? (
            <p className={cn("text-small mt-2", dark ? "text-muted-dark" : "text-muted")}>
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
                className={cn("underline underline-offset-4", dark ? "text-paper" : "text-ink")}
              >
                {site.email}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
