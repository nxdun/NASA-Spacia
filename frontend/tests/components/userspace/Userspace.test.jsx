import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Userspace from "src/components/userSpace/userspace";

import "@testing-library/jest-dom/vitest";

describe("Userspace", () => {
    it("renders main container", () => {
      render(<Userspace />);
      expect(screen.getByTestId("main-container")).toBeInTheDocument();
    });
  
  });