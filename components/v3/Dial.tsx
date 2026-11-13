import { TextLink } from "@/components/ui/TextLink";
import { Sprite } from "./Sprite";

/**
 * Process: "Live in 7 days." A dial of days turns as you scroll (CSS scroll timeline, no JS).
 * Desktop: the wheel sits off the right edge and turns through its left side.
 * Mobile: it sits below and turns through its top. Without scroll-timeline support the
 * steps simply show as a list.
 */
const DAYS = 8;
const STEP_DEG = 15;

const steps = [
  {
    from: 0,
    to: 0,
    day: "Day 0",
    title: "Call",
    body: "15 minutes. We learn your business and goals.",
  },
  {
    from: 1,
    to: 1,
    day: "Day 1",
    title: "Brief",
    body: "You send logo, photos and services. We send a one-page plan and a fixed quote.",
  },
  {
    from: 2,
    to: 6,
    day: "Day 2 to 6",
    title: "Build",
    body: "We design and build. You get a live preview link to review on your phone.",
  },
  {
    from: 7,
    to: 7,
    day: "Day 7",
    title: "Launch",
    body: "We go live, connect Google, and hand over everything. Free care starts.",
  },
];

/** progress (0..100%) at which day d is centred under the pointer */
const at = (d: number) => (d / (DAYS - 1)) * 100;
const half = 100 / (DAYS - 1) / 2;

const sparkle = ["...X...", "...X...", "..XXX..", "XXXXXXX", "..XXX..", "...X...", "...X..."].map(
  (r) => r.replace(/X/g, "D"),
);

export function DialV3() {
  return (
    <section aria-labelledby="dial-title" className="dial-track bg-accent text-accent-ink relative">
      <div className="dial-pin">
        <div className="container-site relative z-10 w-full">
          <div className="max-w-[30rem]">
            <p className="text-[0.875rem] font-semibold">How it works</p>
            <h2
              id="dial-title"
              className="mt-5 flex items-start gap-4 text-[clamp(3rem,1.6rem+4.6vw,6.5rem)] leading-[0.95]"
            >
              <span>
                Live in
                <br />7 days.
              </span>
              <Sprite rows={sparkle} className="mt-[0.1em] h-[0.5em] w-auto" />
            </h2>

            <div className="dial-steps mt-10 grid">
              {steps.map((s, i) => {
                const a = Math.max(0, at(s.from) - half);
                const b = Math.min(100, at(s.to) + half);
                return (
                  <div
                    key={s.title}
                    className="dial-step col-start-1 row-start-1"
                    data-first={i === 0 ? "" : undefined}
                    data-last={i === steps.length - 1 ? "" : undefined}
                    style={{ "--a": `${a}%`, "--b": `${b}%` } as React.CSSProperties}
                  >
                    <p className="text-[0.875rem] font-semibold">{s.day}</p>
                    <p className="mt-1 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">
                      {s.title}
                    </p>
                    <p className="mt-2 max-w-[34ch] text-[1.0625rem] leading-[1.5] opacity-80">
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <TextLink href="/process" arrow>
                How we work
              </TextLink>
            </div>
          </div>
        </div>

        {/* the dial */}
        <div aria-hidden className="dial-wheel">
          {[-180, -90, 0, 90, 180].map((d) => (
            <span
              key={d}
              className="dial-ring"
              style={{ "--d": `${d}px` } as React.CSSProperties}
            />
          ))}
          {Array.from({ length: DAYS }, (_, d) => {
            const a = Math.max(0, at(d) - half);
            const b = Math.min(100, at(d) + half);
            return (
              <span
                key={d}
                className="dial-slot"
                style={{ "--i": d, "--step": `${STEP_DEG}deg` } as React.CSSProperties}
              >
                <span className="dial-upright">
                  <span
                    className="dial-label"
                    data-first={d === 0 ? "" : undefined}
                    data-last={d === DAYS - 1 ? "" : undefined}
                    style={{ "--a": `${a}%`, "--b": `${b}%` } as React.CSSProperties}
                  >
                    {d}
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
