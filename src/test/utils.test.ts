import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });
});

describe("formatCurrency", () => {
  it("formats JPY", () => {
    const result = formatCurrency(15000);
    expect(result).toContain("15,000");
  });
});

describe("formatDate", () => {
  it("formats date string", () => {
    const result = formatDate("2025-04-01");
    expect(result).toContain("2025");
  });
});
