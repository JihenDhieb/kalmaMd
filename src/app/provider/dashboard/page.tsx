"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const providerRows = [
  ...appointments,
  {
    id: "apt-003",
    patientInitials: "SC",
    appointmentType: "mock.appointmentPostOp",
    date: "June 17, 2026",
    time: "11:15 AM",
    status: "Completed",
    assessmentStatus: "Submitted",
  },
  {
    id: "apt-004",
    patientInitials: "RB",
    appointmentType: "mock.providerDryEye",
    date: "June 16, 2026",
    time: "4:45 PM",
    status: "Completed",
    assessmentStatus: "Submitted",
  },
] as const;

const stats = [
  { titleKey: "providerArea.readyReview", value: "1", textKey: "common.assessments", icon: "document", href: `${routes.providerAppointment}/${appointments[1].id}` },
  { titleKey: "providerArea.scheduled", value: "1", textKey: "providerArea.upcomingVisits", icon: "calendar", href: `${routes.providerAppointment}/${appointments[0].id}` },
  { titleKey: "providerArea.consultationsToday", value: "0", textKey: "providerArea.completed", icon: "people", href: routes.consultation },
];

const updates = [
  { titleKey: "providerArea.newAssessment", detailKey: "providerArea.newAssessmentDetail", time: "10:30 AM", tone: "primary" },
  { titleKey: "providerArea.assessmentReady", detailKey: "providerArea.assessmentReadyDetail", time: "2:00 PM", tone: "accent" },
];

