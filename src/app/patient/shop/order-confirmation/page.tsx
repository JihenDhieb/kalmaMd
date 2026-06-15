"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { checkoutSummary, orderConfirmation } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function OrderConfirmationPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientShop} label={t("common.backToShop")} />
      <PageHeader eyebrow={t("shop.eyebrow")} title={t("shop.orderConfirmation")} description={t("shop.orderReady")} />
      <Card title={t("shop.orderPlaced")}>
        <p className="text-sm leading-6 text-stone-600">{t("shop.orderNumber")}: <strong className="text-foreground">{orderConfirmation.orderNumber}</strong></p>
        <p className="mt-2 text-sm leading-6 text-stone-600">{t("shop.created")}: {orderConfirmation.createdAt}</p>
        <p className="mt-2 text-sm leading-6 text-stone-600">{t("mock.deliveryWindow")}</p>
        <p className="mt-4 text-lg font-bold text-primary-700">{t("shop.total")}: ${checkoutSummary.total.toFixed(2)}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600" href={routes.patientDashboard}>
            {t("shop.backDashboard")}
          </Link>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50" href={routes.patientShop}>
            {t("common.backToShop")}
          </Link>
        </div>
      </Card>
    </section>
  );
}
