"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { routes } from "@/lib/routes";

type SignOutLinkProps = {
  className?: string;
};

export function SignOutLink({ className }: SignOutLinkProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { signOut } = useMockSession();

  function handleSignOut() {
    signOut();
    router.push(routes.login);
  }

  return (
    <button
      className={
        className ??
        "inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:text-primary-900"
      }
      onClick={handleSignOut}
      type="button"
    >
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path d="M10 6H6.5A2.5 2.5 0 0 0 4 8.5v7A2.5 2.5 0 0 0 6.5 18H10" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M14 8l4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M18 12H9" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
      {t("common.signOut")}
    </button>
  );
}
