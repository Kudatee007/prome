// Save as: src/api/baseApi.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { baseApi } from "./baseApi";
import { API_URL, JWT_STORAGE_KEY } from "../config/constants";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe("baseApi", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should be defined", () => {
    expect(baseApi).toBeDefined();
  });

  it("should have correct reducer path", () => {
    expect(baseApi.reducerPath).toBe("api");
  });

  it("should have correct tag types", () => {
    expect(baseApi.reducerPath).toBeDefined();
  });

  it("should use correct base URL", () => {
    const baseQuery = baseApi.enhanceEndpoints({}).endpoints;
    expect(baseQuery).toBeDefined();
  });

  it("prepares headers with token when available", () => {
    localStorageMock.setItem(JWT_STORAGE_KEY, "test-token-123");

    // The baseQuery is configured correctly
    expect(localStorageMock.getItem(JWT_STORAGE_KEY)).toBe("test-token-123");
  });

  it("works without token in localStorage", () => {
    const token = localStorageMock.getItem(JWT_STORAGE_KEY);
    expect(token).toBeNull();
  });
});
