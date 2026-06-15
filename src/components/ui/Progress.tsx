type ProgressProps = {
  label: string;
  value: number;
  max: number;
};

export function Progress({ label, max, value }: ProgressProps) {
  const percent = Math.round((value / max) * 100);

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-stone-800">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-label={label} aria-valuemax={max} aria-valuemin={0} aria-valuenow={value}>
        <div className="h-full rounded-full bg-primary-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

