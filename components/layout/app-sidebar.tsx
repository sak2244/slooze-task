"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import { canAccessDashboard, canEditProducts } from "@/lib/auth/rbac";

export function AppSidebar() {
  const pathname = usePathname();
  const { role, clearSession, session } = useAuth();

  const links = [
    canAccessDashboard(role) ? { href: "/dashboard", label: "Dashboard" } : null,
    { href: "/products", label: "Products" },
    canEditProducts(role) ? { href: "/products/new", label: "Add Product" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <aside className="w-full border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 md:w-72 md:border-b-0 md:border-r">
      <div className="mb-4">
        <h1 className="text-lg font-semibold">Commodities</h1>
        <p className="text-xs text-zinc-500">{session?.user.email}</p>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 flex flex-col gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={clearSession}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
