import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Login from "src/components/auth/login";

import "@testing-library/jest-dom/vitest";

describe("Login", () => {
  it("renders login component with all expected values", () => {
    render(<Login />);
    
    // Check for specific elements using test IDs
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("remember-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
    expect(screen.getByTestId("signin-button")).toBeInTheDocument();
    expect(screen.getByTestId("forgot-password")).toBeInTheDocument();
    expect(screen.getByTestId("signup-link")).toBeInTheDocument();
  });
});