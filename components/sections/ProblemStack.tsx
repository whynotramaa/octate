import { Folio } from "@/components/ui/Section";
import { SpeedReadout } from "@/components/graphics/SpeedReadout";
import { CompareGraphic, TapsGraphic } from "@/components/graphics/ProblemGraphics";

/**
 * Problem, staged as a pile: each card sticks a little lower than the last, so the problems
 * stack up as you scroll. Pure CSS (position: sticky). On small screens they simply flow.
 */
const problems = [
  {
    n: "01",
    tab: "Slow on mobile",
    title: "They find you on their phone.",
    body: "If your site is slow or broken on mobile, they go back to Google and tap the next result.",
    graphic: <SpeedReadout />,
  },
  {
    n: "02",
    tab: "Looks dated",
    title: "They compare you in seconds.",
    body: "Next to a clinic with a clean, modern site, yours decides who looks more trustworthy.",
    graphic: <CompareGraphic />,
  },
  {
    n: "03",
    tab: "Hard to book",
    title: "They leave if booking is hard.",
    body: "Every extra step between interest and appointment costs you real customers.",
    graphic: <TapsGraphic />,
  },
];

export function ProblemStack() {
  return (
    <section className="bg-paper-2 py-section defer-render" aria-labelledby="problem-title">
      <div className="container-site">
        <Folio folio="01" name="The problem" />
        <h2 id="problem-title" className="text-h2 mt-10 max-w-[18ch]">
          Your customers judge you before they ever call.
        </h2>
        <ol className="mt-14 md:mt-20 lg:pb-[22vh]">
          {problems.map((p, i) => (
            <li
              key={p.n}
              data-reveal
              className="stack-card bg-paper mb-6 rounded-xl shadow-[0_0_0_1px_var(--color-rule),0_-24px_48px_-36px_rgb(20_20_20/0.35)] lg:mb-0"
              style={{ "--stack-i": i } as React.CSSProperties}
            >
              {/* tab row: this is what stays visible once the next card covers this one */}
              <div className="label text-muted flex h-9 items-center justify-between border-b border-[var(--color-rule)] px-6 md:px-10">
                <span>
                  <span className="numeral text-accent">{p.n}</span> / 03 · {p.tab}
                </span>
                <span aria-hidden className="bg-accent size-1.5" />
              </div>
              <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:gap-10 lg:pt-12">
                <div className="lg:col-span-5">
                  <p className="font-display text-accent text-[4.5rem] leading-none md:text-[7rem]">
                    {p.n}
                  </p>
                  <h3 className="text-h2 mt-6 max-w-[12ch] lg:mt-8">{p.title}</h3>
                  <p className="text-lead text-muted mt-5 max-w-[34ch]">{p.body}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
                  <div className="bg-paper-2 h-[17rem] rounded-lg p-6 md:h-[20rem] md:p-8">
                    {p.graphic}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
