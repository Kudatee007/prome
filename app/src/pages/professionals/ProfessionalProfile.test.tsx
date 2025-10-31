import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfessionalProfile from "./ProfessionalProfile";
import * as prosApi from "@/api/prosApi";

const mockProfessional = {
  name: "John Doe Cleaning",
  category: "Cleaning Services",
  years_in_business: 10,
  employees: 15,
  address: "123 Main St, New York",
  hires: 50,
  introduction: "We provide top-notch cleaning services for homes and offices.",
  about: "With 10 years of experience, we pride ourselves on reliability.",
  payment_methods: ["Cash", "Credit Card", "PayPal"],
  images: {
    image_url: "/uploads/full.jpg",
    thumbnail_url: "/uploads/thumb.jpg",
  },
};

vi.mock("@/api/prosApi", () => ({
  useGetProfessionalQuery: vi.fn(() => ({
    data: mockProfessional,
    isLoading: false,
    error: null,
  })),
}));

vi.mock("@/utils/strapi", () => ({
  toAbsoluteUrl: (url: string) => `http://localhost:1337${url}`,
}));

const renderProfessionalProfile = () => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/professionals/:id" element={<ProfessionalProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

describe("ProfessionalProfile Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, "", "/professionals/pro-1");
  });

  it("renders professional name and category", () => {
    renderProfessionalProfile();
    expect(screen.getByText("John Doe Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Cleaning Services")).toBeInTheDocument();
  });

  it("renders back button", () => {
    renderProfessionalProfile();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders About section", () => {
    renderProfessionalProfile();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("displays introduction", () => {
    renderProfessionalProfile();
    expect(
      screen.getByText(/top-notch cleaning services/i)
    ).toBeInTheDocument();
  });

  it("displays about text", () => {
    renderProfessionalProfile();
    expect(
      screen.getByText(/10 years of experience/i)
    ).toBeInTheDocument();
  });

  it("displays overview section", () => {
    renderProfessionalProfile();
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("displays hires count", () => {
    renderProfessionalProfile();
    // Component renders "<strong>50 hires</strong> on ProLinker"
    expect(screen.getByText(/50 hires/i)).toBeInTheDocument();
  });

  it("displays address", () => {
    renderProfessionalProfile();
    expect(screen.getByText(/123 Main St, New York/i)).toBeInTheDocument();
  });

  it("displays years in business", () => {
    renderProfessionalProfile();
    expect(screen.getByText(10)).toBeInTheDocument();
  });

  it("displays number of employees", () => {
    renderProfessionalProfile();
    expect(screen.getByText(/15/)).toBeInTheDocument();
  });

  it("displays payment methods section", () => {
    renderProfessionalProfile();
    expect(screen.getByText("Payment Methods:")).toBeInTheDocument();
  });

  it("renders all payment methods", () => {
    renderProfessionalProfile();
    expect(screen.getByText("Cash")).toBeInTheDocument();
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
    expect(screen.getByText("PayPal")).toBeInTheDocument();
  });

  it("displays professional image", () => {
    renderProfessionalProfile();
    const image = screen.getByAltText("John Doe Cleaning");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "http://localhost:1337/uploads/thumb.jpg"
    );
  });

  it("displays not found state when no data", () => {
    vi.mocked(prosApi.useGetProfessionalQuery).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    } as any);

    renderProfessionalProfile();
    expect(screen.getByText("Professional not found")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    vi.mocked(prosApi.useGetProfessionalQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderProfessionalProfile();
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("displays error state", () => {
    vi.mocked(prosApi.useGetProfessionalQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Failed to fetch" },
    } as any);

    renderProfessionalProfile();
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });
});
