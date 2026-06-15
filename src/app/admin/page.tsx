"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { adminAssessments, adminPatients, adminScheduleEntries, appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const adminLinks = [
  { titleKey: "common.patients", descriptionKey: "admin.patientsDescription", href: routes.adminPatients, icon: "people", value: adminPatients.length },
  { titleKey: "common.appointments", descriptionKey: "admin.appointmentsDescription", href: routes.adminAppointments, icon: "calendar", value: appointments.length },
  { titleKey: "common.schedule", descriptionKey: "admin.scheduleDescription", href: routes.adminSchedule, icon: "clock" },
  { titleKey: "common.profile", descriptionKey: "admin.profileDescription", href: routes.adminProfile, icon: "user" },
];

export default function AdminPage() {
  const { t } = useTranslation();
  const { session } = useMockSession();

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(58,58,58,0.08)] sm:p-7">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-5">
            <span className="grid size-20 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
              <AdminIcon icon="shield-plus" large />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("admin.overview")}</p>
              <h1 className="mt-1 text-4xl font-black tracking-tight text-primary-900 sm:text-5xl">{t("admin.title")}</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">
                {t("admin.description")}
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:w-72">
            <Link
              className="flex w-full items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-primary-200 hover:bg-primary-50"
              href={routes.adminProfile}
            >
              <span className="flex items-center gap-3">
                <span className="relative grid size-14 place-items-center rounded-full bg-primary-50 text-lg font-black text-primary-700 ring-1 ring-primary-100">
                  {getInitials(session.displayName)}
                  <span className="absolute bottom-1 right-0 size-3 rounded-full bg-primary-500 ring-2 ring-white" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-foreground">{session.displayName || "Admin User"}</span>
                  <span className="mt-0.5 block text-sm text-stone-700">{t("profile.adminAccount")}</span>
                </span>
              </span>
              <span className="text-primary-700">
                <AdminIcon icon="chevron-down" />
              </span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link className="rounded-md border border-primary-200 bg-white px-3 py-2 text-center text-xs font-bold text-primary-700 hover:bg-primary-50" href={routes.adminAssessment}>
                {t("admin.takeAssessment")}
              </Link>
              <Link className="rounded-md bg-primary-500 px-3 py-2 text-center text-xs font-bold text-white hover:bg-primary-600" href={routes.consultation}>
                {t("admin.startAdhoc")}
              </Link>
            </div>
          </div>
        </header>

        <section className="flex items-center gap-5 rounded-xl border border-accent-200 bg-accent-50 px-5 py-5 text-foreground shadow-sm ring-1 ring-accent-100" aria-label={t("admin.accessNoticeLabel")}>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-accent-600 ring-1 ring-accent-100">
            <AdminIcon icon="shield" />
          </span>
          <p className="text-base leading-7">
            {t("admin.accessNotice")}
          </p>
        </section>

        <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
          <aside className="grid gap-4">
            {adminLinks.map((item) => (
              <Link
                key={item.href}
                className="group flex min-h-28 items-center gap-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
                href={item.href}
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <AdminIcon icon={item.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold text-foreground">{t(item.titleKey)}</span>
                  {item.value ? <span className="mt-1 block text-3xl font-black text-primary-900">{item.value}</span> : null}
                  {!item.value ? <span className="mt-1 block text-sm leading-6 text-stone-700">{t(item.descriptionKey)}</span> : null}
                </span>
                <span className="text-2xl font-bold text-primary-700 group-hover:translate-x-1">&gt;</span>
              </Link>
            ))}
          </aside>

          <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 border-b border-stone-200 pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-5">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <AdminIcon icon="clipboard" />
                </span>
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-primary-900">{t("common.assessments")}</h2>
                  <p className="mt-2 text-base leading-7 text-stone-700">{t("admin.assessmentsDescription")}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-4xl font-black text-primary-900">{adminAssessments.length}</p>
                <p className="mt-1 text-base text-stone-700">{t("common.assessments")}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-foreground">{t("admin.activityOverview")}</h3>
              <ActivityChart />
            </div>

            <div className="mt-8 flex flex-col gap-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <AdminIcon icon="clipboard" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t("common.assessments")}</h3>
                  <p className="mt-1 max-w-lg text-sm leading-6 text-stone-700">{t("admin.assessmentsDescription")}</p>
                </div>
              </div>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-600"
                href={routes.adminAssessments}
              >
                {t("admin.open", { section: t("common.assessments") })}
                <span aria-hidden="true">&gt;</span>
              </Link>
            </div>
          </section>
        </div>

        <p className="text-sm text-stone-600">{t("admin.scheduleEntries", { count: adminScheduleEntries.length })}</p>
      </div>
    </section>
  );
}

function ActivityChart() {
  const { t } = useTranslation();
  const bars = [
    { labelKey: "common.patients", value: adminPatients.length },
    { labelKey: "common.assessments", value: adminAssessments.length },
    { labelKey: "common.appointments", value: appointments.length },
  ];
  const max = 4;

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="relative min-w-[34rem] pt-4">
        <div className="absolute inset-x-9 top-4 grid h-56 grid-rows-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="border-t border-dashed border-stone-200" />
          ))}
        </div>
        <div className="grid grid-cols-[2rem_1fr] gap-4">
          <div className="grid h-56 grid-rows-5 text-sm text-stone-700">
            {[4, 3, 2, 1, 0].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
          <div className="relative flex h-56 items-end justify-around border-b border-l border-primary-600 pl-6">
            {bars.map((bar) => (
              <div key={bar.labelKey} className="flex w-28 flex-col items-center">
                <div
                  className="w-full rounded-t-sm bg-primary-500 shadow-sm"
                  style={{ height: `${(bar.value / max) * 100}%` }}
                  aria-label={`${bar.value} ${t(bar.labelKey)}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ml-12 mt-4 flex min-w-[30rem] justify-around text-base text-stone-700">
          {bars.map((bar) => (
            <span key={bar.labelKey}>{t(bar.labelKey)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getInitials(displayName: string) {
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "AU";
}

function AdminIcon({ icon, large = false }: { icon: string; large?: boolean }) {
  const size = large ? "size-10" : "size-7";

  if (icon === "chevron-down") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }

  if (icon === "shield-plus") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v7M8.5 11.5h7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "clipboard") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M9 5h6l1 2h3v14H5V7h3l1-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5V5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M8 12h3M13 12h3M8 16h3M13 16h3" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v6l4 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "people") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20a6 6 0 0 1 12 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M16 10a3 3 0 0 1 3 3M17 20h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
