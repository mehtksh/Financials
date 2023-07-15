import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import OpenBracket from "./OpenBracket";

describe("test CloseBracket Component", () => {
  test("should render with crashing", () => {
    render(<OpenBracket />);
  });
});
