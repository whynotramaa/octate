import { site, whatsappHref } from "@/content/site";
import { tiers } from "@/content/pricing";
import { faqsByTag } from "@/content/faq";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { RegionToggle } from "@/components/ui/RegionToggle";
import { PricingCard } from "@/components/ui/PricingCard";
import { founding } from "@/content/pricing";
import { isFoundingActive } from "@/lib/founding";
import { formatDate } from "@/lib/format";
import { Sprite } from "./Sprite";
import { SpeedRadar } from "./Live";

/* ------------------------------------------------------------------ Reach (refs 1 + 4) */
const pin = ["..XX..", ".XXXX.", "XX..XX", "XX..XX", ".XXXX.", "..XX..", "..XX..", "...X.."].map(
  (r) => r.replace(/X/g, "L"),
);
const clock = [".LLLL.", "L..L.L", "L..L.L", "L..LLL", "L....L", ".LLLL."];
const rupee = ["LLLLL.", "..L...", "LLLLL.", "..L...", ".L.L..", "L...L."];

const reach = [
  {
    icon: rupee,
    title: "India and Nepal",
    body: "Prices in ₹ and रू. Pay by UPI or bank transfer.",
  },
  {
    icon: pin,
    title: "US, UK and Australia",
    body: "Med spa sites priced in USD, paid by international transfer.",
  },
  {
    icon: clock,
    title: "Your time zone",
    body: "Calls in your business hours, updates you review on your phone.",
  },
];

