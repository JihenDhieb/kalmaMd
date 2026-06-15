"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isUserRole } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

type MockSession = {
  displayName: string;
  email: string;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  phone: string;
  role: UserRole;
};

type MockSessionContextValue = {
  session: MockSession;
  signIn: (identifier: string) => MockSession | null;
  registerProfile: (profile: MockProfile) => MockSession;
  setSession: (nextSession: Partial<MockSession>) => void;
  signOut: () => void;
};

type MockProfile = Omit<MockSession, "isAuthenticated" | "isSubscribed"> & {
  isSubscribed?: boolean;
};

const defaultSession: MockSession = {
  displayName: "Sarah Morgan",
  email: "sarah.morgan@example.com",
  isAuthenticated: false,
  isSubscribed: false,
  phone: "+1 (555) 010-2040",
  role: "Patient",
};

const seededProfiles: MockProfile[] = [
  {
    displayName: "Sarah Morgan",
    email: "sarah.morgan@example.com",
    isSubscribed: true,
    phone: "+1 (555) 010-2040",
    role: "Patient",
  },
  {
    displayName: "Dr. Sarah Chen",
    email: "provider@klaramd.local",
    isSubscribed: false,
    phone: "+1 (555) 010-3050",
    role: "Provider",
  },
  {
    displayName: "Operations Admin",
    email: "admin@klaramd.local",
    isSubscribed: false,
    phone: "+1 (555) 010-4090",
    role: "Admin",
  },
  // Local/mock testing account only; do not use for production authentication.
  {
    displayName: "Admin Tester",
    email: "admin@klaramd.com",
    isSubscribed: false,
    phone: "+10000000000",
    role: "Admin",
  },
];

const MockSessionContext = createContext<MockSessionContextValue | null>(null);
const mockSessionStorageKey = "eyecare-mock-session";
const mockProfilesStorageKey = "eyecare-mock-profiles";

export function MockSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, updateSession] = useState<MockSession>(defaultSession);
  const [profiles, setProfiles] = useState<MockProfile[]>(seededProfiles);

  useEffect(() => {
    window.queueMicrotask(() => {
      setProfiles(mergeProfiles(seededProfiles, readStoredProfiles()));
      updateSession(readStoredSession());
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      signIn: (identifier: string) => {
        const normalizedIdentifier = normalizeIdentifier(identifier);
        const profile = profiles.find(
          (item) => normalizeIdentifier(item.email) === normalizedIdentifier || normalizeIdentifier(item.phone) === normalizedIdentifier,
        );

        if (!profile) {
          return null;
        }

        const nextSession = { ...profile, isAuthenticated: true, isSubscribed: profile.isSubscribed ?? false };

        persistSession(nextSession);
        updateSession(nextSession);

        return nextSession;
      },
      registerProfile: (profile: MockProfile) => {
        const nextSession = { ...profile, isAuthenticated: true, isSubscribed: profile.isSubscribed ?? false };

        setProfiles((current) => {
          const nextProfiles = upsertProfile(current, profile);

          persistProfiles(nextProfiles);

          return nextProfiles;
        });
        persistSession(nextSession);
        updateSession(nextSession);

        return nextSession;
      },
      setSession: (nextSession: Partial<MockSession>) => {
        updateSession((current) => {
          const updatedSession = { ...current, ...nextSession, isAuthenticated: true };

          persistSession(updatedSession);

          return updatedSession;
        });
      },
      signOut: () => {
        clearStoredSession();
        updateSession(defaultSession);
      },
    }),
    [profiles, session],
  );

  return <MockSessionContext.Provider value={value}>{children}</MockSessionContext.Provider>;
}

function normalizeIdentifier(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function readStoredSession() {
  if (typeof window === "undefined") {
    return defaultSession;
  }

  const parsedSession = parseJson(window.localStorage.getItem(mockSessionStorageKey));

  if (!isMockSession(parsedSession) || !parsedSession.isAuthenticated) {
    return defaultSession;
  }

  return {
    ...parsedSession,
    isSubscribed: parsedSession.isSubscribed ?? false,
  };
}

function readStoredProfiles() {
  if (typeof window === "undefined") {
    return [];
  }

  const parsedProfiles = parseJson(window.localStorage.getItem(mockProfilesStorageKey));

  if (!Array.isArray(parsedProfiles)) {
    return [];
  }

  return parsedProfiles.filter(isMockProfile);
}

function persistSession(session: MockSession) {
  window.localStorage.setItem(mockSessionStorageKey, JSON.stringify(session));
}

function persistProfiles(profiles: MockProfile[]) {
  window.localStorage.setItem(mockProfilesStorageKey, JSON.stringify(profiles));
}

function clearStoredSession() {
  window.localStorage.removeItem(mockSessionStorageKey);
}

function parseJson(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function upsertProfile(profiles: MockProfile[], profile: MockProfile) {
  const normalizedEmail = normalizeIdentifier(profile.email);
  const existingIndex = profiles.findIndex((item) => normalizeIdentifier(item.email) === normalizedEmail);

  if (existingIndex === -1) {
    return [...profiles, profile];
  }

  return profiles.map((item, index) => (index === existingIndex ? profile : item));
}

function mergeProfiles(baseProfiles: MockProfile[], storedProfiles: MockProfile[]) {
  return storedProfiles.reduce((current, profile) => upsertProfile(current, profile), baseProfiles);
}

function isMockProfile(value: unknown): value is MockProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Partial<MockProfile>;

  return (
    typeof profile.displayName === "string" &&
    typeof profile.email === "string" &&
    typeof profile.phone === "string" &&
    (typeof profile.isSubscribed === "undefined" || typeof profile.isSubscribed === "boolean") &&
    isUserRole(profile.role)
  );
}

function isMockSession(value: unknown): value is MockSession {
  if (!isMockProfile(value)) {
    return false;
  }

  const session = value as Partial<MockSession>;

  return (
    typeof session.isAuthenticated === "boolean" &&
    (typeof session.isSubscribed === "undefined" || typeof session.isSubscribed === "boolean")
  );
}

export function useMockSession() {
  const context = useContext(MockSessionContext);

  if (!context) {
    throw new Error("useMockSession must be used inside MockSessionProvider");
  }

  return context;
}
