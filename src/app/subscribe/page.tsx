"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export default function SubscribePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, setSession } = useMockSession();

  useEffect(() => {
    if (session.isAuthenticated && session.isSubscribed) {
      router.replace(routes.results);
    }
  }, [router, session.isAuthenticated, session.isSubscribed]);

  function handleSubscribe() {
    setSession({ isSubscribed: true });
    router.push(routes.results);
  }

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <BackLink href={routes.results} label={t("common.backToResults")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("subscribe.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("subscribe.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {t("subscribe.description")}
        </p>
      </div>
      <Alert tone="warning">{t("subscribe.paymentNotice")}</Alert>
      <Card title={t("subscribe.planDetails")} description={t("subscribe.planDescription")}>
        <div className="mb-6 rounded-lg border border-stone-200 bg-primary-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">{t("subscribe.planName")}</p>
          <p className="mt-2 text-4xl font-bold text-foreground">{t("subscribe.planPrice")}</p>
          <p className="mt-2 text-sm text-stone-700">{t("subscribe.planCopy")}</p>
        </div>
        <ul className="mb-6 grid gap-3 text-sm text-stone-700">
          <li>{t("subscribe.benefitRecommendations")}</li>
          <li>{t("subscribe.benefitBooking")}</li>
          <li>{t("subscribe.benefitPreparation")}</li>
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleSubscribe}>
            {t("subscribe.reviewCarePlan")}
          </Button>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50" href={routes.booking}>
            {t("subscribe.continueBooking")}
          </Link>
        </div>
      </Card>
    </section>
  );
}
