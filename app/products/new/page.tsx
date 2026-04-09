"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ProductForm, ProductFormValues } from "@/components/products/product-form";
import { useAuth } from "@/lib/auth/auth-context";
import { canEditProducts } from "@/lib/auth/rbac";
import { createProductMock } from "@/lib/mock-api";

export default function NewProductPage() {
  const router = useRouter();
  const { role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: ProductFormValues) => {
    if (!canEditProducts(role)) return;
    setLoading(true);
    setError("");
    try {
      await createProductMock(values);
      router.replace("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold">Add Product</h1>
        {!canEditProducts(role) && (
          <p className="mt-2 text-sm text-red-600">You do not have permission to add products.</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-6 max-w-xl">
          <ProductForm
            submitLabel="Create Product"
            isSubmitting={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
