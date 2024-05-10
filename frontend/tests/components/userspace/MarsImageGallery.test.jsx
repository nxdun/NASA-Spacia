import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import BodyImageView from "src/components/userSpace/subcomps/BodyImageView";


describe("Mars Image Gallery component", () => {
  render(<BodyImageView />);
  it("should render the Image gallery component", () => {
    expect(screen.getByTestId("Loading")).toBeTruthy();
  });


});
