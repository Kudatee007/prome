import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderNav from "./HeaderNav";
import React from "react";

// ---- Mocks ----
// 1) Auth hooks
vi.mock("@/app/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

// 2) Auth actions
const logoutMock = vi.fn(() => ({ type: "auth/logout" }));
vi.mock("@/features/auth/authSlice", () => ({
  logout: () => logoutMock(),
}));

// 3) Locations query
vi.mock("@/api/prosApi", () => ({
  useGetLocationsQuery: vi.fn(() => ({ data: ["Lagos", "Abuja"] })),
}));

// 4) Router navigate
const navigateSpy = vi.fn();
vi.mock("react-router-dom", (orig) => {
  return {
    ...orig,
    useNavigate: () => navigateSpy,
  };
});

// 5) Static assets to avoid import noise
vi.mock("../../assets/prome-logo.png", () => ({ default: "logo.png" }));
vi.mock("../../assets/briefcase.png", () => ({ default: "briefcase.png" }));
vi.mock("../../assets/hero.png", () => ({ default: "hero.png" }));

const { useAppSelector, useAppDispatch } = await import("@/app/hooks");

describe("HeaderNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as any).mockReturnValue(vi.fn()); // a dispatch fn
  });

  it("shows Sign Up / Log In when not authenticated", () => {
    (useAppSelector as any).mockImplementation((sel: any) =>
      sel({ auth: { isAuthenticated: false, user: null } })
    );

    render(<HeaderNav showHero={false} />);

    expect(screen.getByText("Hire a pro")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("shows user chip & logout when authenticated", () => {
    (useAppSelector as any).mockImplementation((sel: any) =>
      sel({
        auth: {
          isAuthenticated: true,
          user: { username: "timmy", email: "timmy@example.com" },
        },
      })
    );

    render(<HeaderNav showHero={false} />);

    // user chip visible
    expect(screen.getByTestId("user-chip")).toBeInTheDocument();

    // desktop logout exists in DOM (hidden until hover/click), click chip to open
    fireEvent.click(screen.getByTestId("user-chip"));
    expect(screen.getByTestId("logout-desktop")).toBeInTheDocument();

    // click logout
    fireEvent.click(screen.getByTestId("logout-desktop"));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it("populates location dropdown from API", () => {
    (useAppSelector as any).mockImplementation((sel: any) =>
      sel({ auth: { isAuthenticated: false, user: null } })
    );

    render(<HeaderNav showHero={true} />); // hero shows the search UI
    const select = screen.getByDisplayValue("All Locations");
    fireEvent.change(select, { target: { value: "Lagos" } });
    expect((select as HTMLSelectElement).value).toBe("Lagos");
    expect(screen.getByText("Lagos")).toBeInTheDocument();
    expect(screen.getByText("Abuja")).toBeInTheDocument();
  });

  it("builds search query and navigates on button click", () => {
    (useAppSelector as any).mockImplementation((sel: any) =>
      sel({ auth: { isAuthenticated: false, user: null } })
    );

    render(<HeaderNav showHero={true} />);

    const input = screen.getByPlaceholderText("What service do you need?");
    fireEvent.change(input, { target: { value: "cleaning" } });

    const select = screen.getByDisplayValue("All Locations");
    fireEvent.change(select, { target: { value: "Abuja" } });

    fireEvent.click(screen.getByText("Get Started"));

    expect(navigateSpy).toHaveBeenCalledWith(
      "/professionals?search=cleaning&location=Abuja"
    );
  });

  it("navigates when pressing Enter in the search input", () => {
    (useAppSelector as any).mockImplementation((sel: any) =>
      sel({ auth: { isAuthenticated: false, user: null } })
    );

    render(<HeaderNav showHero={true} />);

    const input = screen.getByPlaceholderText("What service do you need?");
    fireEvent.change(input, { target: { value: "plumber" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(navigateSpy).toHaveBeenCalledWith("/professionals?search=plumber");
  });
});