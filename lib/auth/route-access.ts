import { canAccessDashboard, canViewProducts } from "@/lib/auth/rbac";
import type { UserRole } from "@/types/domain";

export function getRedirectPath(
  pathname: string,
  isAuthenticated: boolean,
  role?: UserRole | null,
) {
  if (!isAuthenticated) {
    return "/login";
  }

  if (pathname.startsWith("/dashboard") && !canAccessDashboard(role)) {
    return "/products";
  }

  if (pathname.startsWith("/products") && !canViewProducts(role)) {
    return "/login";
  }

  return null;
}
