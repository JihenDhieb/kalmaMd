"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { routes } from "@/lib/routes";
import type { Appointment } from "@/lib/types";

type ProviderNote = {
  id: string;
  author: string;
  date: string;
  note: string;
};

type ProviderAppointmentDetailClientProps = {
  appointment: Appointment;
  notes: ProviderNote[];
};

export function ProviderAppointmentDetailClient({ appointment, notes }: ProviderAppointmentDetailClientProps) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <BackLink href={routes.providerDashboard} label={t("common.backToProviderDashboard")} />
      <PageHeader
        eyebrow={t("providerArea.providerReview")}
        title={t("providerArea.detailsTitle")}
        description={t("providerArea.detailsDescription")}
      />
      <Alert tone="warning">{t("providerArea.productionAccess")}</Alert>
      <Card title={t(appointmentTypeKey(appointment.id))} description={t("providerArea.appointmentSummary")}>
        <dl className="grid gap-4 text-sm text-stone-600 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-foreground">{t("providerArea.patientInitials")}</dt>
            <dd className="mt-1">{appointment.patientInitials}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">{t("providerArea.appointmentStatus")}</dt>
            <dd className="mt-1">{t(`status.${appointment.status}`)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">{t("providerArea.assessmentStatus")}</dt>
            <dd className="mt-1">{t(`status.${appointment.assessmentStatus}`)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">{t("providerArea.date")}</dt>
            <dd className="mt-1">
              {appointment.date}, {appointment.time}
            </dd>
          </div>
        </dl>
      </Card>
      <Card title={t("providerArea.notesHistory")} description={t("providerArea.notesDescription")}>
        <ul className="grid gap-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded-md border border-stone-200 p-4">
              <p className="text-sm font-semibold text-foreground">{t(noteAuthorKey(note.author))}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-700">{note.date}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{t(noteKey(note.id))}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Link
        className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        href={routes.consultation}
      >
        {t("providerArea.startVideo")}
      </Link>
    </section>
  );
}

function appointmentTypeKey(id: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentPostOp";
  if (id === "apt-004") return "mock.providerDryEye";
  return "mock.appointmentVirtual";
}

function noteKey(id: string) {
  return id === "note-002" ? "providerArea.noteBookingPrepared" : "providerArea.noteAssessmentReady";
}

function noteAuthorKey(author: string) {
  return author === "Care team" ? "providerArea.careTeam" : "providerArea.careTeam";
}
