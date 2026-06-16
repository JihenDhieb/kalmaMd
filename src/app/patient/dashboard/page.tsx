"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { Badge } from "@/components/ui/Badge";
import { appointments } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const actionCards = [
  {
    titleKey: "patientDashboard.continueAssessment",
    descriptionKey: "patientDashboard.continueAssessmentDescription",
    href: routes.assessment,
    ctaKey: "patientDashboard.continue",
    icon: "clipboard",
    tone: "primary",
    metaKey: "patientDashboard.stepMeta",
    badgeKey: "",
  },
  {
    titleKey: "patientDashboard.viewLatestResult",
    descriptionKey: "patientDashboard.viewLatestResultDescription",
    href: routes.results,
    ctaKey: "patientDashboard.viewResults",
    icon: "chart",
    tone: "success",
    badgeKey: "",
  },
  {
    titleKey: "common.bookConsultation",
    descriptionKey: "patientDashboard.bookConsultationDescription",
    href: routes.booking,
    ctaKey: "patientDashboard.bookNow",
    icon: "calendar",
    tone: "accent",
    badgeKey: "",
  },
  {
    titleKey: "common.blog",
    descriptionKey: "patientDashboard.blogDescription",
    href: routes.blog,
    ctaKey: "patientDashboard.openBlog",
    icon: "document",
    tone: "soft",
    badgeKey: "",
  },
  {
    titleKey: "patientDashboard.symptomTracker",
    descriptionKey: "patientDashboard.symptomTrackerDescription",
    href: routes.symptomTracker,
    ctaKey: "patientDashboard.trackSymptoms",
    icon: "pulse",
    tone: "soft",
    badgeKey: "",
  },
  {
    titleKey: "common.profile",
    descriptionKey: "patientDashboard.profileDescription",
    href: routes.patientProfile,
    ctaKey: "patientDashboard.viewProfile",
    icon: "user",
    tone: "primary",
    badgeKey: "",
  },
  {
    titleKey: "common.shop",
    descriptionKey: "patientDashboard.shopDescription",
    href: routes.patientShop,
    ctaKey: "patientDashboard.goToShop",
    icon: "bag",
    tone: "accent",
    badgeKey: "",
  },
];

const trustItems = [
  {
    titleKey: "patientDashboard.securePrivate",
    textKey: "patientDashboard.securePrivateText",
    icon: "shield",
  },
  {
    titleKey: "patientDashboard.licensedSpecialists",
    textKey: "patientDashboard.licensedSpecialistsText",
    icon: "people",
  },
  {
    titleKey: "patientDashboard.noWaitingRooms",
    textKey: "patientDashboard.noWaitingRoomsText",
    icon: "clock",
  },
  {
    titleKey: "patientDashboard.evidenceBasedCare",
    textKey: "patientDashboard.evidenceBasedCareText",
    icon: "document",
  },
];

