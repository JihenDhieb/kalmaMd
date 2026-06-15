import { Card } from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string;
  description?: string;
};

export function StatCard({ description, label, value }: StatCardProps) {
  return (
    <Card>
      <p className="text-sm font-semibold text-stone-600">{label}</p>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p> : null}
    </Card>
  );
}

