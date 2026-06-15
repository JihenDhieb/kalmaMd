"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";

type AuthShellProps = {
  children: ReactNode;
  heading: string;
  intro: string;
};

export function AuthShell({ children, heading, intro }: AuthShellProps) {
  const { t } = useTranslation();

  return (
    <section className="auth-page-shell grid min-h-[calc(100vh-91px)] overflow-hidden bg-background lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="auth-brand-panel relative overflow-hidden border-r border-stone-200 px-6 py-8 text-foreground sm:px-10 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-10">
        <Image
          alt=""
          className="auth-brand-photo absolute inset-0 h-full w-full object-cover"
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          src="/images/home/hero-care.png"
        />
        <div className="auth-brand-photo-overlay absolute inset-0" />
        <div className="absolute -left-24 bottom-[-5rem] size-56 rounded-full border border-primary-100 bg-surface/35" />
        <div className="absolute right-[-5rem] top-[-4rem] size-56 rounded-full bg-surface/40" />
        <div className="absolute right-9 top-24 grid grid-cols-3 gap-3 opacity-40" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="size-1.5 rounded-full bg-primary-400" />
          ))}
        </div>

        <div className="relative z-10">
          <div className="auth-mini-card w-full max-w-sm rounded-xl border border-stone-200 bg-surface/76 p-5 shadow-sm backdrop-blur">
            <div className="grid gap-3">
              <BrandLogo />
              <p className="text-sm leading-6 text-foreground">{t("auth.takeCare")}</p>
            </div>
          </div>

          <div className="mt-10 max-w-md lg:mt-12">
            <h1 className="auth-brand-heading text-4xl font-black leading-tight tracking-tight text-primary-900 sm:text-5xl">{heading}</h1>
            <p className="auth-brand-copy mt-5 text-base leading-8 text-stone-700">{intro}</p>
          </div>
        </div>

        <div className="relative z-10 mt-10 lg:mt-12">
          <EyeCareIllustration />
          <div className="auth-mini-card mt-6 flex max-w-sm items-center gap-3 rounded-xl border border-stone-200 bg-surface/72 p-4 text-stone-700 shadow-sm backdrop-blur">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100">
              <ShieldIcon />
            </span>
            <p className="text-sm leading-6">
              {t("auth.secureAccount")}
            </p>
          </div>
        </div>
      </aside>

      <div className="auth-form-panel relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
        <div className="absolute -right-28 -top-24 size-80 rounded-full bg-surface/40" />
        <div className="absolute -bottom-28 left-[-6rem] size-80 rounded-full bg-surface/30" />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </section>
  );
}

function BrandEyeIcon() {
  return (
    <svg aria-hidden="true" className="size-11" viewBox="0 0 64 64" fill="none">
      <path d="M5 32s10-14 27-14 27 14 27 14-10 14-27 14S5 32 5 32Z" fill="currentColor" opacity=".14" />
      <path d="M5 32s10-14 27-14 27 14 27 14-10 14-27 14S5 32 5 32Z" stroke="currentColor" strokeWidth="4" />
      <circle cx="32" cy="32" r="10" fill="var(--primary-300)" />
      <circle cx="32" cy="32" r="5" fill="var(--primary-900)" />
      <circle cx="36" cy="27" r="3" fill="var(--surface)" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 5 6v5c0 4.5 2.7 8.4 7 10 4.3-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function EyeCareIllustration() {
  return (
    <div className="relative h-48 max-w-md sm:h-56" aria-hidden="true">
      <div className="absolute bottom-0 left-1 h-36 w-24 rounded-lg border border-stone-200 bg-surface shadow-lg sm:left-2 sm:h-40 sm:w-28">
        <div className="mx-auto mt-5 w-fit text-center font-serif text-foreground">
          <p className="text-3xl font-bold sm:text-4xl">E</p>
          <p className="mt-1 text-xl font-bold tracking-[.45em] sm:text-2xl">FP</p>
          <p className="mt-1 text-base font-bold tracking-[.3em] sm:text-lg">TOZ</p>
          <p className="mt-1 text-xs font-bold tracking-[.25em] sm:text-sm">LPED</p>
          <p className="mt-1 text-[0.65rem] font-bold tracking-[.2em] sm:text-xs">PECFD</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-28 grid size-28 place-items-center rounded-full bg-surface shadow-lg sm:left-36 sm:size-32">
        <div className="grid size-20 place-items-center rounded-full bg-primary-100">
          <div className="grid size-14 place-items-center rounded-full bg-primary-300">
            <div className="size-7 rounded-full bg-primary-900" />
          </div>
        </div>
        <div className="absolute right-7 top-8 size-4 rounded-full bg-surface" />
      </div>
      <div className="absolute bottom-6 left-[15.5rem] h-28 w-11 rounded-lg border border-stone-200 bg-surface shadow-lg sm:left-72 sm:w-12">
        <div className="mx-auto mt-2 h-6 w-8 rounded-md bg-stone-100" />
        <div className="mt-4 grid h-11 place-items-center bg-accent-200 text-primary-900">
          <BrandEyeIcon />
        </div>
      </div>
      <PlantIllustration />
    </div>
  );
}

function PlantIllustration() {
  return (
    <svg className="absolute bottom-2 right-0 h-44 w-32 text-primary-500 opacity-50" viewBox="0 0 120 180" fill="none">
      <path d="M24 164C62 125 70 74 58 24" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
      <path d="M61 72c27-24 48-22 51-20-3 22-19 39-51 20Z" fill="currentColor" opacity=".38" />
      <path d="M49 103c-33-5-44-21-45-24 20-10 42-4 45 24Z" fill="currentColor" opacity=".34" />
      <path d="M42 130c30-19 52-14 55-11-7 21-25 34-55 11Z" fill="currentColor" opacity=".3" />
      <path d="M55 54C31 29 31 7 33 4c20 8 32 27 22 50Z" fill="currentColor" opacity=".3" />
    </svg>
  );
}
