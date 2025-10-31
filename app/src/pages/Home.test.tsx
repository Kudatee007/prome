// Home.test.tsx - FIXED VERSION
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

// Mock the API hook
const mockCategories = [
  "EventService",
  "Home Improvement",
  "WebService",
  "PopularService",
  "Design",
];

vi.mock("../api/servicesApi", () => ({
  useGetAllCategoriesQuery: () => ({
    data: mockCategories,
    isLoading: false,
    error: null,
  }),
}));

// Mock ServiceCarousel component
vi.mock("../component/ServiceCarousel", () => ({
  default: ({ category, title }: { category: string; title: string }) => (
    <div data-testid={`carousel-${category}`}>
      <h2>{title}</h2>
    </div>
  ),
}));

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all service carousels", () => {
    renderHome();

    expect(screen.getByTestId("carousel-PopularService")).toBeInTheDocument();
    expect(screen.getByText("Popular Services")).toBeInTheDocument();

    expect(screen.getByTestId("carousel-Home Improvement")).toBeInTheDocument();
    expect(screen.getByText("Home Improvement Services")).toBeInTheDocument();

    expect(screen.getByTestId("carousel-EventService")).toBeInTheDocument();
    expect(screen.getByText("Event Services")).toBeInTheDocument();

    expect(screen.getByTestId("carousel-WebService")).toBeInTheDocument();
    expect(screen.getByText("Design & Web Services")).toBeInTheDocument();
  });

  it("renders browse all services section", () => {
    renderHome();

    expect(screen.getByText("Browse all services")).toBeInTheDocument();
  });

  it("renders all categories from API", () => {
    renderHome();

    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("renders category links with correct href", () => {
    renderHome();

    mockCategories.forEach((category) => {
      const link = screen.getByText(category).closest("a");
      expect(link).toHaveAttribute(
        "href",
        `/professionals?category=${category}`
      );
    });
  });

  it("renders category images", () => {
    renderHome();

    // Check that images are rendered with alt text matching categories
    mockCategories.forEach((category) => {
      const image = screen.getByAltText(category);
      expect(image).toBeInTheDocument();
    });
  });
});