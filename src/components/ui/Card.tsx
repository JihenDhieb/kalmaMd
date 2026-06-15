import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
};

export function Card({ children, className, description, title, ...props }: CardProps) {
  return (
    <section
      className={cn("rounded-lg border border-stone-200 bg-white p-6 shadow-sm", className)}
      {...props}
    >
      {title || description ? (
        <div className="mb-4">
          {title ? <h2 className="text-xl font-bold text-foreground">{title}</h2> : null}
          {description ? <p className="mt-2 text-sm leading-6 text-stone-700">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
