import { ProviderAppointmentDetailClient } from "./ProviderAppointmentDetailClient";
import { appointments, providerNotes } from "@/lib/mock-data";

type ProviderAppointmentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProviderAppointmentPage({ params }: ProviderAppointmentPageProps) {
  const { id } = await params;
  const appointment = appointments.find((item) => item.id === id) ?? appointments[0];

  return <ProviderAppointmentDetailClient appointment={appointment} notes={providerNotes} />;
}
