import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Particle from "src/components/common/particles";

import "@testing-library/jest-dom/vitest";

describe("Checking third party particle is intergrated as expected", () => {
    it("renders particles component", () => {
      render(<Particle />);
      expect(screen.getByTestId("particles-component")).toBeInTheDocument();
    });
  });
  