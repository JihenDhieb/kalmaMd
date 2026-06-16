"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { adminAssessments, adminPatients, adminScheduleEntries, appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const sidebarLinks = [
  { titleKey: "common.dashboard", href: routes.admin, icon: "home", active: true },
  { titleKey: "common.patients", href: routes.adminPatients, icon: "people" },
  { titleKey: "common.appointments", href: routes.adminAppointments, icon: "calendar" },
  { titleKey: "common.assessments", href: routes.adminAssessments, icon: "clipboard" },
  { titleKey: "common.schedule", href: routes.adminSchedule, icon: "grid" },
];

export default function AdminPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-[#F5F3EE]">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-56 flex-col shrink-0 bg-[#1E3225] pt-5 text-white">
        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sidebarLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-white/15 text-white"
                  : "text-white/55 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className={item.active ? "text-white" : "text-white/50"}>
                <AdminIcon icon={item.icon} />
              </span>
              {t(item.titleKey)}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">

          {/* Page header */}
          <div className="mb-7">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#1C2B1D]">
              {t("admin.title")}
            </h1>
            <p className="mt-1.5 text-sm text-[#6B7B6C]">{t("admin.description")}</p>
          </div>

          {/* Main card */}
          <div className="rounded-2xl border border-[#E2DDD6] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">

            {/* Assessments header row */}
            <div className="flex items-start justify-between gap-6 px-8 pt-8 pb-6 border-b border-[#F0ECE5]">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#EEF3EE] text-[#4A7C59]">
                  <AdminIcon icon="clipboard" large />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-[#1C2B1D]">{t("common.assessments")}</h2>
                  <p className="mt-0.5 text-sm text-[#6B7B6C]">{t("admin.assessmentsDescription")}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-5xl font-black text-[#4A7C59]">{adminAssessments.length}</p>
                <p className="mt-0.5 text-xs text-[#9B9B8E]">{t("common.assessments")}</p>
              </div>
            </div>

            {/* Activity chart */}
            <div className="px-8 py-6">
              <h3 className="text-base font-bold text-[#1C2B1D]">{t("admin.activityOverview")}</h3>
              <ActivityLineChart />
            </div>

            {/* Open Assessments CTA */}
            <div className="mx-6 mb-6 flex items-center justify-between gap-6 rounded-xl border border-[#E2DDD6] bg-[#F9F7F3] px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#EEF3EE] text-[#4A7C59]">
                  <AdminIcon icon="clipboard" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1C2B1D]">{t("common.assessments")}</p>
                  <p className="mt-0.5 text-xs text-[#6B7B6C]">{t("admin.assessmentsDescription")}</p>
                </div>
              </div>
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-[#2B3A2C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1E3225] transition-colors shrink-0"
                href={routes.adminAssessments}
              >
                {t("admin.open", { section: t("common.assessments") })}
                <span aria-hidden="true" className="text-base">›</span>
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-xs text-[#9B9B8E]">{t("admin.scheduleEntries", { count: adminScheduleEntries.length })}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Line chart matching the screenshot ── */
function ActivityLineChart() {
  const { t } = useTranslation();

  const points = [
    { label: "common.patients", value: adminPatients.length },
    { label: "common.assessments", value: adminAssessments.length },
    { label: "common.appointments", value: appointments.length },
  ];

  const maxVal = 4;
  const chartW = 700;
  const chartH = 200;
  const padL = 40;
  const padR = 30;
  const padT = 16;
  const padB = 10;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const xs = points.map((_, i) => padL + (i / (points.length - 1)) * innerW);
  const ys = points.map((p) => padT + innerH - (p.value / maxVal) * innerH);

  // Smooth curve via cubic bezier
  let pathD = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
    pathD += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
  }

  // Fill path
  const fillD = `${pathD} L ${xs[xs.length - 1]} ${padT + innerH} L ${xs[0]} ${padT + innerH} Z`;

  const gridLines = [0, 1, 2, 3, 4];

  return (
    <div className="mt-4 overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartW} ${chartH + 50}`}
        className="w-full min-w-[400px]"
        aria-label="Activity overview chart"
      >
        {/* Y-axis grid lines + labels */}
        {gridLines.map((v) => {
          const y = padT + innerH - (v / maxVal) * innerH;
          return (
            <g key={v}>
              <line
                x1={padL}
                y1={y}
                x2={padL + innerW}
                y2={y}
                stroke="#E8E4DC"
                strokeWidth="1"
                strokeDasharray={v === 0 ? "0" : "4 4"}
              />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#9B9B8E">{v}</text>
            </g>
          );
        })}

        {/* Left axis line */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} stroke="#C5D6C5" strokeWidth="1.5" />

        {/* Fill under curve */}
        <path d={fillD} fill="#4A7C59" fillOpacity="0.08" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="5" fill="#4A7C59" stroke="white" strokeWidth="2" />
        ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={p.label}
            x={xs[i]}
            y={padT + innerH + 28}
            textAnchor="middle"
            fontSize="12"
            fill="#6B7B6C"
          >
            {t(p.label)}
          </text>
        ))}
      </svg>
    </div>
  );
}

function AdminIcon({ icon, large = false }: { icon: string; large?: boolean }) {
  const size = large ? "size-7" : "size-5";

  if (icon === "home") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 12L12 3l9 9M5 10v10h5v-6h4v6h5V10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5V5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
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
  if (icon === "clock") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v6l4 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === "grid") {
    return (
      <svg aria-hidden="true" className={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
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
