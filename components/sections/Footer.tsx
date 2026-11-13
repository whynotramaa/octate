import Link from "next/link";
import { site, whatsappHref } from "@/content/site";
import { MegaWordmark } from "@/components/ui/Pixel";
import { navLinks } from "./Header";

const year = new Date().getFullYear();

/** Footer: dark, quiet columns, then the pixel wordmark set edge to edge. */
export function Footer() {
  const head = "text-muted-dark mb-4 text-[0.8125rem]";
  const link = "text-paper/85 transition-colors duration-(--duration-micro) hover:text-accent";
  return (
    <footer className="on-dark bg-ink text-paper defer-render">
      <div className="container-site grid gap-12 pt-20 pb-14 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="max-w-[24ch] text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
            Premium websites, live in 7 days.
          </p>
          <p className="text-muted-dark mt-4 max-w-[36ch] text-[0.9375rem]">
            Web, ads and tech for clinics, med spas and growing local businesses.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <p className={head}>Studio</p>
          <ul className="space-y-2.5 text-[0.9375rem]">
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
          <p className={head}>Talk to us</p>
          <ul className="space-y-2.5 text-[0.9375rem]">
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
            <li className="text-muted-dark">Based in {site.city}</li>
            <li className="text-muted-dark">Serving {site.serving}</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className={head}>Elsewhere</p>
          <ul className="space-y-2.5 text-[0.9375rem]">
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
        <MegaWordmark className="text-paper" />
        <div className="text-muted-dark flex flex-col gap-3 border-t border-[var(--color-rule-dark)] py-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
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
