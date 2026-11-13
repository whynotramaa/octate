import { cn } from "@/lib/cn";

/**
 * Form fields with label, hint and error state. Server-friendly (no JS needed to render).
 *
 *   <Field label="Your name" name="name" required />
 *   <Field label="What you need" name="plan" as="select" options={["Launch", "Signature"]} />
 *   <Field label="Message" name="message" as="textarea" error="Tell us a little more" />
 */
type BaseProps = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const control =
  "w-full rounded-md bg-paper px-4 text-body text-ink placeholder:text-muted/70 " +
  "shadow-[inset_0_0_0_1px_var(--color-rule)] transition-shadow duration-(--duration-micro) " +
  "hover:shadow-[inset_0_0_0_1px_var(--color-muted)] " +
  "focus:outline-none focus-visible:outline-none focus:shadow-[inset_0_0_0_1.5px_var(--color-ink),0_0_0_4px_rgb(107_30_46/0.12)] " +
  "aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_var(--color-accent)]";

export function Field(
  props: BaseProps &
    (
      | ({ as?: "input" } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">)
      | ({ as: "textarea" } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">)
      | ({ as: "select"; options: readonly string[]; placeholder?: string } & Omit<
          React.SelectHTMLAttributes<HTMLSelectElement>,
          "name"
        >)
    ),
) {
  const { label, name, hint, error, required, className } = props;
  const id = `f-${name}`;
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  let input: React.ReactNode;
  if (props.as === "textarea") {
    const { as: _as, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    input = (
      <textarea
        {...rest}
        {...shared}
        rows={rest.rows ?? 4}
        className={cn(control, "min-h-28 py-3")}
      />
    );
  } else if (props.as === "select") {
    const {
      as: _as,
      label: _l,
      hint: _h,
      error: _e,
      className: _c,
      options,
      placeholder,
      ...rest
    } = props;
    input = (
      <div className="relative">
        <select
          {...rest}
          {...shared}
          defaultValue={rest.defaultValue ?? ""}
          className={cn(control, "h-12 appearance-none pr-10")}
        >
          <option value="" disabled>
            {placeholder ?? "Choose one"}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="text-muted pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
        >
          <path
            d="m4 6 4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  } else {
    const { as: _as, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    input = <input {...rest} {...shared} className={cn(control, "h-12")} />;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-small font-semibold">
        {label}
        {required ? null : <span className="text-muted ml-1.5 font-normal">(optional)</span>}
      </label>
      {input}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-small text-accent flex items-center gap-2">
          <span aria-hidden className="bg-accent size-1.5 rounded-full" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Hidden honeypot field. Bots fill it; humans never see it. Reject submissions where it has a value. */
export function Honeypot({ name = "company_site" }: { name?: string }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={`hp-${name}`}>Leave this empty</label>
      <input id={`hp-${name}`} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
