"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
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
  const { session } = useMockSession();
  const firstName = session.displayName.split(" ")[0] || session.displayName;
  const initials = session.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F5F3EE]">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col shrink-0 bg-[#2B3A2C] text-white">
        {/* Avatar + name */}
        <div className="px-7 pt-8 pb-6">
          <div className="flex flex-col items-start gap-4">
            <div className="grid size-14 place-items-center rounded-full border-2 border-white/20 bg-white/10 text-lg font-bold tracking-wide">
              {initials || "MD"}
            </div>
            <div>
              <p className="text-base font-bold leading-tight">{session.displayName}</p>
              <p className="mt-0.5 text-xs text-white/60 break-all">{session.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-8 space-y-0.5" aria-label={t("providerArea.dashboard")}>
          {[
            { label: t("providerArea.dashboard"), href: routes.providerDashboard, icon: "document", active: true },
            { label: t("providerArea.assessmentQueue"), href: routes.providerDashboard, icon: "queue" },
            { label: t("providerArea.scheduled"), href: `${routes.providerAppointment}/${appointments[0].id}`, icon: "calendar" },
            { label: t("providerArea.consultationsToday"), href: routes.consultation, icon: "people" },
            { label: t("providerArea.profile"), href: routes.providerProfile, icon: "people" },
          ].map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
              href={item.href}
            >
              <span className={item.active ? "text-white" : "text-white/50"}>
                <ProviderIcon icon={item.icon} />
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Decorative bottom illustration placeholder */}
        <div className="px-6 pb-6 opacity-20 pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 180 120" className="w-full">
            <circle cx="90" cy="90" r="70" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 6" />
            <circle cx="90" cy="90" r="45" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 5" />
            <circle cx="90" cy="60" r="14" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M82 58 l6 6 10-10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="mx-auto max-w-[1200px] px-6 py-8 xl:px-10">
          <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">

            {/* Left column */}
            <div className="grid gap-6">

              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6B7B6C]">
                    {t("providerArea.eyebrow")}
                  </p>
                  <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#1C2B1D] sm:text-5xl">
                    {t("providerArea.dashboard")}
                  </h1>
                  <p className="mt-2 text-sm text-[#6B7B6C] leading-relaxed max-w-lg">
                    {t("patientDashboard.hello", { name: firstName })}. {t("providerArea.description")}
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-2 min-h-10 w-fit rounded-xl border border-[#D4D0C8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1C2B1D] shadow-sm hover:bg-[#F0EDE6] transition-colors"
                  href={routes.providerProfile}
                >
                  <ProviderIcon icon="people" />
                  {t("providerArea.profile")}
                </Link>
              </div>

              {/* Notice banner */}
              <div className="flex flex-col gap-3 rounded-2xl border border-[#E8DFD0] bg-[#FBF8F4] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-[#C9A96E]/40 bg-[#C9A96E]/10 text-[#8B6F47]">
                    <ProviderIcon icon="shield" small />
                  </span>
                  <p className="text-sm leading-relaxed text-[#4A3B2A]">
                    {t("providerArea.accessNotice")}
                  </p>
                </div>
                <Link
                  className="shrink-0 text-sm font-semibold text-[#8B6F47] hover:text-[#6B4F2E] hover:underline"
                  href={routes.terms}
                >
                  {t("providerArea.learnMore")} →
                </Link>
              </div>

              {/* Stat cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <Link
                    key={stat.titleKey}
                    className="group flex items-center gap-4 rounded-2xl border border-[#E2DDD6] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all hover:border-[#4A7C59]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)]"
                    href={stat.href}
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#EEF3EE] text-[#4A7C59]">
                      <ProviderIcon icon={stat.icon} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#6B7B6C] uppercase tracking-wide truncate">
                        {t(stat.titleKey)}
                      </p>
                      <p className="mt-0.5 text-3xl font-bold text-[#1C2B1D]">{stat.value}</p>
                      <p className="text-xs text-[#9B9B8E]">{t(stat.textKey)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Queue table */}
              <section className="overflow-hidden rounded-2xl border border-[#E2DDD6] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4 border-b border-[#F0ECE5] px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#4A7C59]">
                      <ProviderIcon icon="queue" />
                    </span>
                    <h2 className="text-base font-bold text-[#1C2B1D]">{t("providerArea.queue")}</h2>
                  </div>
                  <Link
                    className="rounded-lg border border-[#D4D0C8] px-3 py-1.5 text-xs font-semibold text-[#4A7C59] hover:bg-[#EEF3EE] transition-colors"
                    href={routes.providerDashboard}
                  >
                    {t("providerArea.viewAll")}
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <caption className="sr-only">{t("providerArea.queueCaption")}</caption>
                    <thead>
                      <tr className="bg-[#F9F7F3]">
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.patientInitials")}</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.workflow")}</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.assessment")}</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.date")}</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.status")}</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9B9B8E]" scope="col">{t("providerArea.action")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE5]">
                      {providerRows.map((appointment, index) => (
                        <tr key={appointment.id} className="hover:bg-[#FAFAF8] transition-colors">
                          <td className="px-6 py-4">
                            <span className={`grid size-9 place-items-center rounded-full text-sm font-bold ${
                              index % 2 === 0
                                ? "bg-[#EEF3EE] text-[#2B3A2C]"
                                : "bg-[#F5EDE0] text-[#6B4F2E]"
                            }`}>
                              {appointment.patientInitials}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#4A4A3E]">{t(appointmentTypeKey(appointment.id, appointment.appointmentType))}</td>
                          <td className="px-6 py-4 text-[#4A4A3E]">{t(`status.${appointment.assessmentStatus}`)}</td>
                          <td className="px-6 py-4 text-[#6B7B6C] text-xs leading-snug">
                            {appointment.date}<br />{appointment.time}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={appointment.status} label={t(`status.${appointment.status}`)} />
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              className="inline-flex min-h-8 items-center rounded-lg border border-[#C5D6C5] bg-[#EEF3EE] px-3 py-1 text-xs font-semibold text-[#2B4A2C] hover:bg-[#DCE9DC] transition-colors"
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
                <p className="border-t border-[#F0ECE5] px-6 py-3 text-xs text-[#9B9B8E] flex items-center gap-2">
                  <ProviderIcon icon="lock" small />
                  {t("providerArea.encrypted")}
                </p>
              </section>
            </div>

            {/* Right sidebar */}
            <aside className="grid h-fit gap-5">

              {/* Provider insights */}
              <section className="rounded-2xl border border-[#E2DDD6] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A7C59]"><ProviderIcon icon="insights" /></span>
                  <h2 className="text-sm font-bold text-[#1C2B1D]">{t("providerArea.insights")}</h2>
                </div>
                <div className="mt-5 flex flex-col items-center">
                  <InsightsDonut percent={75} label={t("providerArea.readyReview")} ariaLabel={t("providerArea.donutReady", { percent: 75 })} />
                  <p className="mt-3 text-xs text-[#6B7B6C]">{t("providerArea.assessmentsCount", { count: 3 })}</p>
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[#6B7B6C] text-xs">
                      <span className="size-2 rounded-full bg-[#4A7C59]" />
                      {t("providerArea.readyReview")}
                    </dt>
                    <dd className="text-xs font-semibold text-[#1C2B1D]">75% (3)</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[#6B7B6C] text-xs">
                      <span className="size-2 rounded-full bg-[#C9A96E]" />
                      {t("providerArea.inProgress")}
                    </dt>
                    <dd className="text-xs font-semibold text-[#1C2B1D]">25% (1)</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[#6B7B6C] text-xs">
                      <span className="size-2 rounded-full bg-[#D4D0C8]" />
                      {t("providerArea.completed")}
                    </dt>
                    <dd className="text-xs font-semibold text-[#1C2B1D]">0% (0)</dd>
                  </div>
                </dl>
              </section>

              {/* Assessment queue */}
              <section className="rounded-2xl border border-[#E2DDD6] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A7C59]"><ProviderIcon icon="queue" /></span>
                  <h2 className="text-sm font-bold text-[#1C2B1D]">{t("providerArea.assessmentQueue")}</h2>
                </div>
                <dl className="mt-5 grid gap-3 text-sm divide-y divide-[#F0ECE5]">
                  <div className="flex items-center justify-between py-2 first:pt-0">
                    <dt className="text-xs text-[#6B7B6C]">{t("providerArea.totalQueue")}</dt>
                    <dd className="text-sm font-bold text-[#1C2B1D]">4</dd>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <dt className="text-xs text-[#6B7B6C]">{t("providerArea.readyReview")}</dt>
                    <dd className="text-sm font-bold text-[#1C2B1D]">1</dd>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <dt className="text-xs text-[#6B7B6C]">{t("providerArea.inProgress")}</dt>
                    <dd className="text-sm font-bold text-[#1C2B1D]">3</dd>
                  </div>
                </dl>
                <Link
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A7C59] hover:text-[#2B4A2C] hover:underline"
                  href={routes.providerDashboard}
                >
                  {t("providerArea.viewQueue")} →
                </Link>
              </section>

              {/* Recent updates */}
              <section className="rounded-2xl border border-[#E2DDD6] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#6B7B6C]"><ProviderIcon icon="bell" /></span>
                  <h2 className="text-sm font-bold text-[#1C2B1D]">{t("providerArea.recentUpdates")}</h2>
                </div>
                <ul className="mt-5 grid gap-5">
                  {updates.map((update) => (
                    <li key={update.titleKey} className="flex gap-3">
                      <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-white ${
                        update.tone === "accent" ? "bg-[#C9A96E]" : "bg-[#4A7C59]"
                      }`}>
                        <ProviderIcon icon="check" small />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#1C2B1D]">{t(update.titleKey)}</p>
                        <p className="mt-0.5 text-xs text-[#9B9B8E] leading-snug">{t(update.detailKey)}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-xs text-[#9B9B8E]">{update.time}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A7C59] hover:text-[#2B4A2C] hover:underline"
                  href={routes.providerDashboard}
                >
                  {t("providerArea.viewUpdates")} →
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── StatusBadge ── */
function StatusBadge({ status, label }: { status: string; label: string }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  if (status === "Ready for review") {
    return <span className={`${base} bg-[#F5EDE0] text-[#6B4F2E] border border-[#E8D4B0]`}>{label}</span>;
  }
  if (status === "Completed") {
    return <span className={`${base} bg-[#EEF3EE] text-[#2B4A2C] border border-[#C5D6C5]`}>{label}</span>;
  }
  // Scheduled / default
  return <span className={`${base} bg-[#EEF3EE] text-[#2B4A2C] border border-[#C5D6C5]`}>{label}</span>;
}

/* ── InsightsDonut ── */
function InsightsDonut({ percent, label, ariaLabel }: { percent: number; label: string; ariaLabel: string }) {
  // percent = green, remainder split: 25% brown, rest grey
  const greenDeg = percent * 3.6;
  const brownDeg = 25 * 3.6;
  const background = `conic-gradient(#4A7C59 0deg ${greenDeg}deg, #C9A96E ${greenDeg}deg ${greenDeg + brownDeg}deg, #E2DDD6 ${greenDeg + brownDeg}deg 360deg)`;

  return (
    <div
      className="grid size-36 place-items-center rounded-full"
      style={{ background }}
      aria-label={ariaLabel}
    >
      <div className="grid size-24 place-items-center rounded-full bg-white text-center shadow-inner">
        <div>
          <p className="text-2xl font-bold text-[#1C2B1D]">{percent}%</p>
          <p className="text-[10px] text-[#6B7B6C] leading-tight max-w-[4rem]">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ── appointmentTypeKey ── */
function appointmentTypeKey(id: string, fallback: string) {
  if (id === "apt-002") return "mock.appointmentReview";
  if (id === "apt-003") return "mock.appointmentPostOp";
  if (id === "apt-004") return "mock.providerDryEye";
  if (fallback.startsWith("mock.")) return fallback;
  return "mock.appointmentVirtual";
}

/* ── ProviderIcon ── */
function ProviderIcon({ icon, small = false }: { icon: string; small?: boolean }) {
  const size = small ? "size-3.5" : "size-5";

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
        <path d="m6 12 4 4 8-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }
  if (icon === "lock") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  // document / queue / default
  return (
    <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 5h6l1 2h3v14H5V7h3l1-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
