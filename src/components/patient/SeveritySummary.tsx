"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { SeveritySummary as SeveritySummaryType } from "@/lib/types";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";

export function SeveritySummary({ summary }: { summary: SeveritySummaryType }) {
  const { t } = useTranslation();
  void summary;

  return (
    <Alert tone="warning">
      <div className="grid gap-2">
        <Badge tone="accent">{t("mock.severityLabel")}</Badge>
        <p>{t("mock.severityDescription")}</p>
      </div>
    </Alert>
  );
}
