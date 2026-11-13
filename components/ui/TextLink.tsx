import Link from "next/link";
import { cn } from "@/lib/cn";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackAttrs } from "@/lib/analytics";

/**
 * Inline text link with an underline that draws in on hover, plus optional arrow.
 *   <TextLink href="/work" arrow>See all work</TextLink>
 */
export function TextLink({
  href,
  arrow = false,
  onDark = false,
  track,
  className,
  children,
}: {
  href: string;
  arrow?: boolean;
  onDark?: boolean;
  track?: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
}) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const cls = cn(
    "group/link inline-flex items-center gap-1.5 font-semibold",
    "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5",
    "transition-[background-size,color] duration-(--duration-base) ease-(--ease-out) hover:bg-[length:100%_1.5px]",
    onDark ? "text-paper hover:text-accent-on-dark" : "text-ink hover:text-accent",
    className,
  );
  const inner = (
    <>
      {children}
      {arrow ? (
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-4 transition-transform duration-(--duration-micro) group-hover/link:translate-x-1"
        >
          <path
            d="M2 8h11M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );
  const t = track ? trackAttrs(track) : {};
  return external ? (
    <a
      href={href}
      className={cls}
      {...t}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...t}>
      {inner}
    </Link>
  );
}
