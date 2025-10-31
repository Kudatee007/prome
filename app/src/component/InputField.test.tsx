import "@testing-library/jest-dom";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./InputField";

describe("InputField Component", () => {
  it("renders correctly with label and input", () => {
    render(<InputField label="Email" name="email" placeholder="Enter email" />);

    const label = screen.getByText("Email");
    const input = screen.getByPlaceholderText("Enter email");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "email");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
  });

  it("renders correctly without label", () => {
    render(<InputField name="testInput" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(
      <InputField
        name="username"
        label="Username"
        className="custom-class"
      />
    );
    const input = screen.getByLabelText("Username");
    expect(input).toHaveClass("custom-class");
    expect(input).toHaveClass("w-full");
  });

  it("forwards refs to the native input", async () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputField label="Password" name="password" ref={ref} />);

    // After render, ref.current should be the input element
    expect(ref.current).toBeInstanceOf(HTMLInputElement);

    // Focus using the ref to confirm it’s real
    ref.current?.focus();
    expect(ref.current).toHaveFocus();
  });

  it("accepts user input", async () => {
    render(<InputField label="Username" name="username" />);
    const input = screen.getByLabelText("Username");

    await userEvent.type(input, "testuser");
    expect(input).toHaveValue("testuser");
  });
});
