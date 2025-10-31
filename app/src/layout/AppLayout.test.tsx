import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLayout from "./AppLayout";

// Mock the exact relative paths used inside AppLayout.tsx
vi.mock("./HeaderNav", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="header-nav-mock">{JSON.stringify(props)}</div>,
}));

vi.mock("./Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-mock">FooterMock</div>,
}));

// Mock Outlet so we don't need a router tree
vi.mock("react-router-dom", async (orig) => {
  const actual = await orig();
  return { ...(actual as object), Outlet: () => <div data-testid="outlet">OutletContent</div> };
});

describe("AppLayout", () => {
  it("renders HeaderNav (no hero), Outlet, and Footer", () => {
    render(<AppLayout />);

    // Header is mocked; its rendered and showHero={false} was passed
    const header = screen.getByTestId("header-nav-mock");
    expect(header).toBeInTheDocument();
    expect(header.textContent).toMatch(/"showHero":false/);

    // Outlet placeholder rendered
    expect(screen.getByTestId("outlet")).toHaveTextContent("OutletContent");

    // Footer placeholder rendered
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
  });
});
