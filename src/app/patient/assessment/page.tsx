"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useMockSession } from "@/components/layout/MockSessionProvider";
import { AssessmentQuestion } from "@/components/patient/AssessmentQuestion";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Stepper } from "@/components/ui/Stepper";
import { assessmentQuestions } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function PatientAssessmentPage() {
  const { t } = useTranslation();
  const { session } = useMockSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const visibleQuestions = useMemo(
    () => assessmentQuestions.filter((question) => question.step === currentStep),
    [currentStep],
  );
  const answeredVisibleQuestions = visibleQuestions.every((question) => answers[question.id]);
  const progressValue = currentStep === 1 ? 1 : isComplete ? 2 : 1.5;

  function setAnswer(questionId: string, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function continueFlow() {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    setIsComplete(true);
  }

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink
        href={session.role === "Admin" ? routes.admin : routes.patientDashboard}
        label={session.role === "Admin" ? t("common.backToAdmin") : t("common.backToDashboard")}
      />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("assessment.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("assessment.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-700">
          {t("assessment.description")}
        </p>
      </div>
      <Stepper steps={[t("assessment.safetyStep"), t("assessment.dryEyeStep")]} currentStep={currentStep} />
      <Progress label={t("assessment.progress")} value={progressValue} max={2} />

      <form className="grid gap-5">
        <fieldset className="grid gap-5">
          <legend className="text-lg font-bold text-foreground">
            {currentStep === 1 ? t("assessment.legendSafety") : t("assessment.legendDryEye")}
          </legend>
          {visibleQuestions.map((question) => (
            <AssessmentQuestion
              key={question.id}
              onChange={(value) => setAnswer(question.id, value)}
              question={question}
              value={answers[question.id]}
            />
          ))}
        </fieldset>

        <Alert tone="warning">
          {t("assessment.warning")}
        </Alert>

        <div className="flex flex-col gap-3 sm:flex-row">
          {currentStep === 2 ? (
            <Button type="button" variant="secondary" onClick={() => setCurrentStep(1)}>
              {t("assessment.back")}
            </Button>
          ) : null}
          <Button type="button" onClick={continueFlow} disabled={!answeredVisibleQuestions}>
            {currentStep === 1 ? t("assessment.continueDryEye") : t("assessment.complete")}
          </Button>
        </div>

        <div aria-live="polite">
          {isComplete ? (
            <Alert tone="success" status="status">
              {t("assessment.completeMessage")} <Link className="font-semibold underline" href={routes.results}>{t("patientDashboard.viewResults")}</Link>
            </Alert>
          ) : null}
        </div>
      </form>
    </section>
  );
}
