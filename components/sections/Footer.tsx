import Link from "next/link";
import { site, whatsappHref } from "@/content/site";
import { Wordmark } from "@/components/ui/Logo";
import { navLinks } from "./Header";

const year = new Date().getFullYear();

/** Footer: wordmark, one-line description, nav, contact, location, socials, legal. */
export function Footer() {
  const col = "label mb-4 text-muted";
  const link = "transition-colors duration-(--duration-micro) hover:text-accent";
  return (
    <footer className="defer-render border-rule bg-paper-2 border-t">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="octate studio, home" className="inline-flex items-center">
            <Wordmark withStudio className="h-[35px]" />
          </Link>
          <p className="text-muted mt-5 max-w-[36ch]">
            Premium websites, live in 7 days. Web, ads and tech for growing businesses.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <p className={col}>Studio</p>
          <ul className="space-y-2.5">
            {[
              ...navLinks,
              { href: "/contact", label: "Contact" },
              { href: "/audit", label: "Free site check" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className={col}>Talk to us</p>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_whatsapp"
                className={link}
              >
                WhatsApp
              </a>
            </li>
            <li className="text-muted">Based in {site.city}</li>
            <li className="text-muted">Serving {site.serving}</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className={col}>Elsewhere</p>
          <ul className="space-y-2.5">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer me"
                className={link}
              >
                Instagram
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer me" className={link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer me" className={link}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site">
        <div className="border-rule text-small text-muted flex flex-col gap-3 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} octate studio. All rights reserved.</p>
          <p className="flex gap-6">
            <Link href="/privacy" className={link}>
              Privacy
            </Link>
            <Link href="/terms" className={link}>
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
