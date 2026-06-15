import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const AUTH_STORAGE_KEY = "ha-admin-session";

export type AdminSession = {
  email: string;
  name: string;
  loginAt: string;
};

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;

  try {
    const session = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return session ? (JSON.parse(session) as AdminSession) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAdminSession());
}

export function loginAdmin(session: AdminSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/dashboard/login" replace />;
}
