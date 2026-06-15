"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Badge } from "@/components/ui/Badge";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  const normalized = status.toLowerCase();
  const tone =
    normalized.includes("high") ||
    normalized.includes("review") ||
    normalized.includes("limited") ||
    normalized.includes("warning")
      ? "accent"
      : normalized.includes("inactive") || normalized.includes("full")
        ? "stone"
        : "primary";

  return <Badge tone={tone}>{t(`status.${status}`)}</Badge>;
}
