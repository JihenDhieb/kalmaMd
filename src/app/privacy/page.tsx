"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-3xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <BackLink href={routes.home} label={t("common.backToHome")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("legal.privacyEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("legal.privacyTitle")}</h1>
      </div>
      <Card>
        <div className="grid gap-4 text-sm leading-7 text-stone-700">
          <p>{t("legal.privacyDescription")}</p>
          <p>{t("legal.privacySystemsCopy")}</p>
          <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.terms}>
            {t("legal.termsLink")}
          </Link>
        </div>
      </Card>
    </section>
  );
}
