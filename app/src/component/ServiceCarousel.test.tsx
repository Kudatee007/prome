import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ServiceCarousel from "./ServiceCarousel";

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

vi.mock("embla-carousel-react", () => ({
  default: () => [
    () => {},
    {
      selectedScrollSnap: () => 0,
      scrollSnapList: () => [0],
      scrollTo: () => {},
      on: () => {},
      off: () => {},
    },
  ],
}));

vi.mock("./ServiceCard", () => ({
  default: ({ service }: any) => <div>{service.name}</div>,
}));


describe("ServiceCarousel Component", () => {
  it("renders carousel title", () => {
    render(
      <BrowserRouter>
        <ServiceCarousel category="Cleaning" title="Cleaning Services" />
      </BrowserRouter>
    );
    
    expect(screen.getByText("Cleaning Services")).toBeInTheDocument();
  });

  it("renders service cards", () => {
    render(
      <BrowserRouter>
        <ServiceCarousel category="Cleaning" title="Cleaning Services" />
      </BrowserRouter>
    );
    
    expect(screen.getByText("House Cleaning")).toBeInTheDocument();
  });
});