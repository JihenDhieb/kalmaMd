"use client";

import { BackLink } from "@/components/ui/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { blogPosts } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <BackLink href={routes.home} label={t("common.backToHome")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("legal.blogEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("legal.blogTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-700">
          {t("legal.blogIntro")}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <Badge tone={post.status === "In review" ? "accent" : "stone"}>{t(blogStatusKey(post.status))}</Badge>
            <h2 className="mt-4 text-xl font-bold text-foreground">{t(blogTitleKey(post.id))}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">{t(blogExcerptKey(post.id))}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function blogTitleKey(id: string) {
  if (id === "privacy-first") return "legal.blogConsultationTitle";
  if (id === "consultation-flow") return "legal.blogComfortTitle";
  return "legal.blogAssessmentTitle";
}

function blogExcerptKey(id: string) {
  if (id === "privacy-first") return "legal.blogConsultationExcerpt";
  if (id === "consultation-flow") return "legal.blogComfortExcerpt";
  return "legal.blogAssessmentExcerpt";
}

function blogStatusKey(status: string) {
  return status === "Editorial" ? "legal.Editorial" : "legal.inReview";
}
