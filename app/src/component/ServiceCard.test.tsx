import ServiceCard from "./ServiceCard";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockServiceWithImage = {
  id: 2,
  documentId: "csicavx2nh3ozm42eaqnrutq",
  name: "Grace Eze Solutions",
  category: "Home Improvement",
  about:
    "We invest in continuous learning, modern tooling, and rigorous QA to ensure every project meets a high standard of excellence.",
  address: "52 Sapele Rd, GRA, Kano, Nigeria",
  "phone": "+2348030001001",
  "email": "info@kelechiokafor.com",
  employees: 2,
  hires: 582,
  introduction:
    "We combine craftsmanship with modern tools to get the job done right.",
  location: "Kano",
  payment_methods: ["Bank Transfer"],
  years_in_business: 20,
  // Dates as ISO strings (match the real API shape)
  createdAt: "2025-10-24T04:02:35.702Z",
  publishedAt: "2025-10-24T04:15:50.395Z",
  updatedAt: "2025-10-24T04:15:50.408Z",
  // images can be null or an object — reflect shape from console:
  images: {
    id: 2,
    image_url: "https://picsum.photos/seed/grace-eze-solutions-1001/1200/800",
    thumbnail_url:
      "https://picsum.photos/seed/grace-eze-solutions-1001/480/320",
  }, // tighten the typing if you have an Image type
};

const mockServiceWithoutImage = {
  id: 2,
  documentId: "csicavx2nh3ozm42eaqnrutq",
  name: "Grace Eze Solutions 2",
  category: "Home Improvement",
  about:
    "We invest in continuous learning, modern tooling, and rigorous QA to ensure every project meets a high standard of excellence.",
  address: "52 Sapele Rd, GRA, Kano, Nigeria",
  employees: 2,
  hires: 582,
  introduction:
    "We combine craftsmanship with modern tools to get the job done right.",
  location: "Kano",
  payment_methods: ["Bank Transfer"],
  years_in_business: 20,
  // Dates as ISO strings (match the real API shape)
  createdAt: "2025-10-24T04:02:35.702Z",
  publishedAt: "2025-10-24T04:15:50.395Z",
  updatedAt: "2025-10-24T04:15:50.408Z",
  // images can be null or an object — reflect shape from console:
  images: null,
};

describe("ServiceCard Component", () => {
  it("renders name and image correctly when service has an image", () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockServiceWithImage} />
      </BrowserRouter>
    );

    const serviceName = screen.getByText("Grace Eze Solutions");
    const image = screen.getByAltText(
      "Grace Eze Solutions"
    ) as HTMLImageElement;

    expect(serviceName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("picsum.photos/seed/grace-eze-solutions-1001");
  });

  it("renders name and fallback image when service has no image", () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockServiceWithoutImage} />
      </BrowserRouter>
    );

    const serviceName = screen.getByText("Grace Eze Solutions 2");
    const image = screen.getByAltText(
         "Grace Eze Solutions 2"
    ) as HTMLImageElement;

    expect(serviceName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("cardImg.png"); // Default image
  });

  it("links to the correct service page", () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockServiceWithImage} />
      </BrowserRouter>
    );
  
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `/professionals/${mockServiceWithImage.documentId}`
    );
  });
});
