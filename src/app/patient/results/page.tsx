"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { SeveritySummary } from "@/components/patient/SeveritySummary";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { severitySummary } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function PatientResultsPage() {
  const { t } = useTranslation();
  const { session } = useMockSession();
  const isSubscribed = session.isSubscribed;

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientDashboard} label={t("common.backToDashboard")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("results.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("results.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-700">{t("results.description")}</p>
      </div>

      <SeveritySummary summary={severitySummary} />

      <Alert tone="danger">
        <strong>{t("results.safetyNoticeStrong")}</strong> {t("results.safetyNotice")}
      </Alert>

      <div className="relative">
        {!isSubscribed ? (
          <div className="absolute inset-0 z-10 grid place-items-center rounded-xl border border-accent-200 bg-background/75 p-6 backdrop-blur-sm">
            <div className="max-w-md rounded-xl border border-stone-200 bg-white p-6 text-center shadow-lg">
              <Badge tone="accent">{t("results.teaserBadge")}</Badge>
              <h2 className="mt-4 text-xl font-bold text-foreground">{t("results.softGateTitle")}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-700">{t("results.softGateDescription")}</p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
                href={routes.subscribe}
              >
                {t("results.unlock")}
              </Link>
            </div>
          </div>
        ) : null}

        <div className={`grid gap-5 md:grid-cols-2 ${!isSubscribed ? "pointer-events-none blur-[2px]" : ""}`}>
          <Card title={t("results.recommendations")} description={t("results.recommendationsDescription")}>
            <Badge tone="accent">{t("results.specialistReview")}</Badge>
            <p className="mt-3 text-sm leading-6 text-stone-700">{t("results.recommendationsCopy")}</p>
          </Card>
          <Card title={t("results.providerPreparation")} description={t("results.providerPreparationDescription")}>
            <Badge tone="accent">{t("results.ready")}</Badge>
            <p className="mt-3 text-sm leading-6 text-stone-700">{t("results.providerPreparationCopy")}</p>
          </Card>
        </div>
      </div>

      <Card title={t("results.carePlan")} description={t("results.carePlanDescription")}>
        <div className={`rounded-md border border-dashed border-stone-200 bg-stone-50 p-4 ${!isSubscribed ? "blur-[2px]" : ""}`}>
          <p className="text-sm leading-6 text-stone-700">{t("results.carePlanCopy")}</p>
        </div>
      </Card>

      {isSubscribed ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
            href={routes.booking}
          >
            {t("common.bookAppointment")}
          </Link>
          <Link
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
            href={routes.patientShop}
          >
            {t("results.productRecommendations")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
            href={routes.subscribe}
          >
            {t("results.unlock")}
          </Link>
        </div>
      )}
    </section>
  );
}
