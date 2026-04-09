"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useAuth } from "@/lib/auth/auth-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const showSidebar = mounted && isAuthenticated && pathname !== "/login";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        {showSidebar ? <AppSidebar /> : null}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
