"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { routes } from "@/lib/routes";

const adminLinks = [
  { labelKey: "common.patients", href: routes.adminPatients },
  { labelKey: "common.assessments", href: routes.adminAssessments },
  { labelKey: "common.appointments", href: routes.adminAppointments },
  { labelKey: "common.schedule", href: routes.adminSchedule },
];

export function AdminNav() {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-wrap gap-2 rounded-lg border border-stone-200 bg-white p-2" aria-label={t("layout.adminSections")}>
      {adminLinks.map((item) => (
        <Link
          key={item.href}
          className="rounded-md px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:text-primary-900"
          href={item.href}
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
