import { cn } from "@/lib/cn";

/**
 * Tag: small label on cards and meta rows.
 *   <Tag>Dental</Tag>
 *   <Tag variant="concept" />   -> required on every concept card, page and thumbnail
 *
 * Badge: accent pill for emphasis ("Most chosen").
 *   <Badge>Most chosen</Badge>
 */
export function Tag({
  variant = "default",
  onDark = false,
  className,
  children,
}: {
  variant?: "default" | "concept";
  onDark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (variant === "concept") {
    return (
      <span
        className={cn(
          "label inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem]",
          onDark
            ? "bg-ink/80 text-paper shadow-[inset_0_0_0_1px_var(--color-rule-dark)] backdrop-blur-sm"
            : "bg-paper/90 text-ink shadow-[inset_0_0_0_1px_var(--color-ink)] backdrop-blur-sm",
          className,
        )}
      >
        <span aria-hidden className="size-1.5 rounded-full border border-current" />
        {children ?? "Concept"}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem]",
        onDark ? "bg-ink-2 text-muted-dark" : "bg-paper-2 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "label bg-accent text-accent-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem]",
        className,
      )}
    >
      {children}
    </span>
  );
}
