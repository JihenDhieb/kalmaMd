"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { routes } from "@/lib/routes";

export function StartAssessmentLink() {
  const { t } = useTranslation();
  const { session } = useMockSession();
  const href = session.isAuthenticated && session.role === "Patient" ? routes.assessment : routes.login;

  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
      href={href}
    >
      {t("home.startAssessment")}
      <span aria-hidden="true">&gt;</span>
    </Link>
  );
}
