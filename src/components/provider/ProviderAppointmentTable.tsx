"use client";

import type { Appointment } from "@/lib/types";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/lib/routes";
import Link from "next/link";

export function ProviderAppointmentTable({ appointments }: { appointments: Appointment[] }) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">{t("providerArea.queueCaption")}</caption>
        <thead className="bg-primary-50 text-primary-900">
          <tr>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.patientInitials")}</th>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.workflow")}</th>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.assessment")}</th>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.date")}</th>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.status")}</th>
            <th className="px-4 py-3 font-semibold" scope="col">{t("providerArea.action")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-4 py-4 font-medium text-foreground">{appointment.patientInitials}</td>
              <td className="px-4 py-4 text-stone-700">{t(appointmentTypeKey(appointment.id))}</td>
              <td className="px-4 py-4 text-stone-700">{t(`status.${appointment.assessmentStatus}`)}</td>
              <td className="px-4 py-4 text-stone-700">
                {appointment.date}, {appointment.time}
              </td>
              <td className="px-4 py-4">
                <Badge tone={appointment.status === "Ready for review" ? "accent" : "primary"}>
                  {t(`status.${appointment.status}`)}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <Link
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-stone-200 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                  href={`${routes.providerAppointment}/${appointment.id}`}
                >
                  {t("providerArea.viewDetails")}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function appointmentTypeKey(id: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentPostOp";
  if (id === "apt-004") return "mock.providerDryEye";
  return "mock.appointmentVirtual";
}
