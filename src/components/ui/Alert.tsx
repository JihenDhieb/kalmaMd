import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "info" | "success" | "warning" | "danger";
  status?: "status" | "alert";
};

export function Alert({ className, status, tone = "info", ...props }: AlertProps) {
  const tones = {
    info: "border-primary-200 bg-primary-50 text-primary-900",
    success: "border-primary-300 bg-primary-50 text-primary-900",
    warning: "border-accent-200 bg-accent-50 text-accent-900",
    danger: "border-accent-200 bg-accent-50 text-accent-900",
  };

  return (
    <div
      className={cn("rounded-md border p-4 text-sm leading-6", tones[tone], className)}
      role={status}
      {...props}
    />
  );
}
