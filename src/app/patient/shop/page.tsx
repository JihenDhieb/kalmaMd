"use client";

import Link from "next/link";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { ShopProductCard } from "@/components/patient/ShopProductCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { shopProducts } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function PatientShopPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow={t("shop.eyebrow")}
        title={t("shop.title")}
        description={t("shop.description")}
      />
      <Link
        className="w-fit rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        href={routes.patientCart}
      >
        {t("shop.viewCart")}
      </Link>
      <div className="grid gap-5 md:grid-cols-3">
        {shopProducts.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
