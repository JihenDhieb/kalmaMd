import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Input({
  className,
  error,
  hideLabel,
  hint,
  id,
  label,
  leadingIcon,
  trailingIcon,
  ...props
}: InputProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="grid gap-2">
      <label className={cn("text-sm font-semibold text-foreground", hideLabel && "sr-only")} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-primary-800">
            {leadingIcon}
          </span>
        ) : null}
        <input
          id={id}
          aria-describedby={descriptionId}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "min-h-11 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base text-foreground shadow-sm transition-colors placeholder:text-stone-600 hover:border-primary-400 focus-visible:border-primary-500",
            leadingIcon ? "pl-12" : undefined,
            trailingIcon ? "pr-12" : undefined,
            error && "border-accent-700",
            className,
          )}
          {...props}
        />
        {trailingIcon ? (
          <span className="absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-primary-800">
            {trailingIcon}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-stone-700">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-accent-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
