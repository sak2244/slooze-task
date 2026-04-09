import { canAccessDashboard, canEditProducts, canViewProducts } from "@/lib/auth/rbac";

describe("rbac helpers", () => {
  it("allows only managers on dashboard", () => {
    expect(canAccessDashboard("MANAGER")).toBe(true);
    expect(canAccessDashboard("STORE_KEEPER")).toBe(false);
  });

  it("allows both roles to view products", () => {
    expect(canViewProducts("MANAGER")).toBe(true);
    expect(canViewProducts("STORE_KEEPER")).toBe(true);
  });

  it("allows both roles to edit products", () => {
    expect(canEditProducts("MANAGER")).toBe(true);
    expect(canEditProducts("STORE_KEEPER")).toBe(true);
  });
});
