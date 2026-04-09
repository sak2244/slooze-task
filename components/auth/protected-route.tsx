"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { getRedirectPath } from "@/lib/auth/route-access";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requiresAuth = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isReady, role } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    if (!requiresAuth) return;
    const redirect = getRedirectPath(pathname, isAuthenticated, role);
    if (redirect) {
      router.replace(redirect);
    }
  }, [isAuthenticated, isReady, pathname, requiresAuth, role, router]);

  if (!isReady) {
    return <p className="p-6 text-sm text-zinc-500">Checking session...</p>;
  }

  if (requiresAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
