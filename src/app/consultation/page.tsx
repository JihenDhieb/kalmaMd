"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function ConsultationPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <BackLink href={routes.patientDashboard} label={t("common.backToDashboard")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("consultation.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("consultation.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {t("consultation.description")}
        </p>
      </div>
      <Alert tone="info">{t("consultation.notice")}</Alert>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <Card title={t("consultation.waiting")} description={t("consultation.roomReady")}>
          <div className="grid aspect-video place-items-center rounded-lg border border-stone-200 bg-primary-50 text-center">
            <div>
              <p className="text-lg font-bold text-primary-800">{t("consultation.camera")}</p>
              <p className="mt-2 text-sm text-stone-600">{t("consultation.waitingJoin")}</p>
            </div>
          </div>
          <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50" type="button">
            {t("consultation.end")}
          </button>
        </Card>
        <div className="grid gap-5">
          <Card title={t("consultation.participant")}>
            <p className="text-sm text-stone-600">{t("consultation.patientInitials")}: {appointments[0].patientInitials}</p>
            <p className="mt-2 text-sm text-stone-600">{t("consultation.provider")}: {appointments[0].providerName}</p>
          </Card>
          <Card title={t("consultation.summary")}>
            <p className="text-sm leading-6 text-stone-600">{t("mock.severityDescription")}</p>
          </Card>
          <Card title={t("consultation.notes")}>
            <p className="text-sm leading-6 text-stone-600">{t("consultation.notesCopy")}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
