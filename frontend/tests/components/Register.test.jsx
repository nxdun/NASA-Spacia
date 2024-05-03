import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Register from "src/components/auth/register";

import "@testing-library/jest-dom/vitest";

describe("Register", () => {
  it("renders register component with all expected values", () => {
    render(<Register />);
    
    // Check for specific elements using test IDs
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
  });
});