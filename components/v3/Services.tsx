import { Sprite } from "./Sprite";
import { spriteAds, spriteTech, spriteWeb } from "./sprites";

const services = [
  {
    sprite: spriteWeb,
    title: "Websites",
    line: "Built to bring in bookings, not just look nice.",
    items: [
      "One-page Launch sites",
      "Full Signature sites",
      "Online booking",
      "Local SEO pages",
      "Google Business setup",
      "Copy written for you",
    ],
  },
  {
    sprite: spriteAds,
    title: "Ad creatives",
    line: "Scroll-stopping posts for Instagram and Meta.",
    items: [
      "3 creatives with Signature",
      "Monthly creative packs",
      "Campaign landing pages",
      "AI-assisted, and labelled",
      "Sized for every placement",
      "Brand-matched",
    ],
  },
  {
    sprite: spriteTech,
    title: "Tech and growth",
    line: "Your ongoing tech team, on a Partner plan.",
    items: [
      "CRM and automations",
      "Custom apps",
      "Internal tools",
      "Integrations",
      "Monthly SEO work",
      "Plain-English reports",
    ],
  },
];

export function ServicesV3() {
  return (
    <section className="on-dark bg-ink text-paper py-section">
      <div className="container-site">
        <p className="text-accent text-center text-[0.8125rem] font-semibold tracking-[0.18em] uppercase">
          Services
        </p>
        <h2 className="mx-auto mt-6 max-w-[22ch] text-center text-[clamp(2.25rem,1.2rem+3.4vw,4.5rem)] leading-[1.02]">
          <span>Everything your business needs online,</span>{" "}
          <span className="text-muted-dark">from one small team.</span>
        </h2>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className="rounded-[24px] p-7 shadow-[inset_0_0_0_1px_var(--color-rule-dark)] md:p-9"
            >
              <div className="grid h-44 place-items-center">
                <Sprite rows={s.sprite} className="h-32 w-auto" />
              </div>
              <h3 className="mt-8 text-[clamp(2rem,1.6rem+1.2vw,2.75rem)] leading-none">
                {s.title}
              </h3>
              <p className="text-paper/80 mt-4 max-w-[22ch] text-[1.25rem] leading-[1.35]">
                {s.line}
              </p>
              <div className="mt-8 border-t border-[var(--color-rule-dark)] pt-6">
                <p className="text-muted-dark text-[0.75rem]">We do:</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5 text-[0.8125rem]">
                  {s.items.map((it, k) => (
                    <li key={it} className="text-paper/80 flex items-start gap-2">
                      <span className="bg-ink-3 text-paper mt-[0.15em] grid size-4 shrink-0 place-items-center rounded-full text-[0.5625rem]">
                        {k + 1}
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
