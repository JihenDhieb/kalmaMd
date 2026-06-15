"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BackLink } from "@/components/ui/BackLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { cartItems, checkoutSummary, shopProducts } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function CartPage() {
  const { t } = useTranslation();
  const cartProducts = cartItems.map((item) => ({
    item,
    product: shopProducts.find((product) => product.id === item.productId),
  }));

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientShop} label={t("common.backToShop")} />
      <PageHeader eyebrow={t("shop.eyebrow")} title={t("shop.cartTitle")} description={t("shop.cartDescription")} />
      {cartItems.length === 0 ? (
        <EmptyState
          title={t("shop.emptyCart")}
          description={t("shop.emptyCartDescription")}
          action={<Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.patientShop}>{t("common.backToShop")}</Link>}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Card title={t("shop.cartItems")}>
            <ul className="grid gap-4">
              {cartProducts.map(({ item, product }) => (
                <li key={item.productId} className="rounded-md border border-stone-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-foreground">{product ? t(productNameKey(product.id)) : ""}</p>
                      <p className="mt-1 text-sm text-stone-600">{t("shop.quantity")}: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary-700">${((product?.price ?? 0) * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={t("shop.totalSummary")}>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-3"><dt>{t("shop.subtotal")}</dt><dd>${checkoutSummary.subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between gap-3"><dt>{t("shop.shipping")}</dt><dd>${checkoutSummary.shipping.toFixed(2)}</dd></div>
              <div className="flex justify-between gap-3"><dt>{t("shop.tax")}</dt><dd>${checkoutSummary.tax.toFixed(2)}</dd></div>
              <div className="flex justify-between gap-3 border-t border-stone-200 pt-3 font-bold text-foreground"><dt>{t("shop.total")}</dt><dd>${checkoutSummary.total.toFixed(2)}</dd></div>
            </dl>
            <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600" href={routes.patientCheckout}>
              {t("shop.continueCheckout")}
            </Link>
          </Card>
        </div>
      )}
    </section>
  );
}

function productNameKey(id: string) {
  return {
    "lid-kit": "mock.productLidKit",
    "pf-drops": "mock.productDrops",
    "warm-mask": "mock.productMask",
  }[id] ?? id;
}
