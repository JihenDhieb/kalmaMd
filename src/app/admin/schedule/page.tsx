"use client";

import { AdminNav } from "@/components/layout/AdminNav";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { adminScheduleEntries } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function AdminSchedulePage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.admin} label={t("common.backToAdmin")} />
      <PageHeader
        eyebrow={t("common.admin")}
        title={t("adminPages.scheduleTitle")}
        description={t("adminPages.scheduleDescription")}
      />
      <AdminNav />
      <div className="grid gap-5 md:grid-cols-3">
        {adminScheduleEntries.map((entry) => (
          <Card key={entry.id}>
            <StatusBadge status={entry.status} />
            <h2 className="mt-4 text-xl font-bold text-foreground">{entry.providerName}</h2>
            <p className="mt-2 text-sm text-stone-600">{entry.date}</p>
            <div className="mt-4 grid gap-2">
              {entry.slots.length > 0 ? (
                entry.slots.map((slot) => (
                  <span key={slot} className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">
                    {slot}
                  </span>
                ))
              ) : (
                <p className="text-sm text-stone-600">{t("adminPages.noSlots")}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
