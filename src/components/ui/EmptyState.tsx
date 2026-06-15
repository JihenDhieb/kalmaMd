import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <Card>
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 size-12 rounded-full bg-primary-50 ring-1 ring-primary-100" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">{description}</p>
        {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </Card>
  );
}

