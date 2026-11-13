"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, whatsappHref } from "@/content/site";
import { Wordmark } from "@/components/ui/Logo";
import { EightDots } from "@/components/ui/Timeline";

/**
 * Full-screen menu sheet for mobile. Built on <dialog> so focus is trapped,
 * Escape closes it and the page behind is inert, all natively.
 */
export function MobileMenu({ links }: { links: readonly { href: string; label: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="hover:bg-paper-2 grid size-9 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-rule)] transition-colors lg:hidden"
      >
        <svg viewBox="0 0 20 20" aria-hidden className="size-5">
          <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        className="bg-paper text-ink backdrop:bg-ink/40 m-0 h-dvh max-h-none w-full max-w-none p-0 open:flex open:flex-col"
      >
        <div className="container-site flex h-16 shrink-0 items-center justify-between">
          <Link href="/" className="inline-flex items-center" onClick={() => ref.current?.close()}>
            <Wordmark className="h-[21px]" />
          </Link>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-rule)]"
          >
            <svg viewBox="0 0 20 20" aria-hidden className="size-5">
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-center">
          <ul className="border-rule border-t">
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }].map(
              (l, i) => (
                <li key={l.href} className="border-rule border-b">
                  <Link
                    href={l.href}
                    onClick={() => ref.current?.close()}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="font-display aria-[current=page]:text-accent flex items-baseline justify-between py-4 text-[2.5rem] leading-none"
                  >
                    {l.label}
                    <span className="numeral text-muted text-[0.75rem]">
                      {String(i).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="container-site flex shrink-0 flex-col gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a
            href={site.calLink}
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_book_call"
            className="bg-accent text-paper flex h-13 items-center justify-center rounded-full font-semibold"
          >
            Book a 15-min call
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_whatsapp"
            className="flex h-13 items-center justify-center rounded-full font-semibold shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
          >
            Message on WhatsApp
          </a>
          <EightDots size="sm" className="text-ink mt-3 self-center" />
        </div>
      </dialog>
    </>
  );
}
