"use client";

import { useMemo, useState } from "react";
import { AdminNav } from "@/components/layout/AdminNav";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { adminPatients } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function AdminPatientsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const filteredPatients = useMemo(
    () => adminPatients.filter((patient) => patient.initials.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.admin} label={t("common.backToAdmin")} />
      <PageHeader
        eyebrow={t("common.admin")}
        title={t("adminPages.patientsTitle")}
        description={t("adminPages.patientsDescription")}
      />
      <AdminNav />
      <Card title={t("adminPages.patientSearch")} description={t("adminPages.patientSearchDescription")}>
        <label className="grid gap-2 text-sm font-semibold text-foreground" htmlFor="patient-search">
          {t("adminPages.searchPatients")}
          <input
            id="patient-search"
            className="min-h-11 rounded-md border border-stone-200 bg-white px-3 py-2 text-base text-foreground placeholder:text-stone-600"
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={t("adminPages.searchPlaceholder")}
            type="search"
            value={query}
          />
        </label>
      </Card>
      {filteredPatients.length === 0 ? (
        <EmptyState title={t("adminPages.noPatients")} description={t("adminPages.tryAnother")} />
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <StatusBadge status={patient.status} />
              <h2 className="mt-4 text-xl font-bold text-foreground">{patient.initials}</h2>
              <p className="mt-2 text-sm text-stone-600">
                {t("adminPages.lastActivity")}: {patient.lastActivity}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
