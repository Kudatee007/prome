import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

vi.mock("../../assets/footer-logo.png", () => ({ default: "footer-logo.png" }));

describe("Footer", () => {
  it("renders core links and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getAllByText("Customers").length).toBeGreaterThan(0);
    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
    expect(screen.getByText(/Copyright 2022 Prome/i)).toBeInTheDocument();

    const companyLinks = within(screen.getByText("Company").parentElement!);
    expect(companyLinks.getByText("About Us")).toBeInTheDocument();
    expect(companyLinks.getByText("FAQ")).toBeInTheDocument();
    expect(companyLinks.getByText("Privacy & Notice")).toBeInTheDocument();
    expect(companyLinks.getByText("Mobile Apps")).toBeInTheDocument();

    const customerLinks = within(screen.getAllByText("Customers")[0].parentElement!);
    expect(customerLinks.getByText("Service Near Me")).toBeInTheDocument();
    expect(customerLinks.getByText("Cost Estimates")).toBeInTheDocument();

    const professionalLinks = within(screen.getAllByText("Customers")[1].parentElement!);
    expect(professionalLinks.getByText("FAQ")).toBeInTheDocument();
    expect(professionalLinks.getByText("Contracter Leads")).toBeInTheDocument();

    const connectLinks = within(screen.getByText("Connect With Us").parentElement!);
    expect(connectLinks.getByText("Prome Blog")).toBeInTheDocument();
    expect(connectLinks.getByText("Facebook")).toBeInTheDocument();
  });
});
