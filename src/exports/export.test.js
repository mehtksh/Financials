import FinancialsWrapper from "./index";
import { render, cleanup } from "@testing-library/react";
import React from "react";
afterEach(cleanup);
describe("exports test cases", () => {
  test("import components", () => {
    render(<FinancialsWrapper appConfig={{}} />);
    expect(FinancialsWrapper).toBeDefined();
  });
});
