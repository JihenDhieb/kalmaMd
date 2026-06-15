import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  hideLabel?: boolean;
  options: readonly (string | { label: string; value: string })[];
};

export function Select({ className, error, hideLabel, id, label, options, ...props }: SelectProps) {
  return (
    <div className="grid gap-2">
      <label className={cn("text-sm font-semibold text-foreground", hideLabel && "sr-only")} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "min-h-11 rounded-md border border-stone-200 bg-white px-3 py-2 text-base text-foreground shadow-sm hover:border-primary-400 focus-visible:border-primary-500",
          error && "border-accent-700",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={typeof option === "string" ? option : option.value} value={typeof option === "string" ? option : option.value}>
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-accent-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