export default function PatientDashboardPage() {
  const { t } = useTranslation();
  const { session } = useMockSession();
  const upcomingAppointment = appointments[0];
  const firstName = session.displayName.split(" ")[0] || session.displayName;
  const initials = session.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const primaryActions = actionCards.slice(0, 3);
  const secondaryActions = actionCards.slice(3);

  return (
    <section className="mx-auto grid max-w-[92rem] gap-5 px-3 py-4 sm:px-5 lg:grid-cols-[18rem_1fr] lg:px-3">
      <aside className="h-fit overflow-hidden rounded-[1.35rem] border border-stone-200 bg-white shadow-[0_18px_45px_rgba(58,58,58,0.10)]">
        <div className="bg-primary-900 px-5 py-6 text-white">
          <div className="grid size-16 place-items-center rounded-full border-[3px] border-white bg-primary-700 text-xl font-bold shadow-md">
            {initials || "JD"}
          </div>
          <h2 className="mt-4 text-xl font-bold">{session.displayName}</h2>
          <p className="mt-1 break-all text-sm text-primary-100">{session.email}</p>
        </div>

        <nav className="grid gap-1.5 px-4 py-4" aria-label={t("common.dashboard")}>
          {[
            { label: t("common.dashboard"), href: routes.patientDashboard, icon: "grid", active: true },
            { label: t("common.blog"), href: routes.blog, icon: "document" },
            { label: t("patientDashboard.symptomTracker"), href: routes.symptomTracker, icon: "pulse" },
            { label: t("patientDashboard.viewLatestResult"), href: routes.results, icon: "chart" },
            { label: t("common.bookConsultation"), href: routes.booking, icon: "people" },
            { label: t("common.profile"), href: routes.patientProfile, icon: "user" },
            { label: t("common.shop"), href: routes.patientShop, icon: "bag" },
          ].map((item) => (
            <Link
              key={item.href}
              className={`flex min-h-11 items-center gap-3 rounded-lg px-4 text-sm font-semibold transition-colors ${
                item.active
                  ? "bg-primary-50 text-primary-900"
                  : "text-stone-700 hover:bg-stone-50 hover:text-primary-900"
              }`}
              href={item.href}
            >
              <span className="text-primary-700">
                <DashboardIcon icon={item.icon} />
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="relative grid gap-4 overflow-hidden">
        <EyeDecoration />
        <div className="relative z-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("patientDashboard.hello", { name: firstName })}
          </h1>
          <p className="mt-1 text-sm text-stone-600">{t("patientDashboard.todayOverview")}</p>
        </div>

        <div className="relative z-10 grid gap-4 lg:grid-cols-3">
          {primaryActions.map((action) => (
            <DashboardActionCard key={action.titleKey} action={action} t={t} featured />
          ))}
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {secondaryActions.map((action) => (
            <DashboardActionCard key={action.titleKey} action={action} t={t} />
          ))}
        </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <article className="relative overflow-hidden rounded-xl border border-stone-200 bg-white p-5 shadow-[0_12px_28px_rgba(58,58,58,0.08)]">
          <div className="mb-3 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-700 text-white ring-1 ring-primary-100">
              <DashboardIcon icon="calendar" />
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">{t("patientDashboard.upcomingAppointment")}</h2>
              <p className="mt-1 text-xs text-stone-700">{t("patientDashboard.nextAppointment")}</p>
            </div>
          </div>
          <div className="relative z-10 mt-4 rounded-lg border border-stone-200 bg-white/90 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground">{t("mock.appointmentVirtual")}</h3>
                <p className="mt-1 text-sm text-stone-700">
                  {upcomingAppointment.date} at {upcomingAppointment.time}
                </p>
              </div>
              <Badge tone="primary">{t(`status.${upcomingAppointment.status}`)}</Badge>
            </div>
            <Link className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-primary-700 hover:text-primary-900 hover:underline" href={`${routes.providerAppointment}/${upcomingAppointment.id}`}>
              {t("patientDashboard.appointmentSummary")} <span aria-hidden="true" className="ml-2">&gt;</span>
            </Link>
          </div>
          <CalendarDecoration />
        </article>

        <article className="relative overflow-hidden rounded-xl border border-stone-200 bg-white p-5 shadow-[0_12px_28px_rgba(58,58,58,0.08)]">
          <div className="mb-3 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-700 text-white">
              <DashboardIcon icon="pulse" />
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">{t("patientDashboard.symptomTracker")}</h2>
              <p className="mt-1 text-xs text-stone-700">{t("patientDashboard.recentActivity")}</p>
            </div>
          </div>
          <Badge className="mt-2 w-fit" tone="accent">{t("status.In progress")}</Badge>
          <div className="mt-5 flex items-center justify-between text-sm text-stone-700">
            <span>{t("patientDashboard.trackingCompleteness")}</span>
            <span>40%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
            <div className="h-full w-2/5 rounded-full bg-primary-600" />
          </div>
          <p className="relative z-10 mt-4 text-sm leading-6 text-stone-700">
            {t("patientDashboard.trackerCopy")}
          </p>
          <WaveDecoration />
        </article>

        <article className="relative overflow-hidden rounded-xl border border-stone-200 bg-white p-5 shadow-[0_12px_28px_rgba(58,58,58,0.08)]">
          <div className="mb-3 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-700 text-white">
              <DashboardIcon icon="document" />
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">{t("patientDashboard.latestResult")}</h2>
              <p className="mt-1 text-xs text-stone-700">{t("patientDashboard.resultCopy")}</p>
            </div>
          </div>
          <Badge className="mt-2 w-fit" tone="primary">{t("mock.severityLabel")}</Badge>
          <p className="mt-4 text-sm leading-6 text-stone-700">{t("mock.severityDescription")}</p>
          <Link className="relative z-10 mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-primary-700 hover:text-primary-900 hover:underline" href={routes.results}>
            {t("patientDashboard.viewResults")} <span aria-hidden="true" className="ml-2">&gt;</span>
          </Link>
          <ResultDecoration />
        </article>
      </div>

      <section className="rounded-xl border border-primary-100 bg-primary-50/80 p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.titleKey} className="flex gap-4 xl:border-r xl:border-primary-100 xl:pr-5 last:xl:border-r-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary-700 ring-1 ring-primary-100">
                <DashboardIcon icon={item.icon} />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">{t(item.titleKey)}</h2>
                <p className="mt-1 text-sm leading-6 text-stone-700">{t(item.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </section>
  );
}

type DashboardAction = (typeof actionCards)[number];

function DashboardActionCard({
  action,
  t,
  featured = false,
}: {
  action: DashboardAction;
  t: (key: string, values?: Record<string, string | number>) => string;
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-xl border border-stone-200 bg-white shadow-[0_12px_28px_rgba(58,58,58,0.08)] ${
        featured ? "min-h-[12.5rem] p-6" : "min-h-[9.5rem] p-5"
      }`}
    >
      <div className={featured ? "flex h-full flex-col" : "grid h-full grid-cols-[2.75rem_1fr] gap-4"}>
        <span className={`grid shrink-0 place-items-center rounded-xl ${featured ? "size-12" : "size-11"} ${iconTone(action.tone)}`}>
          <DashboardIcon icon={action.icon} />
        </span>
        <div className={`${featured ? "mt-4" : ""} flex min-w-0 flex-1 flex-col`}>
          <h2 className={`${featured ? "text-base" : "text-sm"} font-bold text-foreground`}>{t(action.titleKey)}</h2>
          <p className={`${featured ? "mt-2" : "mt-1"} text-xs leading-5 text-stone-600`}>{t(action.descriptionKey)}</p>
          {action.metaKey ? (
            <div className="mt-4 flex items-center gap-4">
              <div className="h-1.5 flex-1 rounded-full bg-stone-200">
                <div className="h-full w-7/12 rounded-full bg-primary-700" />
              </div>
              <span className="text-xs text-stone-700">{t(action.metaKey)}</span>
            </div>
          ) : null}
          <Link
            className={`mt-auto inline-flex min-h-8 w-fit items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-xs font-bold transition-colors ${actionButtonTone(action.tone)}`}
            href={action.href}
          >
            {t(action.ctaKey)} <span aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function iconTone(tone: string) {
  if (tone === "accent") {
    return "bg-accent-50 text-accent-600 ring-1 ring-accent-100";
  }

  if (tone === "success") {
    return "bg-primary-50 text-primary-600 ring-1 ring-primary-100";
  }

  if (tone === "soft") {
    return "bg-accent-50 text-primary-700 ring-1 ring-accent-100";
  }

  return "bg-primary-50 text-primary-700 ring-1 ring-primary-100";
}

function actionButtonTone(tone: string) {
  if (tone === "accent") {
    return "border-accent-200 bg-accent-50 text-accent-700 hover:bg-accent-100";
  }

  if (tone === "soft") {
    return "border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100";
  }

  return "border-primary-200 bg-white text-primary-700 hover:bg-primary-50";
}

function CalendarDecoration() {
  return (
    <svg aria-hidden="true" className="absolute -bottom-3 right-3 size-20 text-primary-100" viewBox="0 0 90 90" fill="none">
      <rect x="23" y="22" width="42" height="48" rx="7" fill="currentColor" />
      <path d="M31 18v12M57 18v12M23 36h42" stroke="#a1d5e0" strokeWidth="5" strokeLinecap="round" />
      <circle cx="24" cy="70" r="10" fill="#ffffff" stroke="#d0eaef" strokeWidth="3" />
      <path d="M24 64v7l5 3" stroke="#d0c9be" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WaveDecoration() {
  return (
    <svg aria-hidden="true" className="absolute bottom-0 right-0 h-20 w-44 text-primary-100" viewBox="0 0 190 90" fill="none">
      <path d="M0 75 24 62l24 10 25-28 25 14 27-39 31 16 34-23v78H0V75Z" fill="currentColor" />
      <path d="M0 75 24 62l24 10 25-28 25 14 27-39 31 16 34-23" stroke="#60b9cc" strokeWidth="3" />
      <circle cx="24" cy="62" r="3" fill="#60b9cc" />
      <circle cx="73" cy="44" r="3" fill="#60b9cc" />
      <circle cx="125" cy="19" r="3" fill="#60b9cc" />
    </svg>
  );
}

function ResultDecoration() {
  return (
    <svg aria-hidden="true" className="absolute -bottom-4 right-4 size-24 text-primary-50" viewBox="0 0 100 100" fill="none">
      <path d="M22 62 66 46l17 30-44 16-17-30Z" fill="#d0eaef" />
      <rect x="41" y="16" width="38" height="50" rx="5" transform="rotate(13 41 16)" fill="currentColor" stroke="#d0eaef" strokeWidth="3" />
      <path d="m51 34 17 4M49 45l21 5M47 56l15 4" stroke="#d0c9be" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function EyeDecoration() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-2 top-0 hidden h-28 w-56 text-primary-700 opacity-10 lg:block" viewBox="0 0 240 120" fill="none">
      <path d="M20 62c27-33 62-49 100-49s73 16 100 49c-27 30-60 45-100 45S47 92 20 62Z" stroke="currentColor" strokeWidth="4" />
      <circle cx="120" cy="62" r="24" stroke="currentColor" strokeWidth="4" />
      <circle cx="120" cy="62" r="8" fill="currentColor" />
      <path d="M120 0v14M120 110v10M62 18l9 12M178 18l-9 12M223 38l-13 7M17 38l13 7" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function DashboardIcon({ icon }: { icon: string }) {
  if (icon === "grid") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M5 5h5v5H5V5ZM14 5h5v5h-5V5ZM5 14h5v5H5v-5ZM14 14h5v5h-5v-5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5V5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M8 12h3M13 12h3M8 16h3M13 16h3" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "clipboard" || icon === "document") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M9 5h6l1 2h3v14H5V7h3l1-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M5 19V9M12 19V5M19 19v-8" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M4 20h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "pulse") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M3 13h4l2-5 4 11 2-6h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "user" || icon === "people") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "bag") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M6 8h12l1 12H5L6 8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
        <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
        <path d="m9 12 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
