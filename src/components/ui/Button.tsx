import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary-500 text-white shadow-sm hover:bg-primary-600",
    secondary: "border border-primary-700 bg-white text-primary-800 hover:bg-primary-50",
    ghost: "text-primary-800 hover:bg-primary-50",
    danger: "bg-accent-700 text-white hover:bg-accent-800",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
