"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export function Stepper({ currentStep, steps }: StepperProps) {
  const { t } = useTranslation();

  return (
    <ol className="grid gap-3 sm:grid-cols-3" aria-label={t("assessment.progress")}>
      {steps.map((step, index) => {
        const isCurrent = index + 1 === currentStep;
        const isComplete = index + 1 < currentStep;

        return (
          <li
            key={step}
            className={cn(
              "rounded-md border p-3 text-sm font-medium",
              isCurrent && "border-primary-600 bg-primary-50 text-primary-900",
              isComplete && "border-primary-200 bg-white text-primary-800",
              !isCurrent && !isComplete && "border-stone-200 bg-white text-stone-700",
            )}
            aria-current={isCurrent ? "step" : undefined}
          >
            <span className="block text-xs uppercase tracking-wide">{t("common.step")} {index + 1}</span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
