"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { canAccessDashboard } from "@/lib/auth/rbac";

export default function HomePage() {
  const router = useRouter();
  const { isReady, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    router.replace(canAccessDashboard(role) ? "/dashboard" : "/products");
  }, [isAuthenticated, isReady, role, router]);

  return <p className="text-sm text-zinc-500">Loading...</p>;
}
