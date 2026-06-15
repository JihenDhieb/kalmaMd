"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { AssessmentQuestion as AssessmentQuestionType } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { RadioGroup } from "@/components/ui/RadioGroup";

type AssessmentQuestionProps = {
  question: AssessmentQuestionType;
  value?: string;
  onChange?: (value: string) => void;
};

export function AssessmentQuestion({ onChange, question, value }: AssessmentQuestionProps) {
  const { t } = useTranslation();
  const prompt = t(questionPromptKey(question.id));
  const description = t(questionDescriptionKey(question.id));
  const options = question.options.map((option) => ({
    ...option,
    label: t(`assessment.${option.id}`),
  }));

  return (
    <Card
      aria-labelledby={`${question.id}-heading`}
      title={prompt}
      description={description}
    >
      <p className="mb-4 text-sm font-semibold text-primary-700">{t("assessment.careQuestion")}</p>
      <RadioGroup
        legend={prompt}
        name={question.id}
        onChange={onChange}
        options={options}
        required
        value={value}
      />
    </Card>
  );
}

function questionPromptKey(id: string) {
  const keys: Record<string, string> = {
    "safety-sudden-change": "assessment.qSafetyChange",
    "safety-pain": "assessment.qSafetyPain",
    "dry-eye-comfort": "assessment.qDryComfort",
    "dry-eye-screen": "assessment.qDryScreen",
  };

  return keys[id] ?? id;
}

function questionDescriptionKey(id: string) {
  const keys: Record<string, string> = {
    "safety-sudden-change": "assessment.qSafetyChangeDescription",
    "safety-pain": "assessment.qSafetyPainDescription",
    "dry-eye-comfort": "assessment.qDryComfortDescription",
    "dry-eye-screen": "assessment.qDryScreenDescription",
  };

  return keys[id] ?? id;
}
