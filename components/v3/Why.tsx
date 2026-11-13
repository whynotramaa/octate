import { tiers } from "@/content/pricing";
import { stats } from "@/content/stats";
import { Price } from "@/components/ui/Price";
import { SpeedGauge } from "./Live";

const signature = tiers.find((t) => t.id === "signature");

function Tick({ on = true, color }: { on?: boolean; color: string }) {
  return (
    <span
      aria-hidden
      className="grid size-4 shrink-0 place-items-center rounded-[4px]"
      style={on ? { background: color } : { boxShadow: "inset 0 0 0 1.5px #C9C8C3" }}
    >
      {on ? (
        <svg viewBox="0 0 12 12" className="size-3">
          <path
            d="m2.5 6.2 2.3 2.3L9.6 3.7"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

/** The UI snippet sits low and to the right, running off the card's edge like a real screen. */
function Snippet({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-[-1.25rem] bottom-[-1.5rem] left-[20%] rounded-[14px] bg-white p-5 text-[#0B0B0B] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.35)]">
      {children}
    </div>
  );
}

const cards = [
  {
    bg: "var(--color-card-green)",
    title: "Fast, without cutting corners.",
    body: "We build with modern AI tools, then design, write and test every page by hand.",
    snippet: (
      <Snippet>
        <div className="-mx-5 -mt-5 mb-4 rounded-t-[14px] bg-[#17834A] px-5 py-2.5 text-[0.75rem] text-white">
          Day 3 of 7
        </div>
        <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">Your build schedule</p>
        <ul className="mt-3 space-y-2 text-[0.8125rem]">
          <li className="flex items-center gap-2.5">
            <Tick color="#1F9D55" />
            Call and brief
          </li>
          <li className="flex items-center gap-2.5">
            <Tick color="#1F9D55" />
            Design direction
          </li>
          <li className="flex items-center gap-2.5">
            <Tick on={false} color="#1F9D55" />
            Build and preview
          </li>
          <li className="flex items-center gap-2.5">
            <Tick on={false} color="#1F9D55" />
            Launch
          </li>
        </ul>
        <p className="mt-4 text-[0.75rem] font-semibold">Progress: 50%</p>
      </Snippet>
    ),
  },
  {
    bg: "var(--color-card-yellow)",
    dark: true,
    title: "One fixed price.",
    body: "You know the full cost before we start. No hourly billing, no surprise invoices.",
    snippet: (
      <Snippet>
        <p className="text-[0.75rem] text-[#63625E]">Your fixed quote</p>
        <p className="mt-1 text-[1.125rem] font-semibold tracking-[-0.02em]">Signature site</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1F0EC]">
          <div className="h-full w-1/2 rounded-full bg-[#F6CF45]" />
        </div>
        {signature?.founding ? (
          <p className="mt-3 text-[1.75rem] leading-none font-semibold tracking-[-0.03em]">
            <Price prices={signature.founding} display />
          </p>
        ) : null}
        <ul className="mt-3 space-y-1.5 text-[0.8125rem]">
          <li className="flex items-center gap-2.5">
            <Tick color="#C89B12" />
            50% to start
          </li>
          <li className="flex items-center gap-2.5">
            <Tick on={false} color="#C89B12" />
            50% after you approve
          </li>
        </ul>
        <span className="mt-4 block rounded-md bg-[#F6CF45] py-2 text-center text-[0.8125rem] font-semibold">
          Approve and start
        </span>
      </Snippet>
    ),
  },
  {
    bg: "var(--color-card-blue)",
    title: "Engineers, not template sellers.",
    body: "We write real code, so your site is fast and grows into booking systems and apps.",
    snippet: (
      <Snippet>
        <SpeedGauge />
        <p className="mt-4 border-t border-[#EDECE8] pt-3 text-[0.75rem] text-[#63625E]">
          Measured live, on the device you&apos;re holding.
        </p>
      </Snippet>
    ),
  },
  {
    bg: "var(--color-card-red)",
    title: "You own everything.",
    body: "Domain, code, content and accounts are yours. No lock-in, ever.",
    snippet: (
      <Snippet>
        <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">Handed over at launch</p>
        <ul className="mt-3 space-y-2 text-[0.8125rem]">
          {["Domain", "Code", "Content", "Logins"].map((x) => (
            <li key={x} className="flex items-center gap-2.5">
              <Tick color="#E8505B" />
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.75rem] font-semibold">Yours, from day one.</p>
      </Snippet>
    ),
  },
];

export function WhyV3() {
  return (
    <section className="bg-paper py-section overflow-hidden">
      <div className="container-site">
        <p className="text-[0.875rem] font-semibold">Why owners pick us</p>
        <h2 className="mt-5 text-[clamp(2.5rem,1.4rem+3.6vw,4.75rem)] leading-[1]">
          Why choose octate?
        </h2>
        <p className="text-muted mt-6 max-w-[48ch] text-[clamp(1.0625rem,1rem+0.35vw,1.3rem)] leading-[1.5]">
          Most local sites haven&apos;t been touched in years. We build fast, modern ones that bring
          in bookings, at one fixed price.
        </p>
      </div>

      <ol className="v3-rail mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-10 md:mt-16">
        {cards.map((c, i) => (
          <li
            key={c.title}
            data-reveal
            style={{ "--reveal-i": i, background: c.bg } as React.CSSProperties}
            className="relative h-[27rem] w-[19.5rem] shrink-0 snap-start overflow-hidden rounded-[22px] p-6 md:w-[22rem]"
          >
            <h3
              className={
                "text-[1.125rem] leading-snug tracking-[-0.015em] " +
                (c.dark ? "text-[#0B0B0B]" : "text-white")
              }
            >
              {c.title}{" "}
              <span className={"font-normal " + (c.dark ? "text-[#0B0B0B]/75" : "text-white/80")}>
                {c.body}
              </span>
            </h3>
            {c.snippet}
          </li>
        ))}
      </ol>

      <div className="container-site">
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-4"
            >
              <dt className="text-muted order-2 max-w-[14ch] text-[0.875rem] leading-snug">
                {s.label}
              </dt>
              <dd className="order-1 text-[clamp(2.75rem,1.8rem+2.6vw,4.25rem)] leading-none font-normal tracking-[-0.04em] whitespace-nowrap">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
