"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { symptomEntries } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function SymptomTrackerPage() {
  const { t } = useTranslation();
  const averageDryness =
    symptomEntries.reduce((total, entry) => total + entry.dryness, 0) / Math.max(symptomEntries.length, 1);

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientDashboard} label={t("common.backToDashboard")} />
      <PageHeader
        eyebrow={t("symptomTracker.eyebrow")}
        title={t("symptomTracker.title")}
        description={t("symptomTracker.trackerDescription")}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label={t("symptomTracker.entriesLabel")} value={String(symptomEntries.length)} description={t("symptomTracker.symptomLogs")} />
        <StatCard label={t("symptomTracker.averageDryness")} value={averageDryness.toFixed(1)} description={t("symptomTracker.scoreOutOfFive")} />
        <StatCard label={t("symptomTracker.latestTrigger")} value={t(triggerKey(symptomEntries[0]?.trigger))} description={t("symptomTracker.recentPattern")} />
      </div>

      {symptomEntries.length === 0 ? (
        <EmptyState title={t("symptomTracker.emptyTitle")} description={t("symptomTracker.emptyDescription")} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full border-collapse text-left text-sm">
            <caption className="sr-only">{t("symptomTracker.historyCaption")}</caption>
            <thead className="bg-primary-50 text-primary-900">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">{t("symptomTracker.date")}</th>
                <th className="px-4 py-3 font-semibold" scope="col">{t("symptomTracker.dryness")}</th>
                <th className="px-4 py-3 font-semibold" scope="col">{t("symptomTracker.irritation")}</th>
                <th className="px-4 py-3 font-semibold" scope="col">{t("symptomTracker.trigger")}</th>
                <th className="px-4 py-3 font-semibold" scope="col">{t("symptomTracker.severity")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {symptomEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-4 text-foreground">{entry.date}</td>
                  <td className="px-4 py-4 text-stone-600">{entry.dryness}/5</td>
                  <td className="px-4 py-4 text-stone-600">{entry.irritation}/5</td>
                  <td className="px-4 py-4 text-stone-600">{t(triggerKey(entry.trigger))}</td>
                  <td className="px-4 py-4"><StatusBadge status={entry.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function triggerKey(trigger?: string) {
  if (!trigger) {
    return "symptomTracker.none";
  }

  return {
    "Screen use": "mock.triggerScreen",
    "Air conditioning": "mock.triggerAir",
    "Outdoor wind": "mock.triggerWind",
  }[trigger] ?? trigger;
}
