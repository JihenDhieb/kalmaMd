"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { ShopProduct } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <Badge tone={product.recommended ? "accent" : "stone"}>
          {product.recommended ? t("status.Recommended") : t(productCategoryKey(product.id))}
        </Badge>
        <p className="text-lg font-bold text-primary-700">${product.price.toFixed(2)}</p>
      </div>
      <h2 className="mt-4 text-xl font-bold text-foreground">{t(productNameKey(product.id))}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">{t(productDescriptionKey(product.id))}</p>
      <Link
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        href={`${routes.patientProduct}/${product.id}`}
      >
        {t("shop.viewProduct")}
      </Link>
    </Card>
  );
}

export function productNameKey(id: string) {
  return {
    "lid-kit": "mock.productLidKit",
    "pf-drops": "mock.productDrops",
    "warm-mask": "mock.productMask",
  }[id] ?? id;
}

export function productDescriptionKey(id: string) {
  return {
    "lid-kit": "mock.productLidKitDescription",
    "pf-drops": "mock.productDropsDescription",
    "warm-mask": "mock.productMaskDescription",
  }[id] ?? id;
}

export function productCategoryKey(id: string) {
  return {
    "lid-kit": "mock.categoryDaily",
    "pf-drops": "mock.categoryComfort",
    "warm-mask": "mock.categorySupport",
  }[id] ?? id;
}
