import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "accent" | "stone";
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  const tones = {
    primary: "bg-primary-50 text-primary-800 ring-primary-200",
    accent: "bg-accent-50 text-accent-800 ring-accent-200",
    stone: "bg-stone-100 text-stone-800 ring-stone-200",
  };

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

