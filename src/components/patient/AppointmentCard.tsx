"use client";

import type { Appointment } from "@/lib/types";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { t } = useTranslation();

  return (
    <Card aria-labelledby={`${appointment.id}-heading`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id={`${appointment.id}-heading`} className="text-lg font-bold text-foreground">
            {t(appointmentTypeKey(appointment.id))}
          </h2>
          <p className="mt-2 text-sm text-stone-700">
            {appointment.date}, {appointment.time}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone-600">{t("providerArea.appointmentSummary")}</p>
        </div>
        <Badge tone="primary">{t(`status.${appointment.status}`)}</Badge>
      </div>
    </Card>
  );
}

function appointmentTypeKey(id: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentPostOp";
  if (id === "apt-004") return "mock.providerDryEye";
  return "mock.appointmentVirtual";
}
