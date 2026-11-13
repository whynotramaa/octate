import { cn } from "@/lib/cn";

/**
 * Device frames drawn in CSS (no image weight). Put a screenshot (next/image with `fill`)
 * or any placeholder screen inside.
 *
 *   <Phone><Image src={shot} alt="..." fill sizes="300px" /></Phone>
 *   <Laptop url="clinic-name.in"><ScreenPlaceholder /></Laptop>
 */
export function Phone({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-ink shadow-device relative aspect-[9/19.5] rounded-[14%/6.5%] p-[3.5%]",
        className ?? "w-[260px]",
      )}
    >
      <div className="bg-paper relative h-full w-full overflow-hidden rounded-[11%/5%]">
        {children}
        <span
          aria-hidden
          className="bg-ink absolute top-2 left-1/2 h-[2.6%] w-[28%] -translate-x-1/2 rounded-full"
        />
      </div>
    </div>
  );
}

export function Laptop({
  className,
  url,
  children,
}: {
  className?: string;
  url?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className ?? "w-full max-w-[640px]")}>
      <div className="bg-ink shadow-device rounded-t-[14px] p-[10px] pb-[12px]">
        <div className="bg-paper relative aspect-[16/10] overflow-hidden rounded-[6px]">
          {url ? (
            <div className="border-rule bg-paper-2 flex h-7 items-center gap-2 border-b px-3">
              <span aria-hidden className="flex gap-1">
                <span className="bg-paper-3 size-2 rounded-full" />
                <span className="bg-paper-3 size-2 rounded-full" />
                <span className="bg-paper-3 size-2 rounded-full" />
              </span>
              <span className="bg-paper text-muted mx-auto rounded-full px-3 py-0.5 text-[0.625rem]">
                {url}
              </span>
            </div>
          ) : null}
          <div className={cn("relative", url ? "h-[calc(100%-1.75rem)]" : "h-full")}>
            {children}
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="relative mx-[-4%] h-3 rounded-b-[10px] bg-[linear-gradient(#2a2826,#141414)]"
      >
        <span className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-[#0c0c0c]" />
      </div>
    </div>
  );
}

/**
 * Placeholder "website" screen, drawn with blocks. Used until real screenshots exist.
 * Always pair with a Concept tag where it represents work.
 */
export function ScreenPlaceholder({
  variant = "clinic",
  compact = false,
}: {
  variant?: "clinic" | "spa" | "estate" | "cafe";
  compact?: boolean;
}) {
  const palette = {
    clinic: { bg: "#F2F5F4", ink: "#1D3B36", accent: "#3F7F72" },
    spa: { bg: "#F7F1EC", ink: "#3A2A24", accent: "#B98A72" },
    estate: { bg: "#F3F2EF", ink: "#1C1F26", accent: "#8C6D3F" },
    cafe: { bg: "#F5EFE6", ink: "#2B1D14", accent: "#C0562E" },
  }[variant];
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col"
      style={{ background: palette.bg, color: palette.ink }}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          compact ? "px-4 pt-9 pb-3" : "px-6 py-4",
        )}
      >
        <span className="h-2 w-12 rounded-full" style={{ background: palette.ink }} />
        <span className="h-4 w-14 rounded-full" style={{ background: palette.accent }} />
      </div>
      <div className={cn("flex flex-1 flex-col gap-2", compact ? "px-4" : "px-6 pt-4")}>
        <span className="h-3 w-4/5 rounded-full" style={{ background: palette.ink }} />
        <span className="h-3 w-3/5 rounded-full" style={{ background: palette.ink }} />
        <span
          className="mt-2 h-1.5 w-2/3 rounded-full opacity-40"
          style={{ background: palette.ink }}
        />
        <span className="h-1.5 w-1/2 rounded-full opacity-40" style={{ background: palette.ink }} />
        <span className="mt-3 h-6 w-24 rounded-full" style={{ background: palette.accent }} />
        <div className="mt-auto mb-4 grid grid-cols-2 gap-2">
          <span
            className="aspect-[4/3] rounded-md opacity-25"
            style={{ background: palette.accent }}
          />
          <span
            className="aspect-[4/3] rounded-md opacity-15"
            style={{ background: palette.ink }}
          />
        </div>
      </div>
    </div>
  );
}
