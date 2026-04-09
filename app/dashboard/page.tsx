"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import type { DashboardStats } from "@/types/domain";
import { getDashboardStatsMock } from "@/lib/mock-api";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getDashboardStatsMock()
      .then((stats) => {
        if (mounted) setData(stats);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch stats.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Overview of commodities inventory.</p>
        {loading && <p className="mt-6 text-sm text-zinc-500">Loading dashboard metrics...</p>}
        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
        {data && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatCard label="Total products" value={data.totalProducts} />
            <StatCard label="Low stock items" value={data.lowStockCount} />
            <StatCard label="Inventory value" value={`$${data.totalInventoryValue.toFixed(2)}`} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}
