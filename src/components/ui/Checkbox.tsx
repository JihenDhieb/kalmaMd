import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  id: string;
  label: ReactNode;
  error?: string;
};

export function Checkbox({ error, id, label, ...props }: CheckboxProps) {
  return (
    <div className="grid gap-2">
      <label className="flex items-start gap-3 text-sm text-foreground" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? "true" : undefined}
          className="mt-1 size-4 rounded border-stone-200 accent-primary-500"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-accent-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
