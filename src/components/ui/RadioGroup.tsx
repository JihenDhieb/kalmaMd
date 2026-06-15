import type { AssessmentOption } from "@/lib/types";

type RadioGroupProps = {
  legend: string;
  name: string;
  options: AssessmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
};

export function RadioGroup({ legend, name, onChange, options, required, value }: RadioGroupProps) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-foreground">{legend}</legend>
      <div className="grid gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer gap-3 rounded-md border border-stone-200 bg-white p-3 text-sm text-foreground hover:border-primary-300"
          >
            <input
              className="mt-1 size-4 accent-primary-500"
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={(event) => onChange?.(event.currentTarget.value)}
              required={required}
            />
            <span>
              <span className="block font-medium text-foreground">{option.label}</span>
              {option.helperText ? <span className="block text-stone-700">{option.helperText}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
