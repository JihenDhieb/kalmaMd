"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { AuthShell } from "@/components/layout/AuthShell";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EyeIcon, LockIcon, MailIcon } from "@/components/ui/FieldIcons";
import { Input } from "@/components/ui/Input";
import { getDashboardRouteByRole } from "@/lib/auth";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn } = useMockSession();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pendingDestination, setPendingDestination] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!pendingDestination) {
      return;
    }

    router.push(pendingDestination);
  }, [pendingDestination, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const identifier = String(data.get("identifier") ?? "");
    const profile = signIn(identifier);

    if (!profile) {
      setMessage("");
      setError(t("auth.loginError"));
      return;
    }

    setError("");
    setMessage(t("auth.loginSuccess"));
    setPendingDestination(getDashboardRouteByRole(profile.role));
  }

  return (
    <AuthShell
      heading={t("auth.loginHeading")}
      intro={t("auth.loginIntro")}
    >
      <Card className="auth-card mx-auto w-full max-w-lg rounded-2xl border-stone-200 px-6 py-7 shadow-xl backdrop-blur sm:px-9 lg:px-10">
        <div className="text-center">
          <p className="text-3xl font-black text-primary-900">{t("auth.loginTitle")}</p>
          <p className="mt-2 text-base text-stone-700">{t("auth.loginSubtitle")}</p>
        </div>

        <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
          <Input
            id="login-identifier"
            label={t("auth.identifier")}
            name="identifier"
            autoComplete="username"
            className="min-h-12 rounded-lg border-stone-200 bg-surface pl-12 text-base"
            hideLabel
            leadingIcon={<MailIcon />}
            placeholder={t("auth.identifier")}
            required
          />
          <Input
            id="login-password"
            label={t("auth.password")}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="min-h-12 rounded-lg border-stone-200 bg-surface pl-12 pr-12 text-base"
            hideLabel
            leadingIcon={<LockIcon />}
            placeholder={t("auth.password")}
            required
            trailingIcon={
              <button
                type="button"
                className="rounded-md p-1 text-primary-800 hover:bg-primary-50"
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                onClick={() => setShowPassword((current) => !current)}
              >
                <EyeIcon />
              </button>
            }
          />
          <div className="flex justify-end">
            <Link className="text-sm font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.forgotPassword}>
              {t("common.forgotPassword")}
            </Link>
          </div>
          <Button className="min-h-12 rounded-lg text-base shadow-sm" type="submit">
            {t("common.signIn")}
          </Button>

          <p className="text-center text-sm text-stone-700">
            {t("auth.noAccount")}{" "}
            <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.register}>
              {t("common.createAccount")}
            </Link>
          </p>
          <div aria-live="polite">
            {error ? <Alert tone="warning" status="alert">{error}</Alert> : null}
            {message ? <Alert tone="success" status="status">{message}</Alert> : null}
          </div>
        </form>
      </Card>
    </AuthShell>
  );
}
