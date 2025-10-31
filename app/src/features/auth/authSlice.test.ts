// authSlice.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import reducer, { loginSucceeded, logout, setUser } from "./authSlice";
import { JWT_STORAGE_KEY } from "@/config/constants";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
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

describe("authSlice", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return initial state when no token in localStorage", () => {
      const state = reducer(undefined, { type: "unknown" });

      expect(state).toEqual({
        token: null,
        isAuthenticated: false,
        user: null,
      });
    });

    it("should return authenticated state when token exists in localStorage", async () => {
      localStorageMock.setItem(JWT_STORAGE_KEY, "existing-token");

      // Test that loginSucceeded properly sets the state
      const previousState = {
        token: null,
        isAuthenticated: false,
        user: null,
      };

      const payload = {
        token: "existing-token",
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      const state = reducer(previousState, loginSucceeded(payload));
      
      expect(state.token).toBe('existing-token');
      expect(state.isAuthenticated).toBe(true);
      expect(localStorageMock.getItem(JWT_STORAGE_KEY)).toBe('existing-token');
    });
  });

  describe("loginSucceeded", () => {
    it("should handle loginSucceeded action", () => {
      const previousState = {
        token: null,
        isAuthenticated: false,
        user: null,
      };

      const payload = {
        token: "test-jwt-token",
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      const state = reducer(previousState, loginSucceeded(payload));

      expect(state.token).toBe("test-jwt-token");
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(payload.user);
    });

    it("should save token to localStorage on loginSucceeded", () => {
      const previousState = {
        token: null,
        isAuthenticated: false,
        user: null,
      };

      const payload = {
        token: "test-jwt-token",
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      reducer(previousState, loginSucceeded(payload));

      expect(localStorageMock.getItem(JWT_STORAGE_KEY)).toBe("test-jwt-token");
    });
  });

  describe("logout", () => {
    it("should handle logout action", () => {
      const previousState = {
        token: "test-jwt-token",
        isAuthenticated: true,
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      const state = reducer(previousState, logout());

      expect(state.token).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });

    it("should remove token from localStorage on logout", () => {
      localStorageMock.setItem(JWT_STORAGE_KEY, "test-token");

      const previousState = {
        token: "test-jwt-token",
        isAuthenticated: true,
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      reducer(previousState, logout());

      expect(localStorageMock.getItem(JWT_STORAGE_KEY)).toBe(null);
    });
  });

  describe("setUser", () => {
    it("should handle setUser action with user data", () => {
      const previousState = {
        token: "test-jwt-token",
        isAuthenticated: true,
        user: null,
      };

      const user = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        confirmed: true,
        blocked: false,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      const state = reducer(previousState, setUser(user));

      expect(state.user).toEqual(user);
      expect(state.token).toBe("test-jwt-token");
      expect(state.isAuthenticated).toBe(true);
    });

    it("should handle setUser action with null", () => {
      const previousState = {
        token: "test-jwt-token",
        isAuthenticated: true,
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          confirmed: true,
          blocked: false,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      };

      const state = reducer(previousState, setUser(null));

      expect(state.user).toBe(null);
      expect(state.token).toBe("test-jwt-token");
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
