import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageLists from "src/components/userSpace/subcomps/imageList"; // Assuming the correct path
import "@testing-library/jest-dom/vitest";

describe("imagelist component", () => {


  it("renders imagelist with visible state", () => {
    render(<ImageLists />);

    const appBar = screen.getByTestId("imagelist");

    expect(appBar).toBeInTheDocument();
    expect(appBar).toBeVisible();
  });
});
