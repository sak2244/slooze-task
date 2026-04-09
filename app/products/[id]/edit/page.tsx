"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ProductForm, ProductFormValues } from "@/components/products/product-form";
import { useAuth } from "@/lib/auth/auth-context";
import { canEditProducts } from "@/lib/auth/rbac";
import type { Product } from "@/types/domain";
import { getProductByIdMock, updateProductMock } from "@/lib/mock-api";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { role } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoadingProduct(true);
    getProductByIdMock(id)
      .then((item) => {
        if (mounted) setProduct(item);
      })
      .catch((err) => {
        if (mounted) {
          setProductError(err instanceof Error ? err.message : "Failed to fetch product.");
        }
      })
      .finally(() => {
        if (mounted) setLoadingProduct(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (values: ProductFormValues) => {
    if (!canEditProducts(role) || !id) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await updateProductMock(id, values);
      router.replace("/products");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not update product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        {!canEditProducts(role) && (
          <p className="mt-2 text-sm text-red-600">You do not have permission to edit products.</p>
        )}
        {loadingProduct && <p className="mt-2 text-sm text-zinc-500">Loading product details...</p>}
        {productError && <p className="mt-2 text-sm text-red-600">{productError}</p>}
        {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
        {!loadingProduct && product ? (
          <div className="mt-6 max-w-xl">
            <ProductForm
              key={product.id}
              initialProduct={product}
              submitLabel="Update Product"
              isSubmitting={submitting}
              onSubmit={handleSubmit}
            />
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}
