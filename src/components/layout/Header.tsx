"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { session } = useMockSession();
  const navItems = [
    { label: t("common.shop"), href: routes.patientShop },
    { label: t("common.howItWorks"), href: "/#how-it-works" },
  ];

  return (
    <header className="border-b border-[#304536] bg-[#304536] px-3 py-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-primary-900 focus:shadow-lg"
      >
        {t("common.skipToContent")}
      </a>
      <nav
        className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8"
        aria-label={t("layout.primaryNavigation")}
      >
        <BrandLogo />
        <button
          type="button"
          className="rounded-md border border-primary-200 px-3 py-1.5 text-sm font-semibold text-primary-800 hover:bg-primary-50 md:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {t("common.menu")}
        </button>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className="rounded-md px-3 py-1.5 text-sm font-semibold text-stone-800 hover:bg-primary-50 hover:text-primary-900"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          {session.isAuthenticated ? (
            <li>
              <Link
                className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-md border border-primary-200 bg-white px-4 py-2 text-base font-bold text-primary-800 hover:bg-primary-50 hover:text-primary-900"
                href={profileHref(session.role)}
              >
                <ProfileHeaderIcon />
                {t("common.profile")}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-stone-800 hover:bg-primary-50 hover:text-primary-900"
                  href={routes.login}
                >
                  {t("common.signIn")}
                </Link>
              </li>
              <li>
                <Link
                  className="ml-2 inline-flex min-h-9 items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600"
                  href={routes.register}
                >
                  {t("common.getStarted")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div id="mobile-navigation" className={cn("mx-auto mt-3 max-w-[1540px] rounded-lg border border-stone-200 bg-white md:hidden", !isOpen && "hidden")}>
        <ul className="grid gap-1 px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-md px-3 py-3 text-sm font-semibold text-stone-800 hover:bg-primary-50 hover:text-primary-900"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          {session.isAuthenticated ? (
            <li>
              <Link
                className="flex min-h-11 w-full items-center gap-2 rounded-md border border-primary-200 bg-white px-3 py-3 text-base font-bold text-primary-800 hover:bg-primary-50 hover:text-primary-900"
                href={profileHref(session.role)}
                onClick={() => setIsOpen(false)}
              >
                <ProfileHeaderIcon />
                {t("common.profile")}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="block rounded-md px-3 py-3 text-sm font-semibold text-stone-800 hover:bg-primary-50 hover:text-primary-900"
                  href={routes.login}
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.signIn")}
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-md bg-primary-500 px-3 py-3 text-sm font-semibold text-white hover:bg-primary-600"
                  href={routes.register}
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.getStarted")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

function profileHref(role: string) {
  if (role === "Provider") {
    return routes.providerProfile;
  }

  if (role === "Admin") {
    return routes.adminProfile;
  }

  return routes.patientProfile;
}

function ProfileHeaderIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
