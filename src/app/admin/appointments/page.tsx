"use client";

import Link from "next/link";
import { AdminNav } from "@/components/layout/AdminNav";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function AdminAppointmentsPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.admin} label={t("common.backToAdmin")} />
      <PageHeader
        eyebrow={t("common.admin")}
        title={t("adminPages.appointmentsTitle")}
        description={t("adminPages.appointmentsDescription")}
      />
      <AdminNav />
      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">{t("adminPages.appointmentTable")}</caption>
          <thead className="bg-primary-50 text-primary-900">
            <tr>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.patientInitials")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.type")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.date")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.status")}</th>
              <th className="px-4 py-3 font-semibold" scope="col">{t("adminPages.details")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-4 py-4 font-medium text-foreground">{appointment.patientInitials}</td>
                <td className="px-4 py-4 text-stone-600">{t(appointmentTypeKey(appointment.id))}</td>
                <td className="px-4 py-4 text-stone-600">{appointment.date}, {appointment.time}</td>
                <td className="px-4 py-4"><StatusBadge status={appointment.status} /></td>
                <td className="px-4 py-4">
                  <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={`${routes.providerAppointment}/${appointment.id}`}>
                    {t("adminPages.view")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function appointmentTypeKey(id: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentFollowUp";
  if (id === "apt-004") return "mock.providerDryEye";
  return "mock.appointmentVirtual";
}
