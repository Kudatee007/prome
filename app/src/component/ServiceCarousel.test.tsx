import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ServiceCarousel from "./ServiceCarousel";

// Stable fixture — matches what your component consumes
const mockServices = [
  {
    id: 1,
    documentId: "service-1",
    name: "House Cleaning",
    category: "Cleaning",
    images: { image_url: "/uploads/cleaning.jpg" },
  },
];

vi.mock("@/api/servicesApi", () => ({
  useGetServicesByCategoryQuery: vi.fn(() => ({
    data: mockServices,
    isLoading: false,
    error: undefined,
  })),
}));

// ⚠️ Important: proper ESM default + full API surface
vi.mock("embla-carousel-react", () => {
  const api = {
    selectedScrollSnap: vi.fn(() => 0),
    scrollSnapList: vi.fn(() => [0]),
    scrollTo: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };
  const ref = vi.fn(); // callback ref
  return {
    __esModule: true,
    default: vi.fn(() => [ref, api] as any),
  };
});

// Keep ServiceCard dead-simple so we test the carousel, not the card
vi.mock("./ServiceCard", () => ({
  __esModule: true,
  default: ({ service }: any) => <div>{service.name}</div>,
}));

describe("ServiceCarousel Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders carousel title", async () => {
    render(
      <BrowserRouter>
        <ServiceCarousel category="Cleaning" title="Cleaning Services" />
      </BrowserRouter>
    );

    // findByText waits for the DOM to settle
    expect(await screen.findByText("Cleaning Services")).toBeInTheDocument();
  });

  it("renders service cards", async () => {
    render(
      <BrowserRouter>
        <ServiceCarousel category="Cleaning" title="Cleaning Services" />
      </BrowserRouter>
    );

    expect(await screen.findByText("House Cleaning")).toBeInTheDocument();
  });
});
