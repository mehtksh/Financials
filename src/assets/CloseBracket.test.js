import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseBracket from "./CloseBracket";

describe("test CloseBracket Component", () => {
  test("should render with crashing", () => {
    render(<CloseBracket />);
  });
});
