import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "src/components/userSpace/subcomps/footer"; // Assuming the correct path
import "@testing-library/jest-dom/vitest";

describe("AppBar component", () => {
  let isAppBarVisible;

  beforeEach(() => {
      render(<Footer isAppBarVisible={isAppBarVisible} />);
    isAppBarVisible = true; // Set initial value for isAppBarVisible
  });

  it("renders AppBar with visible state", () => {

    const appBar = screen.getByTestId("app-bar");

    expect(appBar).toBeInTheDocument();
    expect(appBar).toBeVisible();
  });
});
