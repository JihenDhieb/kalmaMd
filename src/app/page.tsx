"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { StartAssessmentLink } from "@/components/home/StartAssessmentLink";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/lib/routes";

type IconName = "assessment" | "care" | "clock" | "doctor" | "eye" | "leaf" | "lock" | "person" | "shield" | "spark" | "sun" | "tear" | "video" | "wind";

export default function Home() {
  const { t } = useTranslation();

  const heroBenefits = [
    { label: t("home.benefitFree"), icon: "assessment" },
    { label: t("home.benefitSecure"), icon: "lock" },
    { label: t("home.benefitReferral"), icon: "person" },
  ] satisfies Array<{ label: string; icon: IconName }>;

  const carePhotos = [
    {
      title: t("home.clinicalAssessment"),
      text: t("home.clinicalAssessmentText"),
      image: "/images/home/assessment-care.png",
      icon: "assessment",
    },
    {
      title: t("home.virtualConsultation"),
      text: t("home.virtualConsultationText"),
      image: "/images/home/consultation-care.png",
      icon: "video",
    },
    {
      title: t("home.personalizedPlan"),
      text: t("home.personalizedPlanText"),
      image: "/images/home/plan-care.png",
      icon: "spark",
    },
  ] satisfies Array<{ title: string; text: string; image: string; icon: IconName }>;
  const scrollingCarePhotos = [...carePhotos, ...carePhotos];

  const proofItems = [
    { title: t("home.trustedSpecialists"), text: t("home.trustedSpecialistsText"), image: "/images/home/specialist-care.png", icon: "shield" },
    { title: t("home.saveTime"), text: t("home.saveTimeText"), image: "/images/home/assessment-care.png", icon: "clock" },
    { title: t("home.comprehensiveCare"), text: t("home.comprehensiveCareText"), image: "/images/home/consultation-care.png", icon: "care" },
    { title: t("home.proudlyCanadian"), text: t("home.proudlyCanadianText"), image: "/images/home/canada-care.png", icon: "leaf", accent: true },
  ] satisfies Array<{ title: string; text: string; image: string; icon: IconName; accent?: boolean }>;

  const symptoms = [
    { title: t("home.burning"), text: t("home.burningText"), icon: "spark", accent: true },
    { title: t("home.gritty"), text: t("home.grittyText"), icon: "assessment" },
    { title: t("home.tearing"), text: t("home.tearingText"), icon: "tear" },
    { title: t("home.vision"), text: t("home.visionText"), icon: "eye" },
    { title: t("home.light"), text: t("home.lightText"), icon: "sun", accent: true },
    { title: t("home.triggers"), text: t("home.triggersText"), icon: "wind" },
  ] satisfies Array<{ title: string; text: string; icon: IconName; accent?: boolean }>;

  const steps = [
    { title: t("home.stepAccount"), text: t("home.stepAccountText"), icon: "person", image: "/images/home/assessment-care.png" },
    { title: t("home.stepAssessment"), text: t("home.stepAssessmentText"), icon: "assessment", image: "/images/home/plan-care.png" },
    { title: t("home.stepResults"), text: t("home.stepResultsText"), icon: "eye", image: "/images/home/hero-care.png" },
    { title: t("home.stepSpecialist"), text: t("home.stepSpecialistText"), icon: "doctor", image: "/images/home/consultation-care.png" },
  ] satisfies Array<{ title: string; text: string; icon: IconName; image: string }>;

  const trustItems = [
    { title: t("home.trustSpecialists"), text: t("home.trustSpecialistsText"), icon: "shield" },
    { title: t("home.trustPrivacy"), text: t("home.trustPrivacyText"), icon: "lock" },
    { title: t("home.trustEvidence"), text: t("home.trustEvidenceText"), icon: "care" },
    { title: t("home.trustWaiting"), text: t("home.trustWaitingText"), icon: "clock", accent: true },
  ] satisfies Array<{ title: string; text: string; icon: IconName; accent?: boolean }>;

  return (
    <div className="overflow-hidden bg-background">
      <section className="bg-[#243629] px-3 pb-10">
        <div className="relative mx-auto min-h-[680px] max-w-[1880px] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/home/hero-care.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#243629]/98 via-[#243629]/84 to-[#243629]/34" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#243629]/94 to-transparent" />
          <div className="relative flex min-h-[680px] items-center px-6 py-16 sm:px-10 lg:px-16">
            <div className="home-rise max-w-4xl">
              <Badge tone="accent">{t("home.badge")}</Badge>
              <h1 className="mt-8 max-w-4xl font-serif text-6xl font-bold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
                {t("home.titlePrefix")} <span className="italic text-[#e8e1d9]">{t("home.titleHighlight")}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-white/88">{t("home.description")}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <StartAssessmentLink />
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/55 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18"
                  href="#how-it-works"
                >
                  {t("common.howItWorks")}
                  <span aria-hidden="true">&gt;</span>
                </Link>
              </div>
              <ul className="mt-10 flex flex-col gap-4 text-sm font-semibold text-white/82 sm:flex-row sm:items-center">
                {heroBenefits.map((benefit) => (
                  <li key={benefit.label} className="flex items-center gap-2 sm:border-r sm:border-white/25 sm:pr-5 last:sm:border-r-0">
                    <span className="grid size-8 place-items-center rounded-full bg-white/12 text-[#e8e1d9] ring-1 ring-white/25">
                      <HomeIcon icon={benefit.icon} size="sm" />
                    </span>
                    {benefit.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#304536] py-16 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0_42%,color-mix(in_srgb,var(--primary-500)_25%,transparent)_42.1%_42.3%,transparent_42.4%),linear-gradient(25deg,transparent_0_55%,color-mix(in_srgb,var(--primary-500)_18%,transparent)_55.1%_55.25%,transparent_55.3%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e8e1d9]">{t("home.processEyebrow")}</p>
            <h2 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">
              {t("home.processTitleStart")} <span className="italic text-[#e8e1d9]">{t("home.processTitleHighlight")}</span>
            </h2>
            <p className="mt-6 text-xl text-white/78">{t("home.processDescription")}</p>
          </div>
          <div className="home-scroll-mask mt-12 overflow-hidden" aria-label={t("home.processDescription")}>
            <div className="home-scroll-track flex w-max gap-5">
              {scrollingCarePhotos.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className="relative min-h-[360px] w-[82vw] max-w-[580px] shrink-0 overflow-hidden rounded-2xl bg-primary-800 shadow-sm sm:w-[540px] lg:w-[580px]"
                aria-hidden={index >= carePhotos.length}
              >
                <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 580px, 82vw" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#304536]/94 via-[#304536]/42 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-bold text-white">
                  <span className="size-2 rounded-full bg-[#e8e1d9]" />
                  {card.title}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid size-12 place-items-center rounded-full bg-white/14 text-[#e8e1d9] ring-1 ring-white/25">
                    <HomeIcon icon={card.icon} />
                  </div>
                  <h3 className="mt-5 text-3xl font-bold text-white">{card.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-white/82">{card.text}</p>
                </div>
              </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent-50 py-16 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-28 bg-[#304536]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,var(--surface)_0_16rem,transparent_16.1rem),radial-gradient(circle_at_0%_100%,var(--accent-100)_0_26rem,transparent_26.1rem),radial-gradient(circle_at_100%_100%,var(--accent-100)_0_26rem,transparent_26.1rem)]" />
        <div className="relative mx-auto grid max-w-[1880px] border-y border-stone-200 lg:grid-cols-4">
          {proofItems.map((item) => (
            <article key={item.title} className="border-b border-stone-200 px-6 py-10 text-center lg:border-b-0 lg:border-r lg:px-10 last:lg:border-r-0">
              <div className="relative mx-auto size-64">
                <div className="absolute inset-0 rounded-full border border-stone-300" />
                <div className={`absolute inset-3 rounded-full border-[12px] ${item.accent ? "border-r-accent-600" : "border-r-primary-700"} border-transparent`} />
                <div className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary-700 ring-4 ring-accent-50" />
                <div className="absolute inset-8 overflow-hidden rounded-full bg-white shadow-sm">
                  <Image src={item.image} alt="" fill sizes="256px" className="object-cover" />
                </div>
              </div>
              <h2 className="mx-auto mt-8 max-w-xs font-serif text-4xl font-bold leading-tight text-[#304536]">
                {item.title}
              </h2>
              <div className="mx-auto mt-6 h-0.5 w-14 rounded-full bg-accent-700" />
              <p className="mx-auto mt-6 max-w-xs text-lg leading-8 text-stone-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-accent-100 py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-8">
          <SectionHeading eyebrow={t("home.symptomsEyebrow")} title={t("home.symptomsTitle")} description={t("home.symptomsDescription")} />
          <div className="relative min-h-72 overflow-hidden rounded-[1.75rem] border border-stone-200 bg-[#304536] shadow-sm">
            <Image src="/images/home/plan-care.png" alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#304536]/84 via-[#304536]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 max-w-sm">
              <div className="grid size-12 place-items-center rounded-full bg-white/14 text-[#e8e1d9] ring-1 ring-white/25">
                <HomeIcon icon="eye" />
              </div>
              <p className="mt-4 text-lg font-bold leading-7 text-white">{t("home.trustEvidence")}</p>
              <p className="mt-2 text-sm leading-6 text-white/78">{t("home.trustEvidenceText")}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {symptoms.map((symptom, index) => (
            <article
              key={symptom.title}
              className="home-rise rounded-[1.35rem] border border-stone-200 bg-white p-7 shadow-sm"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex gap-5">
                <IconBubble accent={symptom.accent} icon={symptom.icon} />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{symptom.title}</h3>
                  <p className="mt-3 text-base leading-7 text-stone-700">{symptom.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative overflow-hidden bg-stone-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,var(--surface)_0_18rem,transparent_18.1rem),radial-gradient(circle_at_0%_100%,var(--accent-100)_0_24rem,transparent_24.1rem),radial-gradient(circle_at_100%_100%,var(--accent-100)_0_24rem,transparent_24.1rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-800">{t("home.processEyebrow")}</p>
            <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-primary-700" />
            <h2 className="mt-8 font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl">
              {t("home.processTitleStart")} <span className="text-primary-700">{t("home.processTitleHighlight")}</span>
            </h2>
            <p className="mt-5 text-xl leading-8 text-stone-700">{t("home.processDescription")}</p>
          </div>

          <div className="relative mt-14 grid gap-8 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-[198px] hidden border-t-2 border-primary-500 lg:block" />
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="group relative overflow-hidden rounded-[1.45rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden border-b border-stone-200 bg-primary-50">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 300px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#304536]/16 to-transparent" />
                </div>

                <div className="relative px-8 pb-9 pt-12">
                  <span className="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#304536] text-2xl font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <span className="absolute -right-4 top-0 z-10 hidden size-5 -translate-y-1/2 rounded-full border-2 border-primary-700 bg-white lg:block" />
                  ) : null}
                  <div className="mb-5 inline-grid size-12 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                    <HomeIcon icon={step.icon} />
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-foreground">{step.title}</h3>
                  <p className="mt-5 text-lg leading-8 text-stone-700">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#304536] py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e8e1d9]">{t("home.trustEyebrow")}</p>
            <h2 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">
              {t("home.trustTitleStart")} <span className="italic text-[#e8e1d9]">{t("home.trustTitleHighlight")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-9 text-white/78">{t("home.trustDescription")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-sm backdrop-blur">
                <IconBubble accent={item.accent} icon={item.icon} />
                <h3 className="mt-5 text-lg font-bold leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-primary-50" />
          <div className="pointer-events-none absolute -bottom-20 left-8 size-48 rounded-full bg-accent-100" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold leading-tight text-foreground">{t("home.ctaTitle")}</h2>
              <div className="mt-5 h-1 w-20 rounded-full bg-accent-500" />
            </div>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-700"
              href={routes.register}
            >
              {t("home.ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ description, eyebrow, title }: { description: string; eyebrow: string; title: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">{title}</h2>
      <div className="mt-5 h-1 w-20 rounded-full bg-accent-500" />
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">{description}</p>
    </div>
  );
}

function IconBubble({ accent, icon }: { accent?: boolean; icon: IconName }) {
  return (
    <span
      className={`grid size-14 shrink-0 place-items-center rounded-full ${
        accent ? "bg-accent-50 text-accent-700 ring-accent-200" : "bg-primary-50 text-primary-700 ring-primary-100"
      } ring-1`}
    >
      <HomeIcon icon={icon} />
    </span>
  );
}

function HomeIcon({ icon, size = "md" }: { icon: IconName; size?: "sm" | "md" }) {
  const className = size === "sm" ? "size-4" : "size-7";

  if (icon === "clock") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v6l4 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "care") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "doctor" || icon === "person") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        {icon === "doctor" ? <path d="M16 17h4M18 15v4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /> : null}
      </svg>
    );
  }

  if (icon === "eye") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "leaf") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 9 9 3 8l4 5-3 6 6-3 2 5 2-5 6 3-3-6 4-5-6 1-3-6Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "lock") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 10h12v10H6V10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 5 6v6c0 4.4 2.7 7.4 7 9 4.3-1.6 7-4.6 7-9V6l-7-3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "sun") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "tear") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 11s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="2" />
        <path d="M18 15c1.2 1.4 2 2.6 2 3.7a2 2 0 0 1-4 0c0-1.1.8-2.3 2-3.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "video") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M5 7.5h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
        <path d="m16 10 5-3v10l-5-3" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "wind") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 8h10a3 3 0 1 0-3-3M4 13h15a3 3 0 1 1-3 3M4 18h7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 9.7 9.7 3 12l6.7 2.3L12 21l2.3-6.7L21 12l-6.7-2.3L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8 4h8l2 2v14H6V6l2-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
