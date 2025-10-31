import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Register from "./Register";
import authReducer from "./authSlice";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

let mockRegisterMutation: unknown;
let mockError: unknown = null;
let mockIsLoading = false;

vi.mock("@/api/authApi", () => ({
  useRegisterMutation: () => {
    return [
      mockRegisterMutation,
      { error: mockError, isLoading: mockIsLoading },
    ];
  },
}));

const renderRegister = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockError = null;
    mockIsLoading = false;

    mockRegisterMutation = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({
        jwt: "test-jwt-token",
        user: {
          id: 1,
          username: "John Doe",
          email: "john@example.com",
          confirmed: false,
          blocked: false,
        },
      }),
    });
  });

  it("renders registration form with all fields", () => {
    renderRegister();

    expect(screen.getByTestId("register-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("register-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("register-email")).toBeInTheDocument();
    expect(screen.getByTestId("register-password")).toBeInTheDocument();
    expect(screen.getByTestId("register-confirmPassword")).toBeInTheDocument();
    expect(screen.getByTestId("register-submit")).toBeInTheDocument();
  });

  it("displays validation errors when submitting empty form", async () => {
    renderRegister();

    const submitButton = screen.getByTestId("register-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("register-firstName-error")).toHaveTextContent(
        "First name is required"
      );
      expect(screen.getByTestId("register-lastName-error")).toHaveTextContent(
        "Last name is required"
      );
    });
  });


  it("validates password confirmation match", async () => {
    renderRegister();

    const passwordInput = screen.getByTestId("register-password");
    const confirmPasswordInput = screen.getByTestId("register-confirmPassword");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentpassword" },
    });

    const submitButton = screen.getByTestId("register-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId("register-confirmPassword-error")
      ).toHaveTextContent("Passwords do not match");
    });
  });

  it("calls register mutation with correct data on valid submit", async () => {
    renderRegister();

    fireEvent.change(screen.getByTestId("register-firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("register-lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("register-email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("register-password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("register-confirmPassword"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByTestId("register-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegisterMutation).toHaveBeenCalledWith({
        username: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });
  });

  it("navigates to home page on successful registration", async () => {
    renderRegister();

    fireEvent.change(screen.getByTestId("register-firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("register-lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("register-email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("register-password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("register-confirmPassword"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("register-submit"));

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
      },
      { timeout: 2000 }
    );
  });
});
