// Save as: src/component/ServiceCarousel.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ServiceCarousel from "./ServiceCarousel";

const mockServices = [
  {
    id: 1,
    documentId: "service-1",
    name: "House Cleaning",
    category: "Cleaning",
    images: {
      image_url: "/uploads/cleaning.jpg",
    },
  },
  {
    id: 2,
    documentId: "service-2",
    name: "Deep Cleaning",
    category: "Cleaning",
    images: {
      image_url: "/uploads/deep-cleaning.jpg",
    },
  },
  {
    id: 3,
    documentId: "service-3",
    name: "Office Cleaning",
    category: "Cleaning",
    images: null,
  },
];

vi.mock("@/api/servicesApi", () => ({
  useGetServicesByCategoryQuery: vi.fn(() => ({
    data: mockServices,
    isLoading: false,
    error: null,
  })),
}));

// Mock embla-carousel-react
vi.mock("embla-carousel-react", () => ({
  default: () => [
    vi.fn(), // emblaRef
    {
      // emblaApi
      selectedScrollSnap: () => 0,
      scrollSnapList: () => [0, 1, 2],
      scrollTo: vi.fn(),
      on: vi.fn(),
    },
  ],
}));

vi.mock("./ServiceCard", () => ({
  default: ({ service }: any) => (
    <div data-testid={`service-card-${service.documentId}`}>{service.name}</div>
  ),
}));

const renderServiceCarousel = (
  category = "Cleaning",
  title = "Cleaning Services"
) => {
  return render(
    <BrowserRouter>
      <ServiceCarousel category={category} title={title} />
    </BrowserRouter>
  );
};

describe("ServiceCarousel Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders carousel title", () => {
    renderServiceCarousel("Cleaning", "Cleaning Services");
    expect(screen.getByText("Cleaning Services")).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    renderServiceCarousel();

    expect(screen.getByTestId("service-card-service-1")).toBeInTheDocument();
    expect(screen.getByTestId("service-card-service-2")).toBeInTheDocument();
    expect(screen.getByTestId("service-card-service-3")).toBeInTheDocument();
  });

  it("displays service names", () => {
    renderServiceCarousel();

    expect(screen.getByText("House Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Deep Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Office Cleaning")).toBeInTheDocument();
  });

  it("renders pagination dots", () => {
    renderServiceCarousel();

    const dots = screen.getAllByRole("button");
    expect(dots).toHaveLength(3); // 3 scroll snaps
  });

  it("displays loading state", () => {
    vi.mocked(require("../api/servicesApi")).useGetServicesByCategoryQuery =
      vi.fn(() => ({
        data: undefined,
        isLoading: true,
        error: null,
      }));

    renderServiceCarousel("Cleaning", "Cleaning Services");
    expect(
      screen.getByText("Loading Cleaning Services...")
    ).toBeInTheDocument();
  });

  it("renders nothing when no services are available", () => {
    vi.mocked(require("@/api/servicesApi")).useGetServicesByCategoryQuery =
      vi.fn(() => ({
        data: [],
        isLoading: false,
        error: null,
      }));
    const { container } = renderServiceCarousel();
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when services is null", () => {
    vi.mocked(require("@/api/servicesApi")).useGetServicesByCategoryQuery =
      vi.fn(() => ({
        data: null,
        isLoading: false,
        error: null,
      }));

    const { container } = renderServiceCarousel();
    expect(container.firstChild).toBeNull();
  });
});
