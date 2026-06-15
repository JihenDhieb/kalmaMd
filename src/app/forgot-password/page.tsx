"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { AuthShell } from "@/components/layout/AuthShell";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MailIcon } from "@/components/ui/FieldIcons";
import { Input } from "@/components/ui/Input";
import { routes } from "@/lib/routes";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(t("auth.resetReady", { email }));
  }

  return (
    <AuthShell
      heading={t("auth.forgotHeading")}
      intro={t("auth.forgotIntro")}
    >
      <Card className="w-full max-w-2xl rounded-2xl border-stone-200 bg-white px-6 py-10 shadow-2xl sm:px-12">
        <div className="text-center">
          <p className="text-4xl font-bold text-primary-900">{t("auth.forgotTitle")}</p>
          <p className="mt-4 text-lg text-stone-700">{t("auth.forgotSubtitle")}</p>
        </div>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <Input
            id="forgot-email"
            label={t("common.email")}
            name="email"
            type="email"
            autoComplete="email"
            className="min-h-16 rounded-xl border-stone-200 pl-14 text-lg"
            hideLabel
            leadingIcon={<MailIcon />}
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder={t("common.email")}
            required
            value={email}
          />
          <Button className="min-h-16 rounded-xl text-lg shadow-lg" type="submit">
            {t("auth.sendReset")}
          </Button>

          <Link className="text-center text-base font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.login}>
            {t("auth.backToSignIn")}
          </Link>

          <div aria-live="polite">
            {message ? (
              <Alert tone="success" status="status">
                {message} {t("auth.resetNote")}
              </Alert>
            ) : null}
          </div>
        </form>
      </Card>
    </AuthShell>
  );
}
