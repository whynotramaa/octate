import { cn } from "@/lib/cn";

/**
 * The octate pixel system. Everything is drawn on an 8×8 grid (octate = eight).
 * Glyphs are rows of "X" (ink) and "." (empty). One SVG <path> per colour,
 * crispEdges, viewBox in cell units, so any size stays sharp and costs bytes, not requests.
 */

type Cell = readonly [x: number, y: number];

export const EIGHT = [
  "..XXXX..",
  ".X....X.",
  ".X....X.",
  "..XXXX..",
  ".X....X.",
  ".X....X.",
  ".X....X.",
  "..XXXX..",
] as const;

/** The order a pen would plot the 8: around the top loop, then the bottom. Last cell = launch. */
export const EIGHT_PLOT: readonly Cell[] = [
  [2, 3],
  [1, 2],
  [1, 1],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 1],
  [6, 2],
  [5, 3],
  [4, 3],
  [3, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [5, 7],
  [4, 7],
  [3, 7],
  [2, 7],
  [1, 6],
  [1, 5],
  [1, 4],
];

/** 5-pixel lowercase face for the wordmark (x-height 5, ascender 2). */
const LETTERS: Record<string, readonly string[]> = {
  o: [".XX.", "X..X", "X..X", "X..X", ".XX."],
  c: [".XX.", "X..X", "X...", "X..X", ".XX."],
  a: [".XX.", "...X", ".XXX", "X..X", ".XXX"],
  e: [".XX.", "X..X", "XXXX", "X...", ".XX."],
  t: [".X..", ".X..", "XXX.", ".X..", ".X..", ".X..", "..XX"],
};

export function cellsOf(rows: readonly string[], dx = 0, dy = 0): Cell[] {
  const out: Cell[] = [];
  rows.forEach((row, y) => [...row].forEach((c, x) => c === "X" && out.push([x + dx, y + dy])));
  return out;
}

export function pathOf(cells: readonly Cell[]): string {
  return cells.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join("");
}

/** Wordmark geometry, computed once at module load. */
const WORD = (() => {
  const ink: Cell[] = [];
  let x = 0;
  for (const ch of "octate") {
    const g = LETTERS[ch]!;
    const tall = g.length === 7;
    ink.push(...cellsOf(g, x, tall ? 0 : 2));
    // "t" has its hook in the 4th column, so it tucks one column tighter.
    x += g[0]!.length + (ch === "t" ? 0 : 1);
  }
  const stop: Cell = [x, 6];
  return { ink: pathOf(ink), stop: pathOf([stop]), width: x + 1, height: 7 };
})();

/**
 * "octate." in pixels, oxblood pixel as the full stop.
 * Size it by height (e.g. `h-[21px]`): multiples of 7px stay perfectly crisp.
 */
export function Wordmark({
  className,
  onDark = false,
  withStudio = false,
}: {
  className?: string;
  onDark?: boolean;
  withStudio?: boolean;
}) {
  return (
    <span className={cn("group/wm inline-flex items-end gap-2.5", className)}>
      <svg
        viewBox={`0 0 ${WORD.width} ${WORD.height}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label="octate studio"
        className="h-full w-auto"
      >
        <path d={WORD.ink} fill="currentColor" />
        <path
          d={WORD.stop}
          className={cn(
            onDark ? "fill-accent-on-dark" : "fill-accent",
            "group-hover/wm:animate-[blink_0.9s_steps(1)_2]",
          )}
        />
      </svg>
      {withStudio ? (
        <span
          aria-hidden
          className={cn("label leading-none", onDark ? "text-muted-dark" : "text-muted")}
        >
          studio
        </span>
      ) : null}
    </span>
  );
}

/** The 8 on its own. `tile` puts it in paper on an oxblood square (favicon, avatar). */
export function Mark({ className, tile = false }: { className?: string; tile?: boolean }) {
  const d = pathOf(cellsOf(EIGHT));
  if (tile) {
    return (
      <svg
        viewBox="0 0 10 10"
        shapeRendering="crispEdges"
        aria-hidden
        className={cn("size-8", className)}
      >
        <rect
          width="10"
          height="10"
          rx="2"
          className="fill-accent"
          shapeRendering="geometricPrecision"
        />
        <path d={d} transform="translate(1 1)" className="fill-paper" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden
      className={cn("size-8", className)}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/**
 * Small 8×8 pixel icons, drawn for this site (not an icon set).
 * Used where a generic icon would otherwise go.
 */
export const pixelIcons = {
  // stopwatch: fast without cutting corners
  fast: [
    "...XX...",
    "..XXXX..",
    ".X....X.",
    "X...X..X",
    "X...X..X",
    "X..X...X",
    ".X....X.",
    "..XXXX..",
  ],
  // price tag with a hole: one fixed price
  price: [
    "....XXXX",
    "...X..XX",
    "..X...XX",
    ".X.....X",
    "X.....X.",
    "X....X..",
    ".X..X...",
    "..XX....",
  ],
  // terminal prompt: real code
  code: [
    "........",
    "X.......",
    ".X......",
    "..X.....",
    ".X......",
    "X...XXXX",
    "........",
    "........",
  ],
  // key: you own everything
  key: [
    ".XXX....",
    "X...X...",
    "X.X.XXXX",
    "X...X.X.",
    ".XXX..XX",
    "........",
    "........",
    "........",
  ],
} as const;

export function PixelIcon({
  name,
  className,
}: {
  name: keyof typeof pixelIcons;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden
      className={cn("size-8", className)}
    >
      <path d={pathOf(cellsOf(pixelIcons[name]))} fill="currentColor" />
    </svg>
  );
}
