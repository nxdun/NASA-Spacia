import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "src/components/userSpace/subcomps/Header"; // Assuming the correct path
import "@testing-library/jest-dom/vitest";

describe("header component", () => {


  it("renders keader with visible state", () => {
    render(<Header />);

    const appBar = screen.getByTestId("header");

    expect(appBar).toBeVisible();
  });
});
