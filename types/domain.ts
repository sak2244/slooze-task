export type UserRole = "MANAGER" | "STORE_KEEPER";

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string | null;
}

export interface SessionData {
  accessToken: string;
  user: SessionUser;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  quantity: number;
  updatedAt?: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  totalInventoryValue: number;
}
