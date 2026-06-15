"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDashboardRouteByRole, getRequiredRolesForPath } from "@/lib/auth";
import { routes } from "@/lib/routes";
import { useMockSession } from "@/components/layout/MockSessionProvider";

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useMockSession();
  const requiredRoles = getRequiredRolesForPath(pathname);
  const isProtectedRoute = requiredRoles !== null;
  const needsSubscription = requiresSubscription(pathname);
  const hasRoleAccess = !requiredRoles || (session.isAuthenticated && requiredRoles.includes(session.role));
  const isAllowed = hasRoleAccess && (!needsSubscription || session.isSubscribed);

  useEffect(() => {
    if (!requiredRoles) {
      return;
    }

    if (!session.isAuthenticated) {
      router.replace(routes.login);
      return;
    }

    if (!requiredRoles.includes(session.role)) {
      router.replace(getDashboardRouteByRole(session.role));
      return;
    }

    if (requiresSubscription(pathname) && !session.isSubscribed) {
      router.replace(routes.subscribe);
    }
  }, [pathname, requiredRoles, router, session.isAuthenticated, session.isSubscribed, session.role]);

  if (isProtectedRoute && !isAllowed) {
    return null;
  }

  return <>{children}</>;
}

function requiresSubscription(pathname: string) {
  return pathname.startsWith(routes.patientShop) || pathname === routes.booking;
}
