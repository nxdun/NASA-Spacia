import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import ErrorPath from "src/components/common/noPath";

import "@testing-library/jest-dom/vitest";

describe("NoPath", () => {
  it("renders no path component with all expected values", () => {
    render(<ErrorPath />);

    // Check for specific elements using test IDs
    expect(screen.getByTestId("error-paper")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("possible-routes")).toBeInTheDocument();
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
    expect(screen.getByTestId("register-link")).toBeInTheDocument();
  });
});
