import { cn } from "@/lib/cn";

/**
 * Card: quiet surface. `interactive` adds the hover lift used on clickable cards.
 *   <Card>...</Card>
 *   <Card tone="raised" interactive>...</Card>
 */
export function Card({
  tone = "paper-2",
  interactive = false,
  as: Tag = "div",
  className,
  children,
}: {
  tone?: "paper" | "paper-2" | "raised" | "ink";
  interactive?: boolean;
  as?: "div" | "article" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    paper: "bg-paper shadow-hairline",
    "paper-2": "bg-paper-2",
    raised: "bg-paper shadow-hairline",
    ink: "bg-ink-2 text-paper",
  } as const;
  return (
    <Tag
      className={cn(
        "relative rounded-lg",
        tones[tone],
        interactive &&
          "hover:shadow-lift transition-[translate,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
