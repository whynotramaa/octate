import { spritePalette } from "./sprites";

/** Renders a pixel sprite as one <path> per colour (crisp, a few hundred bytes). */
export function Sprite({
  rows,
  className,
  label,
}: {
  rows: readonly string[];
  className?: string;
  label?: string;
}) {
  const byColour: Record<string, string> = {};
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (spritePalette[c]) byColour[c] = (byColour[c] ?? "") + `M${x} ${y}h1v1h-1z`;
    }),
  );
  const w = rows[0]?.length ?? 0;
  return (
    <svg
      viewBox={`0 0 ${w} ${rows.length}`}
      shapeRendering="crispEdges"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Object.entries(byColour).map(([c, d]) => (
        <path key={c} d={d} fill={spritePalette[c]} />
      ))}
    </svg>
  );
}
