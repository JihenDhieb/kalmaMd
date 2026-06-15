export type UserRole = "Patient" | "Provider" | "Admin";

export type AssessmentOption = {
  id: string;
  label: string;
  helperText?: string;
};

export type AssessmentQuestion = {
  id: string;
  step: number;
  category: "safety" | "dry-eye";
  prompt: string;
  description: string;
  options: AssessmentOption[];
};

export type SeveritySummary = {
  label: string;
  tone: "low" | "moderate" | "review";
  description: string;
};

export type Appointment = {
  id: string;
  patientInitials: string;
  appointmentType: string;
  date: string;
  time: string;
  status: "Requested" | "Scheduled" | "Ready for review";
  assessmentStatus: "Not started" | "In progress" | "Submitted";
  providerName?: string;
};

export type BookingSlot = {
  id: string;
  label: string;
};

export type ProviderOption = {
  id: string;
  name: string;
  specialty: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  status: "In review" | "Editorial";
};

export type SymptomEntry = {
  id: string;
  date: string;
  dryness: number;
  irritation: number;
  trigger: string;
  severity: "Low" | "Moderate" | "High";
};

export type PatientProfile = {
  initials: string;
  displayName: string;
  email: string;
  phone: string;
  preferredContact: string;
  timezone: string;
  communicationPreference: string;
};

export type ShopProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  recommended: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type OrderConfirmation = {
  orderNumber: string;
  createdAt: string;
  deliveryWindow: string;
};

export type AdminPatient = {
  id: string;
  initials: string;
  status: "Active" | "Review needed" | "Inactive";
  lastActivity: string;
};

export type AdminAssessment = {
  id: string;
  patientInitials: string;
  submittedAt: string;
  severity: "Low" | "Moderate" | "High";
  status: "Submitted" | "Reviewed" | "Pending review";
};

export type AdminScheduleEntry = {
  id: string;
  providerName: string;
  date: string;
  slots: string[];
  status: "Open" | "Limited" | "Full";
};

export type ProviderNote = {
  id: string;
  date: string;
  author: string;
  note: string;
};
