import { getRedirectPath } from "@/lib/auth/route-access";

describe("getRedirectPath", () => {
  it("redirects unauthenticated users to login", () => {
    expect(getRedirectPath("/products", false, null)).toBe("/login");
  });

  it("blocks store keeper from dashboard", () => {
    expect(getRedirectPath("/dashboard", true, "STORE_KEEPER")).toBe("/products");
  });

  it("allows manager on dashboard", () => {
    expect(getRedirectPath("/dashboard", true, "MANAGER")).toBeNull();
  });

  it("allows store keeper on products", () => {
    expect(getRedirectPath("/products", true, "STORE_KEEPER")).toBeNull();
  });
});
