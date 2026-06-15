"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { checkoutSummary, patientProfile } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function CheckoutPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientCart} label={t("common.backToCart")} />
      <PageHeader eyebrow={t("shop.eyebrow")} title={t("common.checkout")} description={t("shop.checkoutDescription")} />
      <Alert tone="warning">{t("shop.paymentNotice")}</Alert>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          <Card title={t("shop.contactDetails")}>
            <div className="grid gap-4">
              <Input id="checkout-name" label={t("shop.name")} value={patientProfile.displayName} readOnly />
              <Input id="checkout-email" label={t("common.email")} value={patientProfile.email} readOnly />
              <Input id="checkout-phone" label={t("profile.phone")} value={patientProfile.phone} readOnly />
            </div>
          </Card>
          <Card title={t("shop.paymentSection")}>
            <div className="grid gap-4">
              <Input id="payment-method" label={t("shop.paymentMethod")} value={t("shop.paymentValue")} readOnly />
              <p className="text-sm leading-6 text-stone-600">
                {t("shop.paymentCopy")}
              </p>
            </div>
          </Card>
        </div>
        <Card title={t("shop.orderSummary")}>
          <dl className="grid gap-3 text-sm">
            <div className="flex justify-between gap-3"><dt>{t("shop.subtotal")}</dt><dd>${checkoutSummary.subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-3"><dt>{t("shop.shipping")}</dt><dd>${checkoutSummary.shipping.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-3"><dt>{t("shop.tax")}</dt><dd>${checkoutSummary.tax.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-3 border-t border-stone-200 pt-3 font-bold text-foreground"><dt>{t("shop.total")}</dt><dd>${checkoutSummary.total.toFixed(2)}</dd></div>
          </dl>
          <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600" href={routes.patientOrderConfirmation}>
            {t("shop.placeOrder")}
          </Link>
        </Card>
      </div>
    </section>
  );
}