export function ReachV3() {
  return (
    <section className="v3-reach on-dark text-paper pt-section relative overflow-hidden">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="text-[clamp(2.25rem,1.3rem+3vw,4.25rem)] leading-[1.02] lg:col-span-7">
            Websites for clinics and local brands in{" "}
            <span className="text-accent">five countries.</span>
          </h2>
          <p className="text-paper/70 max-w-[44ch] text-[1.0625rem] leading-[1.6] lg:col-span-4 lg:col-start-9">
            We work with owner-led businesses across India and Nepal, and with med spas in the US,
            UK and Australia. Same studio, same fixed prices, priced in your currency.
          </p>
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          {reach.map((r) => (
            <div key={r.title}>
              <p className="flex items-center gap-2.5 text-[0.9375rem] font-semibold">
                <Sprite rows={r.icon} className="h-3.5 w-auto" />
                {r.title}
              </p>
              <p className="text-paper/60 mt-2 max-w-[32ch] text-[0.875rem] leading-[1.55]">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
      <img
        src="/reach-map.svg"
        alt="World map with India, Nepal, the United States, the United Kingdom and Australia highlighted"
        width={1510}
        height={755}
        loading="lazy"
        decoding="async"
        className="mx-auto mt-12 block h-auto w-full max-w-[100rem] [mask-image:linear-gradient(to_bottom,black_70%,transparent)] md:mt-16"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ Leads (ref 3) */
type Node = {
  id: string;
  x: number;
  y: number;
  c: string;
  label: string;
  lx: number;
  ly: number;
  big?: boolean;
};
const nodes: Node[] = [
  { id: "site", x: 210, y: 180, c: "#0B0B0B", label: "Your website", lx: 232, ly: 172, big: true },
  { id: "google", x: 60, y: 60, c: "#2F5BE0", label: "Google search", lx: 82, ly: 52 },
  { id: "ads", x: 360, y: 60, c: "#E86FB0", label: "Instagram ad", lx: 288, ly: 34 },
  { id: "wa", x: 60, y: 300, c: "#1F9D55", label: "WhatsApp", lx: 20, ly: 340 },
  { id: "book", x: 330, y: 240, c: "#D4FF3A", label: "Online booking", lx: 346, ly: 232 },
  { id: "alert", x: 180, y: 330, c: "#F6CF45", label: "Instant lead alert", lx: 202, ly: 352 },
  { id: "crm", x: 390, y: 330, c: "#E8505B", label: "CRM", lx: 382, ly: 362 },
];
const wires = [
  "M60 60V120H210V162",
  "M360 60V120H210",
  "M60 300V240H180V180H192",
  "M228 180H330V228",
  "M330 252V330H378",
  "M210 198V270H180V318",
];

function LeadsGraphic() {
  return (
    <svg
      viewBox="0 0 440 380"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram: Google, ads and WhatsApp lead into your website, which feeds online booking, instant lead alerts and your CRM"
    >
      {/* grid */}
      <g stroke="#E4E3DF" strokeWidth="1">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`v${i}`} x1={30 + i * 60} y1="30" x2={30 + i * 60} y2="360" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="30" y1={30 + i * 60} x2="450" y2={30 + i * 60} />
        ))}
      </g>
      {wires.map((d, k) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className="wire"
          style={{ "--k": k } as React.CSSProperties}
          fill="none"
          stroke="#3B0F1A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
      {nodes.map((n, k) => (
        <g key={n.id}>
          <circle
            className="node"
            style={{ "--k": k } as React.CSSProperties}
            cx={n.x}
            cy={n.y}
            r={n.big ? 20 : 15}
            fill={n.c}
            stroke={n.id === "book" ? "#0B0B0B" : "none"}
            strokeWidth="1.5"
          />
          <text x={n.lx} y={n.ly} fontSize="11.5" fill="#0B0B0B" fontWeight={n.big ? 600 : 400}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function LeadsV3() {
  return (
    <section className="bg-paper py-section overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-[clamp(2.5rem,1.4rem+3.6vw,4.75rem)] leading-[1.12]">
            Every lead,{" "}
            <span className="bg-accent box-decoration-clone px-[0.12em]">connected.</span>
          </h2>
          <p className="text-muted mt-6 max-w-[40ch] text-[1.0625rem] leading-[1.6]">
            A good site does more than look good. Every enquiry lands where you&apos;ll see it,
            within seconds, so nobody waits a day for a reply.
          </p>
          <ul className="mt-10 space-y-7">
            <li>
              <p className="flex items-center gap-2.5 font-semibold">
                <span aria-hidden className="size-3 rounded-full bg-[#F6CF45]" />
                Instant lead alerts
              </p>
              <p className="text-muted mt-1.5 max-w-[42ch] text-[0.9375rem] leading-[1.55]">
                Online booking and enquiry forms ping you the moment someone books. Included in
                Signature.
              </p>
            </li>
            <li>
              <p className="flex items-center gap-2.5 font-semibold">
                <span aria-hidden className="size-3 rounded-full bg-[#E8505B]" />
                CRM and automations
              </p>
              <p className="text-muted mt-1.5 max-w-[42ch] text-[0.9375rem] leading-[1.55]">
                Leads flow into your CRM and follow-ups send themselves. Part of Partner.
              </p>
            </li>
          </ul>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <LeadsGraphic />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Speed (ref 5) */
export function SpeedV3() {
  return (
    <section className="on-dark bg-ink text-paper py-section overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SpeedRadar />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="text-muted-dark flex justify-between text-[0.8125rem]">
            <span>Measured live</span>
            <span>octate</span>
          </div>
          <h2 className="mt-10 text-[clamp(2.4rem,1.4rem+3.2vw,4.5rem)] leading-[1.02]">
            Built to <span className="text-muted-dark">load fast</span>,{" "}
            <span className="text-muted-dark">rank locally</span> and turn visits into{" "}
            <span className="text-muted-dark">bookings</span>.
          </h2>
          <p className="text-paper/70 mt-7 max-w-[44ch] text-[1.0625rem] leading-[1.6]">
            Every site we ship is checked on a mid-range Android phone before launch. The lime dot
            is this page, measured on your device just now.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/audit" variant="primary-dark" size="lg" arrow>
              Get a free site check
            </ButtonLink>
            <ButtonLink
              href={site.calLink}
              variant="secondary-dark"
              size="lg"
              track="cta_book_call"
            >
              Book a call
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Pricing */
export function PricingV3() {
  const on = isFoundingActive();
  return (
    <section className="bg-paper-2 py-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[0.875rem] font-semibold">Pricing</p>
            <h2 className="mt-5 text-[clamp(2.5rem,1.4rem+3.6vw,4.75rem)] leading-[1]">
              Three ways to work with us.
            </h2>
          </div>
          <RegionToggle />
        </div>
        {on ? (
          <p className="mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-[var(--color-ink)] py-2 pr-4 pl-3 text-[0.875rem] text-[var(--color-paper)]">
            <span aria-hidden className="bg-accent pixel-cursor size-2" />
            Founding rate for our first {founding.slotsTotal} clients ·{" "}
            <strong className="font-semibold">
              {founding.slotsLeft} of {founding.slotsTotal} left
            </strong>{" "}
            · standard prices from {formatDate(founding.standardFrom)}
          </p>
        ) : null}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.id}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className="flex"
            >
              <PricingCard tier={t} compact className="w-full" />
            </div>
          ))}
        </div>
        <p className="text-muted mt-10 text-center text-[1.0625rem]">
          50% to start. The other 50% only after you approve the final site.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function FaqV3() {
  return (
    <section className="bg-paper py-section defer-render">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-[clamp(2.25rem,1.3rem+3vw,4rem)] leading-[1.02]">
            Questions owners ask us.
          </h2>
          <p className="text-muted mt-5 max-w-[30ch]">
            Something else on your mind?{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
              Ask us directly
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqsByTag("home")} name="home-faq" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Closing CTA (lime) */
export function CtaV3() {
  return (
    <section className="bg-accent text-accent-ink py-section defer-render">
      <div className="container-site">
        <h2 className="max-w-[13ch] text-[clamp(3rem,1.4rem+6.4vw,8.5rem)] leading-[0.94]">
          Let&apos;s see what your site could look like.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[42ch] text-[clamp(1.0625rem,1rem+0.35vw,1.3rem)] leading-[1.5] lg:col-span-6">
            Book a 15-minute call. We&apos;ll come with ideas specific to your business, not a sales
            script.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink href={site.calLink} size="lg" arrow track="cta_book_call">
              Book a call
            </ButtonLink>
            <ButtonLink href={whatsappHref()} variant="secondary" size="lg" track="cta_whatsapp">
              Message on WhatsApp
            </ButtonLink>
          </div>
        </div>
        <p className="mt-10 text-[0.9375rem]">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
