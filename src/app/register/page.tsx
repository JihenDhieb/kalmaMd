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
import { Checkbox } from "@/components/ui/Checkbox";
import { EyeIcon, LockIcon, MailIcon, PhoneIcon, UserIcon } from "@/components/ui/FieldIcons";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { getDashboardRouteByRole, isPublicRegistrationRole, publicRegistrationRoles } from "@/lib/auth";
import { routes } from "@/lib/routes";

type RegisterErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  consent?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { registerProfile } = useMockSession();
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [message, setMessage] = useState("");
  const [pendingDestination, setPendingDestination] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");
    const role = String(data.get("role") ?? "");
    const hasConsent = data.get("consent") === "on";
    const nextErrors: RegisterErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t("auth.validEmailError");
    }

    if (password.length < 8) {
      nextErrors.password = t("auth.passwordLengthError");
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = t("auth.passwordMatchError");
    }

    if (!isPublicRegistrationRole(role)) {
      nextErrors.role = t("auth.roleRequiredError");
    }

    if (!hasConsent) {
      nextErrors.consent = t("auth.consentError");
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage("");
      return;
    }

    const profile = registerProfile({
      displayName: [firstName, lastName].filter(Boolean).join(" ") || "Sarah Morgan",
      email,
      phone,
      role: isPublicRegistrationRole(role) ? role : "Patient",
    });
    setMessage(t("auth.registerSuccess"));
    setPendingDestination(getDashboardRouteByRole(profile.role));
  }

  return (
    <AuthShell
      heading={t("auth.registerHeading")}
      intro={t("auth.registerIntro")}
    >
      <Card className="auth-card w-full max-w-2xl rounded-2xl border-stone-200 px-6 py-7 shadow-xl backdrop-blur sm:px-9 lg:px-10">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary-900">{t("auth.registerTitle")}</p>
          <p className="mt-2 text-base text-stone-700">{t("auth.registerSubtitle")}</p>
        </div>

        <form className="mt-7 grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="first-name"
              label={t("auth.firstName")}
              name="firstName"
              autoComplete="given-name"
              className="min-h-12 rounded-lg border-stone-200 pl-12 text-base"
              hideLabel
              leadingIcon={<UserIcon />}
              placeholder={t("auth.firstName")}
              required
            />
            <Input
              id="last-name"
              label={t("auth.lastName")}
              name="lastName"
              autoComplete="family-name"
              className="min-h-12 rounded-lg border-stone-200 pl-12 text-base"
              hideLabel
              leadingIcon={<UserIcon />}
              placeholder={t("auth.lastName")}
              required
            />
          </div>
          <Input
            id="register-email"
            label={t("common.email")}
            name="email"
            type="email"
            autoComplete="email"
            className="min-h-12 rounded-lg border-stone-200 pl-12 text-base"
            error={errors.email}
            hideLabel
            leadingIcon={<MailIcon />}
            placeholder={t("common.email")}
            required
          />
          <Input
            id="phone"
            label={t("auth.phone")}
            name="phone"
            autoComplete="tel"
            className="min-h-12 rounded-lg border-stone-200 pl-12 text-base"
            hideLabel
            leadingIcon={<PhoneIcon />}
            placeholder={t("auth.phone")}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="date-of-birth"
              label={t("auth.dateOfBirth")}
              name="dateOfBirth"
              type="date"
              autoComplete="bday"
              className="min-h-12 rounded-lg border-stone-200 text-base"
              required
            />
            <Input
              id="health-card"
              label={t("auth.healthCard")}
              name="healthCard"
              className="min-h-12 rounded-lg border-stone-200 text-base"
              placeholder={t("auth.healthCard")}
              required
            />
          </div>
          <Select
            id="register-role"
            label={t("auth.role")}
            name="role"
            options={[
              { value: "", label: t("auth.rolePlaceholder") },
              ...publicRegistrationRoles.map((role) => ({ value: role, label: t(`common.${role.toLowerCase()}`) })),
            ]}
            className="min-h-12 rounded-lg border-stone-200 text-base"
            error={errors.role}
            required
            defaultValue=""
          />
          <Input
            id="register-password"
            label={t("auth.password")}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="min-h-12 rounded-lg border-stone-200 pl-12 pr-12 text-base"
            error={errors.password}
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
          <Input
            id="confirm-password"
            label={t("auth.confirmPassword")}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            className="min-h-12 rounded-lg border-stone-200 pl-12 pr-12 text-base"
            error={errors.confirmPassword}
            hideLabel
            leadingIcon={<LockIcon />}
            placeholder={t("auth.confirmPassword")}
            required
            trailingIcon={
              <button
                type="button"
                className="rounded-md p-1 text-primary-800 hover:bg-primary-50"
                aria-label={showConfirmPassword ? t("auth.hideConfirmPassword") : t("auth.showConfirmPassword")}
                onClick={() => setShowConfirmPassword((current) => !current)}
              >
                <EyeIcon />
              </button>
            }
          />
          <Checkbox
            id="consent"
            label={
              <>
                {t("auth.consentPrefix")}{" "}
                <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.terms}>
                  {t("auth.termsOfUse")}
                </Link>{" "}
                {t("auth.and")}{" "}
                <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.privacy}>
                  {t("auth.privacyPolicy")}
                </Link>{" "}
                {t("auth.consentSuffix")}
              </>
            }
            name="consent"
            error={errors.consent}
          />
          <Button className="min-h-12 rounded-lg text-base shadow-sm" type="submit">
            {t("common.createAccount")}
          </Button>

          <p className="text-center text-sm text-stone-700">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link className="font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={routes.login}>
              {t("common.signIn")}
            </Link>
          </p>
          <div aria-live="polite">{message ? <Alert tone="success" status="status">{message}</Alert> : null}</div>
        </form>
      </Card>
    </AuthShell>
  );
}
