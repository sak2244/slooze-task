"use client";

import type { DashboardStats, Product, SessionData, UserRole } from "@/types/domain";
import type { ProductFormValues } from "@/components/products/product-form";

interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

const PRODUCTS_KEY = "commodities_products";
const DEFAULT_DELAY_MS = 350;

const users: MockUser[] = [
  {
    id: "u-manager-1",
    email: "manager@slooze.com",
    password: "manager123",
    role: "MANAGER",
    name: "Manager Demo",
  },
  {
    id: "u-store-1",
    email: "storekeeper@slooze.com",
    password: "store123",
    role: "STORE_KEEPER",
    name: "Store Keeper Demo",
  },
];

const defaultProducts: Product[] = [
  {
    id: "p-1",
    name: "Wheat",
    category: "Grains",
    unit: "kg",
    price: 2.2,
    quantity: 260,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p-2",
    name: "Sunflower Oil",
    category: "Oils",
    unit: "litre",
    price: 4.8,
    quantity: 55,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p-3",
    name: "Coffee Beans",
    category: "Beverage",
    unit: "kg",
    price: 11.5,
    quantity: 14,
    updatedAt: new Date().toISOString(),
  },
];

function wait(ms = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getProductsState() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return [...defaultProducts];
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    return parsed;
  } catch {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return [...defaultProducts];
  }
}

function setProductsState(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export async function loginWithMockApi(email: string, password: string): Promise<SessionData> {
  await wait();
  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    throw new Error("Invalid credentials. Try demo users from README.");
  }

  return {
    accessToken: `mock-token-${user.id}`,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  };
}

export async function getDashboardStatsMock(): Promise<DashboardStats> {
  await wait();
  const products = getProductsState();
  return {
    totalProducts: products.length,
    lowStockCount: products.filter((item) => item.quantity < 25).length,
    totalInventoryValue: products.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

export async function getProductsMock(): Promise<Product[]> {
  await wait();
  return getProductsState();
}

export async function getProductByIdMock(id: string): Promise<Product> {
  await wait();
  const products = getProductsState();
  const product = products.find((item) => item.id === id);
  if (!product) {
    throw new Error("Product not found.");
  }
  return product;
}

export async function createProductMock(input: ProductFormValues): Promise<Product> {
  await wait();
  const products = getProductsState();
  const created: Product = {
    id: `p-${crypto.randomUUID()}`,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  const next = [created, ...products];
  setProductsState(next);
  return created;
}

export async function updateProductMock(
  id: string,
  input: ProductFormValues,
): Promise<Product> {
  await wait();
  const products = getProductsState();
  const idx = products.findIndex((item) => item.id === id);
  if (idx < 0) {
    throw new Error("Product not found.");
  }
  const updated: Product = {
    ...products[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  products[idx] = updated;
  setProductsState(products);
  return updated;
}
