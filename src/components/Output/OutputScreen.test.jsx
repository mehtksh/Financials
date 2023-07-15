import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OutputScreen from "./OutputScreen";
import { useSelector, useDispatch } from "react-redux";
import { FINANCIALS } from "../../Store/actions/constants";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

describe("OutputScreen", () => {
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  test("renders the component with the correct tab panel", () => {
    useSelector.mockReturnValue({
      ISFinData: { page_num: 1 },
      BSFinData: { page_num: 2 },
      CFFinData: { page_num: 3 },
      selectedLineItems: [],
    });
    render(<OutputScreen />);
    expect(screen.getByText("Income Statement")).toBeInTheDocument;
    expect(screen.getByText("Balance Sheet")).toBeInTheDocument;
    expect(screen.getByText("Cash Flow Statement")).toBeInTheDocument;
    expect(screen.getByText("Other KPIs")).toBeInTheDocument;
  });

  test("renders the output table for the selected tab", () => {
    useSelector.mockReturnValue({
      ISFinData: { page_num: 1 },
      BSFinData: { page_num: 2 },
      CFFinData: { page_num: 3 },
      selectedLineItems: [],
    });
    render(<OutputScreen />);
    const balanceSheetTab = screen.getByText("Balance Sheet");
    fireEvent.click(balanceSheetTab);
    expect(screen.getByText("Download")).toBeInTheDocument;
  });

  it("dispatches the correct action when back button is clicked", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    render(<OutputScreen />);
    const backButton = screen.getByText("Back to Input");
    fireEvent.click(backButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: FINANCIALS.SHOW_OUTPUT_SCREEN,
      payload: false,
    });
  });
});
