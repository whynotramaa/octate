import Link from "next/link";
import { cn } from "@/lib/cn";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackAttrs } from "@/lib/analytics";

/**
 * Button and ButtonLink share one look.
 *
 *   <ButtonLink href={site.calLink} track="cta_book_call">Book a 15-min call</ButtonLink>
 *   <ButtonLink href="/pricing" variant="secondary">See pricing</ButtonLink>
 *   <Button type="submit" size="lg">Send</Button>
 *
 * Variants: primary (oxblood), secondary (ink outline), ghost (text + arrow),
 * and the *-dark versions for ink sections.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "primary-dark" | "secondary-dark";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-nowrap select-none " +
  "transition-[background-color,color,box-shadow,translate] duration-(--duration-micro) ease-(--ease-out) " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-3",
  secondary: "text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-paper",
  ghost: "text-ink px-0! hover:opacity-70",
  "primary-dark": "bg-accent text-accent-ink hover:bg-accent-hover",
  "secondary-dark": "text-paper bg-ink-3 hover:bg-paper hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.875rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
  track?: AnalyticsEvent;
  trackProps?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="size-4 transition-transform duration-(--duration-micro) ease-(--ease-out) group-hover/btn:translate-x-1"
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
  );
}

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(base, variants[variant], sizes[size]);
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  track,
  trackProps,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const showArrow = arrow ?? variant === "ghost";
  const props = {
    className: cn(buttonClasses(variant, size), className),
    ...(track ? trackAttrs(track, trackProps) : {}),
    ...rest,
  };
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        {...props}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {showArrow ? <Arrow /> : null}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
      {showArrow ? <Arrow /> : null}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  track,
  trackProps,
  className,
  children,
  type = "button",
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(buttonClasses(variant, size), className)}
      {...(track ? trackAttrs(track, trackProps) : {})}
      {...rest}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
