"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import { Alert } from "@/components/ui/Alert";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { availableTimeSlots, providers } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export default function PatientBookingPage() {
  const { t } = useTranslation();
  const providerOptions = providers.map((provider) => `${provider.name} - ${provider.id === "chen" ? t("mock.providerOptometry") : t("mock.providerDryEye")}`);
  const appointmentTypeOptions = [t("mock.appointmentVirtual"), t("mock.appointmentReview"), t("mock.appointmentFollowUp")];
  const [message, setMessage] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(providerOptions[0]);
  const [appointmentType, setAppointmentType] = useState(appointmentTypeOptions[0]);
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(t("booking.prepared"));
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <BackLink href={routes.results} label={t("common.backToResults")} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{t("booking.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">{t("booking.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-700">{t("booking.description")}</p>
      </div>

      <Alert tone="warning">
        {t("booking.availabilityNotice")}
      </Alert>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card title={t("booking.details")} description={t("booking.detailsDescription")}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <Select
              id="provider"
              label={t("booking.providerSelector")}
              name="provider"
              onChange={(event) => setSelectedProvider(event.currentTarget.value)}
              options={providerOptions}
              required
              value={selectedProvider}
            />
            <Select
              id="booking-type"
              label={t("booking.typeSelector")}
              name="consultationType"
              onChange={(event) => setAppointmentType(event.currentTarget.value)}
              options={appointmentTypeOptions}
              required
              value={appointmentType}
            />
            <Input
              id="booking-date"
              label={t("booking.dateSelector")}
              name="preferredDate"
              onChange={(event) => setPreferredDate(event.currentTarget.value)}
              type="date"
              required
              value={preferredDate}
            />
            <RadioGroup
              legend={t("booking.timeSlots")}
              name="timeSlot"
              onChange={setSelectedSlot}
              options={availableTimeSlots.map((slot) => ({ id: slot.id, label: slot.label }))}
              required
              value={selectedSlot}
            />
            <Button type="submit" disabled={!preferredDate || !selectedSlot}>
              {t("booking.prepare")}
            </Button>
            <div aria-live="polite">
              {message ? (
                <Alert tone="success" status="status">
                  {message}
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600" href={routes.consultation}>
                      {t("booking.join")}
                    </Link>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50" href={routes.patientDashboard}>
                      {t("common.backToDashboard")}
                    </Link>
                  </div>
                </Alert>
              ) : null}
            </div>
          </form>
        </Card>

        <Card title={t("booking.summary")} description={t("booking.summaryDescription")}>
          <dl className="grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">{t("booking.provider")}</dt>
              <dd className="mt-1 text-stone-700">{selectedProvider}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">{t("booking.type")}</dt>
              <dd className="mt-1 text-stone-700">{appointmentType}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">{t("booking.date")}</dt>
              <dd className="mt-1 text-stone-700">{preferredDate || t("status.Not selected")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">{t("booking.time")}</dt>
              <dd className="mt-1 text-stone-700">
                {availableTimeSlots.find((slot) => slot.id === selectedSlot)?.label || t("status.Not selected")}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </section>
  );
}
