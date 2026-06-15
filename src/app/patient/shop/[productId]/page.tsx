"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { productCategoryKey, productDescriptionKey, productNameKey } from "@/components/patient/ShopProductCard";
import { BackLink } from "@/components/ui/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { shopProducts } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const { t } = useTranslation();
  const product = shopProducts.find((item) => item.id === params.productId) ?? shopProducts[0];

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.patientShop} label={t("common.backToShop")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("shop.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t(productNameKey(product.id))}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-700">{t("shop.productDetailDescription")}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="grid aspect-square place-items-center rounded-xl border border-stone-200 bg-primary-50">
            <div className="grid size-40 place-items-center rounded-full bg-white text-primary-700 shadow-sm ring-1 ring-primary-100">
              <ProductIcon />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone={product.recommended ? "accent" : "stone"}>
              {product.recommended ? t("status.Recommended") : t(productCategoryKey(product.id))}
            </Badge>
            <p className="text-3xl font-bold text-primary-700">${product.price.toFixed(2)}</p>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-foreground">{t(productNameKey(product.id))}</h2>
          <p className="mt-3 text-base leading-7 text-stone-700">{t(productDescriptionKey(product.id))}</p>

          <div className="mt-6 grid gap-2">
            <label className="text-sm font-semibold text-foreground" htmlFor="quantity">
              {t("shop.quantity")}
            </label>
            <input
              id="quantity"
              className="min-h-11 w-28 rounded-md border border-stone-200 bg-white px-3 py-2 text-base text-foreground"
              defaultValue={1}
              min={1}
              type="number"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              href={routes.patientCart}
            >
              {t("shop.addToCart")}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
              href={routes.patientShop}
            >
              {t("shop.continueShopping")}
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}

function ProductIcon() {
  return (
    <svg aria-hidden="true" className="size-24" viewBox="0 0 64 64" fill="none">
      <path d="M18 18h28l-3 34H21L18 18Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
      <path d="M24 18a8 8 0 0 1 16 0" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      <path d="M25 34h14M25 42h10" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}