export default function ProviderDashboardPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8">
      <div className="grid gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("providerArea.eyebrow")}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">{t("providerArea.dashboard")}</h1>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              {t("providerArea.description")}
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 w-fit items-center rounded-md border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-700 hover:bg-primary-50"
            href={routes.providerProfile}
          >
            {t("providerArea.profile")}
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-accent-200 bg-accent-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full text-accent-600">
              <ProviderIcon icon="shield" />
            </span>
            <p className="text-sm leading-6 text-foreground">
              {t("providerArea.accessNotice")}
            </p>
          </div>
          <Link className="text-sm font-bold text-accent-700 hover:text-accent-900 hover:underline" href={routes.terms}>
            {t("providerArea.learnMore")}
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <Link
              key={stat.titleKey}
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
              href={stat.href}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                    <ProviderIcon icon={stat.icon} />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">{t(stat.titleKey)}</h2>
                    <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-stone-700">{t(stat.textKey)}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-stone-700 group-hover:text-primary-700">&gt;</span>
              </div>
            </Link>
          ))}
        </div>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-primary-700">
                <ProviderIcon icon="queue" />
              </span>
              <h2 className="text-lg font-bold text-foreground">{t("providerArea.queue")}</h2>
            </div>
            <Link className="rounded-md border border-primary-200 px-3 py-2 text-sm font-bold text-primary-700 hover:bg-primary-50" href={routes.providerDashboard}>
              {t("providerArea.viewAll")}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <caption className="sr-only">{t("providerArea.queueCaption")}</caption>
              <thead className="bg-stone-50 text-stone-700">
                <tr>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.patientInitials")}</th>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.workflow")}</th>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.assessment")}</th>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.date")}</th>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.status")}</th>
                  <th className="px-5 py-3 font-bold" scope="col">{t("providerArea.action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {providerRows.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td className="px-5 py-4">
                      <span className={`grid size-9 place-items-center rounded-full text-sm font-bold ${index % 2 === 0 ? "bg-primary-50 text-primary-700" : "bg-accent-50 text-accent-700"}`}>
                        {appointment.patientInitials}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-stone-700">{t(appointmentTypeKey(appointment.id, appointment.appointmentType))}</td>
                    <td className="px-5 py-4 text-stone-700">{t(`status.${appointment.assessmentStatus}`)}</td>
                    <td className="px-5 py-4 text-stone-700">
                      {appointment.date}, {appointment.time}
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={appointment.status === "Ready for review" ? "accent" : "primary"}>{t(`status.${appointment.status}`)}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        className="inline-flex min-h-9 items-center rounded-md border border-primary-200 px-3 py-1.5 text-sm font-bold text-primary-700 hover:bg-primary-50"
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
          <p className="border-t border-stone-200 px-5 py-4 text-xs text-stone-600">
            {t("providerArea.encrypted")}
          </p>
        </section>
      </div>

      <aside className="grid h-fit gap-5">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary-700"><ProviderIcon icon="insights" /></span>
            <h2 className="text-sm font-bold text-foreground">{t("providerArea.insights")}</h2>
          </div>
          <div className="mt-5 grid place-items-center">
            <InsightsDonut percent={75} label={t("providerArea.readyReview")} ariaLabel={t("providerArea.donutReady", { percent: 75 })} />
            <p className="mt-3 text-sm text-stone-700">{t("providerArea.assessmentsCount", { count: 3 })}</p>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-2 text-stone-700"><span className="size-2 rounded-full bg-primary-600" />{t("providerArea.readyReview")}</dt>
              <dd className="font-semibold text-foreground">75% (3)</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-2 text-stone-700"><span className="size-2 rounded-full bg-accent-500" />{t("providerArea.inProgress")}</dt>
              <dd className="font-semibold text-foreground">25% (1)</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-2 text-stone-700"><span className="size-2 rounded-full bg-stone-300" />{t("providerArea.completed")}</dt>
              <dd className="font-semibold text-foreground">0% (0)</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary-700"><ProviderIcon icon="queue" /></span>
            <h2 className="text-sm font-bold text-foreground">{t("providerArea.assessmentQueue")}</h2>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between"><dt>{t("providerArea.totalQueue")}</dt><dd className="font-bold text-foreground">4</dd></div>
            <div className="flex justify-between"><dt>{t("providerArea.readyReview")}</dt><dd className="font-bold text-foreground">1</dd></div>
            <div className="flex justify-between"><dt>{t("providerArea.inProgress")}</dt><dd className="font-bold text-foreground">3</dd></div>
          </dl>
          <Link className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:underline" href={routes.providerDashboard}>
            {t("providerArea.viewQueue")} <span aria-hidden="true">&gt;</span>
          </Link>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-stone-700"><ProviderIcon icon="bell" /></span>
            <h2 className="text-sm font-bold text-foreground">{t("providerArea.recentUpdates")}</h2>
          </div>
          <ul className="mt-5 grid gap-4">
            {updates.map((update) => (
              <li key={update.titleKey} className="flex gap-3">
                <span className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full text-white ${update.tone === "accent" ? "bg-accent-500" : "bg-primary-600"}`}>
                  <ProviderIcon icon="check" small />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{t(update.titleKey)}</p>
                  <p className="mt-1 text-xs text-stone-700">{t(update.detailKey)}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs text-stone-600">{update.time}</span>
              </li>
            ))}
          </ul>
          <Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:underline" href={routes.providerDashboard}>
            {t("providerArea.viewUpdates")} <span aria-hidden="true">&gt;</span>
          </Link>
        </section>
      </aside>
    </section>
  );
}

function InsightsDonut({ percent, label, ariaLabel }: { percent: number; label: string; ariaLabel: string }) {
  const background = `conic-gradient(var(--primary-600) 0deg ${percent * 3.6}deg, var(--accent-500) ${percent * 3.6}deg 330deg, var(--stone-200) 330deg 360deg)`;

  return (
    <div className="grid size-36 place-items-center rounded-full" style={{ background }} aria-label={ariaLabel}>
      <div className="grid size-24 place-items-center rounded-full bg-white text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">{percent}%</p>
          <p className="text-xs text-stone-700">{label}</p>
        </div>
      </div>
    </div>
  );
}

function appointmentTypeKey(id: string, fallback: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentPostOp";
  if (id === "apt-004") return "mock.providerDryEye";
  if (fallback.startsWith("mock.")) return fallback;
  return "mock.appointmentVirtual";
}

function ProviderIcon({ icon, small = false }: { icon: string; small?: boolean }) {
  const size = small ? "size-4" : "size-6";

  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5V5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
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

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "insights") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 16h4l3-6 3 3h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "bell") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4L6 17Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M10 20h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "check") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="m6 12 4 4 8-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 5h6l1 2h3v14H5V7h3l1-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
