import { routes } from "@/lib/routes";
import type { UserRole } from "@/lib/types";

export const publicRegistrationRoles = ["Patient", "Provider"] as const satisfies readonly UserRole[];

export function getDashboardRouteByRole(role: UserRole) {
  if (role === "Provider") {
    return routes.providerDashboard;
  }

  if (role === "Admin") {
    return routes.admin;
  }

  return routes.patientDashboard;
}

export function isUserRole(value: unknown): value is UserRole {
  return value === "Patient" || value === "Provider" || value === "Admin";
}

export function isPublicRegistrationRole(value: unknown): value is (typeof publicRegistrationRoles)[number] {
  return value === "Patient" || value === "Provider";
}

export function getRequiredRolesForPath(pathname: string): UserRole[] | null {
  if (pathname === routes.adminAssessment) {
    return ["Admin"];
  }

  if (pathname.startsWith("/admin")) {
    return ["Admin"];
  }

  if (pathname.startsWith("/provider")) {
    return ["Provider"];
  }

  if (pathname.startsWith("/patient") || pathname === routes.subscribe) {
    return ["Patient"];
  }

  if (pathname === routes.consultation) {
    return ["Patient", "Provider", "Admin"];
  }

  return null;
}
