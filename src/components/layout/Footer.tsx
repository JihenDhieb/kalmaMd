"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { routes } from "@/lib/routes";

export function Footer() {
  const { t } = useTranslation();
  const footerColumns = [
    {
      title: t("layout.footerCareTitle"),
      links: [
        { label: t("common.getStarted"), href: routes.register },
        { label: t("assessment.title"), href: routes.assessment },
        { label: t("common.bookConsultation"), href: routes.booking },
        { label: t("common.consultation"), href: routes.consultation },
      ],
    },
    {
      title: t("layout.footerExploreTitle"),
      links: [
        { label: t("common.shop"), href: routes.patientShop },
        { label: t("common.howItWorks"), href: "/#how-it-works" },
        { label: t("common.blog"), href: routes.blog },
        { label: t("common.signIn"), href: routes.login },
      ],
    },
    {
      title: t("layout.footerLegalTitle"),
      links: [
        { label: t("common.privacyPolicy"), href: routes.privacy },
        { label: t("common.termsOfService"), href: routes.terms },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-background px-3 py-8">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[32rem] -translate-x-1/2 rounded-full bg-primary-100 blur-3xl" />
      <div className="relative mx-auto max-w-[1880px] overflow-hidden rounded-[2rem] bg-[#304536] px-6 py-10 text-white shadow-sm sm:px-10 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,transparent_0_48%,color-mix(in_srgb,var(--primary-500)_18%,transparent)_48.1%_48.25%,transparent_48.35%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1.6fr_1fr]">
          <div>
            <BrandLogo inverted />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">{t("layout.footerDescription")}</p>
          </div>

          <nav className="grid gap-8 sm:grid-cols-3" aria-label={t("layout.footerNavigation")}>
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold text-[#7A9E7E]">{column.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link className="text-sm font-semibold text-white/86 hover:text-accent-200 hover:underline" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="rounded-xl bg-[#7A9E7E]/20 p-6 ring-1 ring-white/10">
            <h2 className="text-sm font-bold text-white">{t("layout.footerStayLoop")}</h2>
            <div className="mt-5 flex items-center gap-3 border-b border-white/35 pb-3">
              <label className="sr-only" htmlFor="footer-email">
                {t("layout.footerEmailPlaceholder")}
              </label>
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/58 focus:outline-none"
                id="footer-email"
                placeholder={t("layout.footerEmailPlaceholder")}
                type="email"
              />
              <button className="text-sm font-bold text-accent-200 hover:text-white" type="button">
                {t("layout.footerSubscribe")}
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/72">{t("layout.medicalDisclaimer")}</p>
            <div className="mt-7 flex items-center gap-2 text-accent-200" aria-label={t("layout.footerRatingLabel")}>
              <span aria-hidden="true" className="text-2xl leading-none">★★★★★</span>
            </div>
            <p className="mt-2 text-sm text-white/78">{t("layout.footerReviewCopy")}</p>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col gap-5 border-t border-white/12 pt-8 text-xs text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>{t("layout.footerCopyright")}</p>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-accent-200 hover:underline" href={routes.terms}>
              {t("common.termsOfService")}
            </Link>
            <Link className="hover:text-accent-200 hover:underline" href={routes.privacy}>
              {t("common.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
