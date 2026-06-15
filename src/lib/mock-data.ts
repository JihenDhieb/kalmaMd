import type {
  Appointment,
  AdminAssessment,
  AdminPatient,
  AdminScheduleEntry,
  AssessmentQuestion,
  BlogPost,
  BookingSlot,
  CartItem,
  CheckoutSummary,
  OrderConfirmation,
  PatientProfile,
  ProviderNote,
  ProviderOption,
  SeveritySummary,
  ShopProduct,
  SymptomEntry,
} from "@/lib/types";

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "safety-sudden-change",
    step: 1,
    category: "safety",
    prompt: "Have you noticed a sudden change in vision?",
    description: "Safety screening question prepared for specialist review.",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "safety-pain",
    step: 1,
    category: "safety",
    prompt: "Are you experiencing severe eye pain?",
    description: "Safety screening question prepared for clinical intake context.",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "dry-eye-comfort",
    step: 2,
    category: "dry-eye",
    prompt: "How often do your eyes feel dry or irritated?",
    description: "Dry eye symptom question for your care profile.",
    options: [
      { id: "rarely", label: "Rarely" },
      { id: "sometimes", label: "Sometimes" },
      { id: "often", label: "Often" },
    ],
  },
  {
    id: "dry-eye-screen",
    step: 2,
    category: "dry-eye",
    prompt: "Do symptoms feel worse during screen use or reading?",
    description: "Symptom pattern question for specialist review.",
    options: [
      { id: "no", label: "No" },
      { id: "sometimes", label: "Sometimes" },
      { id: "yes", label: "Yes" },
    ],
  },
];

export const severitySummary: SeveritySummary = {
  label: "Ready for provider review",
  tone: "review",
  description:
    "Your responses are organized for specialist review and care planning.",
};

export const appointments: Appointment[] = [
  {
    id: "apt-001",
    patientInitials: "AM",
    appointmentType: "Virtual eye-care consultation",
    date: "June 18, 2026",
    time: "10:30 AM",
    status: "Scheduled",
    assessmentStatus: "Submitted",
    providerName: "Dr. Chen",
  },
  {
    id: "apt-002",
    patientInitials: "JL",
    appointmentType: "Assessment review",
    date: "June 19, 2026",
    time: "2:00 PM",
    status: "Ready for review",
    assessmentStatus: "Submitted",
    providerName: "Dr. Patel",
  },
];

export const providers: ProviderOption[] = [
  { id: "chen", name: "Dr. Chen", specialty: "Optometry review" },
  { id: "patel", name: "Dr. Patel", specialty: "Dry eye consultation" },
];

export const availableTimeSlots: BookingSlot[] = [
  { id: "slot-1030", label: "10:30 AM" },
  { id: "slot-1300", label: "1:00 PM" },
  { id: "slot-1430", label: "2:30 PM" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "workflow-readiness",
    title: "Preparing a virtual eye-care workflow",
    excerpt: "A practical look at moving from intake to virtual eye-care consultation.",
    status: "In review",
  },
  {
    id: "privacy-first",
    title: "Privacy and data in a medical interface",
    excerpt: "How thoughtful product design can reduce unnecessary data exposure.",
    status: "Editorial",
  },
  {
    id: "consultation-flow",
    title: "From assessment to virtual consultation",
    excerpt: "What patients can expect when preparing for a virtual eye-care visit.",
    status: "In review",
  },
];

export const symptomEntries: SymptomEntry[] = [
  {
    id: "sym-001",
    date: "June 10, 2026",
    dryness: 3,
    irritation: 2,
    trigger: "Screen use",
    severity: "Moderate",
  },
  {
    id: "sym-002",
    date: "June 11, 2026",
    dryness: 2,
    irritation: 1,
    trigger: "Air conditioning",
    severity: "Low",
  },
  {
    id: "sym-003",
    date: "June 12, 2026",
    dryness: 4,
    irritation: 3,
    trigger: "Outdoor wind",
    severity: "High",
  },
];

export const patientProfile: PatientProfile = {
  initials: "AM",
  displayName: "A. Morgan",
  email: "a.morgan@example.com",
  phone: "+1 (555) 010-2040",
  preferredContact: "Email",
  timezone: "Eastern Time",
  communicationPreference: "Appointment reminders only",
};

export const shopProducts: ShopProduct[] = [
  {
    id: "lid-kit",
    name: "Lid hygiene kit",
    category: "Daily care",
    price: 24,
    description: "A simple daily care bundle for eyelid hygiene routines.",
    recommended: true,
  },
  {
    id: "pf-drops",
    name: "Preservative-free drops",
    category: "Comfort",
    price: 18,
    description: "Comfort-focused drops commonly used for dryness support.",
    recommended: true,
  },
  {
    id: "warm-mask",
    name: "Warm compress mask",
    category: "At-home support",
    price: 32,
    description: "Reusable warm compress support for at-home eye comfort.",
    recommended: false,
  },
];

export const cartItems: CartItem[] = [
  { productId: "lid-kit", quantity: 1 },
  { productId: "pf-drops", quantity: 2 },
];

export const checkoutSummary: CheckoutSummary = {
  subtotal: 60,
  shipping: 0,
  tax: 7.8,
  total: 67.8,
};

export const orderConfirmation: OrderConfirmation = {
  orderNumber: "EC-2048",
  createdAt: "June 12, 2026",
  deliveryWindow: "Estimated delivery: 3-5 business days",
};

export const adminPatients: AdminPatient[] = [
  { id: "pat-001", initials: "AM", status: "Active", lastActivity: "June 12, 2026" },
  { id: "pat-002", initials: "JL", status: "Review needed", lastActivity: "June 11, 2026" },
  { id: "pat-003", initials: "RK", status: "Inactive", lastActivity: "June 4, 2026" },
];

export const adminAssessments: AdminAssessment[] = [
  { id: "asmt-001", patientInitials: "AM", submittedAt: "June 12, 2026", severity: "Moderate", status: "Submitted" },
  { id: "asmt-002", patientInitials: "JL", submittedAt: "June 11, 2026", severity: "High", status: "Pending review" },
  { id: "asmt-003", patientInitials: "RK", submittedAt: "June 8, 2026", severity: "Low", status: "Reviewed" },
];

export const adminScheduleEntries: AdminScheduleEntry[] = [
  { id: "sch-001", providerName: "Dr. Chen", date: "June 18, 2026", slots: ["10:30 AM", "1:00 PM"], status: "Open" },
  { id: "sch-002", providerName: "Dr. Patel", date: "June 19, 2026", slots: ["2:00 PM"], status: "Limited" },
  { id: "sch-003", providerName: "Dr. Chen", date: "June 20, 2026", slots: [], status: "Full" },
];

export const providerNotes: ProviderNote[] = [
  {
    id: "note-001",
    date: "June 12, 2026",
    author: "Dr. Chen",
    note: "Assessment context is ready for provider review.",
  },
  {
    id: "note-002",
    date: "June 11, 2026",
    author: "Care team",
    note: "Booking workflow prepared for care team review.",
  },
];
