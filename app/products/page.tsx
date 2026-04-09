"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth/auth-context";
import { canEditProducts } from "@/lib/auth/rbac";
import type { Product } from "@/types/domain";
import { getProductsMock } from "@/lib/mock-api";

export default function ProductsPage() {
  const { role } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isEditor = canEditProducts(role);

  useEffect(() => {
    let mounted = true;
    getProductsMock()
      .then((items) => {
        if (mounted) setProducts(items);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch products.");
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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="mt-1 text-sm text-zinc-500">Available to Manager and Store Keeper.</p>
          </div>
          <Link
            href="/products/new"
            className={`rounded-md px-3 py-2 text-sm ${
              isEditor
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "cursor-not-allowed bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
            }`}
            aria-disabled={!isEditor}
            tabIndex={isEditor ? 0 : -1}
            onClick={(e) => {
              if (!isEditor) e.preventDefault();
            }}
          >
            Add Product
          </Link>
        </div>
        {loading && <p className="mt-6 text-sm text-zinc-500">Loading products...</p>}
        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="mt-6 text-sm text-zinc-500">No products found.</p>
        )}
        {products.length ? (
          <div className="mt-6 overflow-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Unit</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Quantity</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="px-3 py-2">{product.name}</td>
                    <td className="px-3 py-2">{product.category}</td>
                    <td className="px-3 py-2">{product.unit}</td>
                    <td className="px-3 py-2">${product.price.toFixed(2)}</td>
                    <td className="px-3 py-2">{product.quantity}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/products/${product.id}/edit`}
                        className={`rounded px-2 py-1 ${
                          isEditor
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                            : "cursor-not-allowed bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                        }`}
                        aria-disabled={!isEditor}
                        tabIndex={isEditor ? 0 : -1}
                        onClick={(e) => {
                          if (!isEditor) e.preventDefault();
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}
