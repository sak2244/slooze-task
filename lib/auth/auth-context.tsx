"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { SessionData, UserRole } from "@/types/domain";

const STORAGE_KEY = "commodities_session";

interface AuthContextValue {
  session: SessionData | null;
  isAuthenticated: boolean;
  isReady: boolean;
  role: UserRole | null;
  setSession: (session: SessionData) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<SessionData | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SessionData;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const setSession = (nextSession: SessionData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSessionState(nextSession);
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSessionState(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      isReady: true,
      role: session?.user.role ?? null,
      setSession,
      clearSession,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
