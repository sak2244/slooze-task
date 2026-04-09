import type { UserRole } from "@/types/domain";

export const ROLES = {
  MANAGER: "MANAGER",
  STORE_KEEPER: "STORE_KEEPER",
} as const;

export const canAccessDashboard = (role?: UserRole | null) => role === ROLES.MANAGER;

export const canViewProducts = (role?: UserRole | null) =>
  role === ROLES.MANAGER || role === ROLES.STORE_KEEPER;

export const canEditProducts = (role?: UserRole | null) =>
  role === ROLES.MANAGER || role === ROLES.STORE_KEEPER;
