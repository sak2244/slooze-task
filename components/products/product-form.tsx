"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Product } from "@/types/domain";

export interface ProductFormValues {
  name: string;
  category: string;
  unit: string;
  price: number;
  quantity: number;
}

interface ProductFormProps {
  initialProduct?: Product | null;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

export function ProductForm({
  initialProduct,
  submitLabel,
  isSubmitting,
  onSubmit,
}: ProductFormProps) {
  const initialValues = useMemo<ProductFormValues>(
    () => ({
      name: initialProduct?.name ?? "",
      category: initialProduct?.category ?? "",
      unit: initialProduct?.unit ?? "",
      price: initialProduct?.price ?? 0,
      quantity: initialProduct?.quantity ?? 0,
    }),
    [initialProduct],
  );

  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!values.name || !values.category || !values.unit) {
      setError("Name, category, and unit are required.");
      return;
    }
    if (values.price < 0 || values.quantity < 0) {
      setError("Price and quantity must be positive.");
      return;
    }
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <label className="block text-sm">
        Name
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
      </label>
      <label className="block text-sm">
        Category
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          value={values.category}
          onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value }))}
        />
      </label>
      <label className="block text-sm">
        Unit
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          value={values.unit}
          onChange={(e) => setValues((prev) => ({ ...prev, unit: e.target.value }))}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Price
          <input
            type="number"
            min="0"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
          />
        </label>
        <label className="block text-sm">
          Quantity
          <input
            type="number"
            min="0"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={values.quantity}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, quantity: Number(e.target.value) }))
            }
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
