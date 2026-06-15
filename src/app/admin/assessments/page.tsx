"use client";

import { AdminNav } from "@/components/layout/AdminNav";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { adminAssessments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function AdminAssessmentsPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.admin} label={t("common.backToAdmin")} />
      <PageHeader
        eyebrow={t("common.admin")}
        title={t("adminPages.assessmentsTitle")}
        description={t("adminPages.assessmentsDescription")}
      />
      <AdminNav />
      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">{t("adminPages.assessmentTable")}</caption>
          <thead className="bg-primary-50 text-primary-900">
            <tr>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.assessment")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.patientInitials")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.submitted")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.severity")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {adminAssessments.map((assessment) => (
              <tr key={assessment.id}>
                <td className="px-4 py-4 font-medium text-foreground">{assessment.id}</td>
                <td className="px-4 py-4 text-stone-600">{assessment.patientInitials}</td>
                <td className="px-4 py-4 text-stone-600">{assessment.submittedAt}</td>
                <td className="px-4 py-4"><StatusBadge status={assessment.severity} /></td>
                <td className="px-4 py-4"><StatusBadge status={assessment.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card title={t("adminPages.clinicalNote")} description={t("adminPages.clinicalNoteDescription")} />
    </section>
  );
}
