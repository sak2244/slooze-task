import { getNextTheme, sanitizeTheme } from "@/lib/theme/theme-utils";

describe("theme utils", () => {
  it("sanitizes invalid values to light", () => {
    expect(sanitizeTheme(null)).toBe("light");
    expect(sanitizeTheme("bad-value")).toBe("light");
  });

  it("keeps dark value", () => {
    expect(sanitizeTheme("dark")).toBe("dark");
  });

  it("toggles theme", () => {
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("light");
  });
});
