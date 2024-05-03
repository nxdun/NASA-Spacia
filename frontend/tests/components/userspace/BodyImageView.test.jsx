import { it, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BodyImageView from "src/components/userSpace/subcomps/BodyImageView";
import { useFetchFromNasaApi, sendImageToServer } from "src/services/fetchFromServers";


describe("BodyImageView component", () => {
  render(<BodyImageView />);
  it("should render the loading text", () => {
    expect(screen.getByTestId("Loading")).toBeTruthy();
  });


});
