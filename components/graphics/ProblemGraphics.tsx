/**
 * Problem 02 and 03 graphics. CSS animations start when the card is revealed
 * ([data-revealed] on an ancestor) and play once. Reduced motion shows the end state.
 */

/** 02: two results side by side. A pixel cursor drifts past the dated site and taps the clean one. */
export function CompareGraphic() {
  return (
    <div className="flex h-full flex-col" aria-hidden>
      <p className="label text-muted">Which one would you call?</p>
      <div className="relative mt-4 grid flex-1 grid-cols-2 gap-3 overflow-hidden">
        {/* dated site */}
        <div className="dim-run flex flex-col overflow-hidden rounded-md bg-[#e6e6e6] p-3 text-[#555] shadow-[inset_0_0_0_1px_var(--color-rule)]">
          <span className="h-2 w-full bg-[#9aa7b5]" />
          <span className="mt-3 text-center font-[Times,serif] text-[0.8rem] leading-tight">
            Welcome to Our Clinic!!
          </span>
          <span className="mx-auto mt-2 h-8 w-10 bg-[#c9c9c9]" />
          <span className="mt-2 h-1 w-full bg-[#bdbdbd]" />
          <span className="mt-1 h-1 w-4/5 bg-[#bdbdbd]" />
          <span className="mt-auto self-center font-[Times,serif] text-[0.6rem] text-[#3355cc] underline">
            click here
          </span>
        </div>
        {/* clean site */}
        <div className="pick-run bg-paper flex flex-col overflow-hidden rounded-md p-3 shadow-[inset_0_0_0_1px_var(--color-rule)]">
          <span className="flex items-center justify-between">
            <span className="font-display text-[0.7rem]">clinic</span>
            <span className="bg-accent h-2 w-5 rounded-full" />
          </span>
          <span className="font-display mt-3 text-[0.95rem] leading-[1.02]">
            Calm care, booked in a tap.
          </span>
          <span className="bg-paper-3 mt-2 h-8 rounded-t-full" />
          <span className="bg-accent mt-auto h-3.5 w-14 rounded-full" />
        </div>
        {/* pixel arrow cursor */}
        <div className="cursor-run pointer-events-none absolute inset-0 [transform:translate(22%,62%)]">
          <svg
            viewBox="0 0 8 10"
            shapeRendering="crispEdges"
            className="absolute top-0 left-0 h-5 w-4"
          >
            <path
              d="M0 0h1v1H0zM0 1h2v1H0zM0 2h3v1H0zM0 3h4v1H0zM0 4h5v1H0zM0 5h6v1H0zM0 6h4v1H0zM0 7h1v1H0zM2 7h2v1H2zM3 8h2v1H3z"
              className="fill-ink"
            />
            <path
              d="M1 1h1v1H1zM1 2h1v1H1zM2 2h1v1H2zM1 3h3v1H1zM1 4h3v1H1zM1 5h1v1H1zM2 5h2v1H2zM1 6h1v1H1z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** 03: an editor's red pen. Four wasted steps get struck out, two stay. Nothing changes height. */
const rows: { old: string; next?: string }[] = [
  { old: "Find your number", next: "Tap Book" },
  { old: "Call, no answer" },
  { old: "Send a message" },
  { old: "Wait for a reply" },
  { old: "Agree a time" },
  { old: "Finally booked", next: "Pick a time. Booked." },
];

export function TapsGraphic() {
  return (
    <div className="flex h-full flex-col" aria-hidden>
      <div className="flex items-start justify-between">
        <span className="label text-muted">Taps to book</span>
        <span className="numeral relative -mt-2 inline-grid text-[2.6rem] leading-none">
          <span className="count-out col-start-1 row-start-1">6</span>
          <span className="count-in text-accent col-start-1 row-start-1">2</span>
        </span>
      </div>
      <ol className="mt-3 space-y-1.5 text-[0.8125rem]">
        {rows.map((r, i) => (
          <li
            key={r.old}
            style={{ "--i": i } as React.CSSProperties}
            className={
              (r.next ? "keep-run " : "strike-run ") +
              "bg-paper relative flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 shadow-[inset_0_0_0_1px_var(--color-rule)]"
            }
          >
            <span className="numeral text-[0.625rem] opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
            {r.next ? (
              <span className="inline-grid">
                <span className="label-out col-start-1 row-start-1">{r.old}</span>
                <span className="label-in col-start-1 row-start-1">{r.next}</span>
              </span>
            ) : (
              <span className="relative">
                {r.old}
                <span className="strike-line bg-accent absolute top-1/2 -right-1 -left-1 h-[1.5px] origin-left" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
