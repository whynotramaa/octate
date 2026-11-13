import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

/**
 * Sticky, slim header. It turns solid and blurs after ~96px of scroll using a CSS
 * scroll-driven animation (no JS). Browsers without support get the transparent state.
 */
export function Header() {
  return (
    <header className="header-scroll sticky top-0 z-40">
      <a
        href="#main"
        className="bg-ink text-paper sr-only z-50 rounded-full px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" aria-label="octate studio, home" className="text-[1.75rem] md:text-[2rem]">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-1 text-[0.9375rem] font-semibold transition-[background-size] duration-(--duration-base) ease-(--ease-out) hover:bg-[length:100%_1.5px]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink
            href={site.calLink}
            size="sm"
            track="cta_book_call"
            className="md:h-10 md:px-5"
          >
            Book a call
          </ButtonLink>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
