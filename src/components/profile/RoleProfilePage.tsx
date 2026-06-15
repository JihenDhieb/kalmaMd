"use client";

import type React from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { SignOutLink } from "@/components/layout/SignOutLink";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { routes } from "@/lib/routes";

type ProfileRole = "Patient" | "Provider" | "Admin";

type RoleProfilePageProps = {
  role: ProfileRole;
};

const roleContent = {
  Patient: {
    backHref: routes.patientDashboard,
    backLabelKey: "common.backToDashboard",
    titleKey: "profile.patientTitle",
    accountLabelKey: "profile.patientAccount",
    descriptionKey: "profile.patientDescription",
    noticeKey: "profile.patientNotice",
    preferredContactKey: "profile.emailPreference",
    timezoneKey: "profile.easternTime",
    communicationPreferenceKey: "profile.patientCommunication",
  },
  Provider: {
    backHref: routes.providerDashboard,
    backLabelKey: "common.backToProviderDashboard",
    titleKey: "profile.providerTitle",
    accountLabelKey: "profile.providerAccount",
    descriptionKey: "profile.providerDescription",
    noticeKey: "profile.providerNotice",
    preferredContactKey: "profile.providerContact",
    timezoneKey: "profile.easternTime",
    communicationPreferenceKey: "profile.providerCommunication",
  },
  Admin: {
    backHref: routes.admin,
    backLabelKey: "common.backToAdmin",
    titleKey: "profile.adminTitle",
    accountLabelKey: "profile.adminAccount",
    descriptionKey: "profile.adminDescription",
    noticeKey: "profile.adminNotice",
    preferredContactKey: "profile.adminContact",
    timezoneKey: "profile.easternTime",
    communicationPreferenceKey: "profile.adminCommunication",
  },
} satisfies Record<ProfileRole, {
  backHref: string;
  backLabelKey: string;
  titleKey: string;
  accountLabelKey: string;
  descriptionKey: string;
  noticeKey: string;
  preferredContactKey: string;
  timezoneKey: string;
  communicationPreferenceKey: string;
}>;

export function RoleProfilePage({ role }: RoleProfilePageProps) {
  const { t } = useTranslation();
  const { session } = useMockSession();
  const content = roleContent[role];
  const displayName = session.displayName || fallbackName(role);
  const email = session.email || fallbackEmail(role);
  const phone = session.phone || "+1 (555) 010-2040";
  const initials = getInitials(displayName, role);

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <BackLink href={content.backHref} label={t(content.backLabelKey)} />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t(content.titleKey)}</h1>
            <p className="mt-2 text-sm leading-6 text-stone-700">{t(content.descriptionKey)}</p>
          </div>
          <SignOutLink className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-accent-700 bg-accent-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-accent-800 hover:text-white" />
        </div>
      </header>

      <Alert className="border-accent-200 bg-accent-50 px-5 py-4 text-sm text-accent-900" tone="warning">
        <span className="inline-flex items-center gap-3">
          <ShieldMiniIcon />
          {t(content.noticeKey)}
        </span>
      </Alert>

      <div className="grid gap-5 lg:grid-cols-2">
        <ProfileCard title={t("profile.contactInformation")} description={t("profile.contactDescription")} icon="user">
          <DescriptionRow icon="user" label={t("profile.displayName")} value={displayName} />
          <DescriptionRow icon="initials" iconText={initials} label={t("profile.initials")} value={initials} />
          <DescriptionRow icon="mail" label={t("common.email")} value={email} highlight />
          <DescriptionRow icon="phone" label={t("profile.phone")} value={phone} />
          <InfoPanel tone="primary" title={t("profile.privacyMatters")} description={t("profile.privacyMattersDescription")} icon="lock" />
        </ProfileCard>

        <ProfileCard title={t("profile.preferences")} description={t("profile.preferencesDescription")} icon="message">
          <DescriptionRow icon="mail" label={t("profile.preferredContact")} value={t(content.preferredContactKey)} />
          <DescriptionRow icon="clock" label={t("profile.timezone")} value={t(content.timezoneKey)} />
          <DescriptionRow icon="mail" label={t("profile.communicationPreference")} value={t(content.communicationPreferenceKey)} />
          <InfoPanel tone="soft" title={t("profile.updateAnytime")} description={t("profile.updateAnytimeDescription")} icon="info" />
        </ProfileCard>
      </div>
    </section>
  );
}

function ProfileCard({ title, description, icon, children }: { title: string; description: string; icon: "user" | "message"; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-[0_8px_22px_rgba(67,61,56,0.08)]">
      <div className="flex items-start gap-4 border-b border-stone-200 pb-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
          <ProfileIcon icon={icon} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-stone-600">{description}</p>
        </div>
      </div>
      <dl className="divide-y divide-stone-200">{children}</dl>
    </section>
  );
}

function DescriptionRow({ icon, iconText, label, value, highlight = false }: { icon: ProfileRowIcon; iconText?: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[2.25rem_1fr] gap-3 py-4 text-sm sm:grid-cols-[2.25rem_minmax(9rem,1fr)_1fr] sm:items-center">
      <span className="grid size-9 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
        <RowIcon icon={icon} text={iconText} />
      </span>
      <dt className="font-bold text-stone-700">{label}</dt>
      <dd className={highlight ? "font-bold text-primary-700 sm:text-left" : "text-stone-700 sm:text-left"}>{value}</dd>
    </div>
  );
}

function InfoPanel({ description, icon, title, tone }: { description: string; icon: "info" | "lock"; title: string; tone: "primary" | "soft" }) {
  const toneClass =
    tone === "soft"
      ? "border-primary-200 bg-gradient-to-br from-primary-50 to-white text-primary-900"
      : "border-primary-100 bg-gradient-to-br from-primary-50 to-white text-primary-900";

  return (
    <div className={`mt-5 rounded-lg border p-4 ${toneClass}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-primary-700 ring-1 ring-primary-100">
          <RowIcon icon={icon} />
        </span>
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-stone-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileIcon({ icon }: { icon: "user" | "message" }) {
  if (icon === "message") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
        <path d="M5 6h14v10H8l-3 3V6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

type ProfileRowIcon = "clock" | "info" | "initials" | "lock" | "mail" | "phone" | "user";

function RowIcon({ icon, text }: { icon: ProfileRowIcon; text?: string }) {
  if (icon === "mail") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="m5 7 7 6 7-6" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path d="M7 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L17 13l5 2v4a2 2 0 0 1-2 2C10.6 21 3 13.4 3 4a2 2 0 0 1 2-2h2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v6l4 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "lock") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "info") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "initials") {
    return <span className="text-xs font-black">{text}</span>;
  }

  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function ShieldMiniIcon() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0 text-accent-600" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function getInitials(displayName: string, role: ProfileRole) {
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  if (initials) {
    return initials;
  }

  return role.slice(0, 2).toUpperCase();
}

function fallbackName(role: ProfileRole) {
  if (role === "Provider") {
    return "Dr. Sarah Chen";
  }

  if (role === "Admin") {
    return "Operations Admin";
  }

  return "Sarah Morgan";
}

function fallbackEmail(role: ProfileRole) {
  if (role === "Provider") {
    return "provider@example.com";
  }

  if (role === "Admin") {
    return "admin@example.com";
  }

  return "sarah.morgan@example.com";
}
