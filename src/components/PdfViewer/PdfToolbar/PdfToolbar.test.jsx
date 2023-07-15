import React from "react";
// import { fireEvent, render, screen, wait } from "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import PdfToolbar from "./PdfToolbar";

const onNextpage = jest.fn();
const onPreviouspage = jest.fn();
const onFirstpage = jest.fn();
const onLastpage = jest.fn();
const onSetPageTo = jest.fn();
const onTextSearch = jest.fn();
const onNextMatch = jest.fn();

it("pdf toolbar is loaded", async () => {
  const testRef = React.createRef();
  const popUp = render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onTextSearch={onTextSearch}
      onLastpage={onLastpage}
    />
  );
  expect(popUp).not.toBeNull();
});

it("toolbar next page click", async () => {
  const testRef = React.createRef();
  render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onLastpage={onLastpage}
      onTextSearch={onTextSearch}
    />
  );
  testRef.current.nextPage();
  fireEvent.click(screen.queryByTestId(/nextpage/));
  expect(onNextpage).toHaveBeenCalled();
});

it("toolbar previous page click", async () => {
  const testRef = React.createRef();
  render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onTextSearch={onTextSearch}
      onLastpage={onLastpage}
    />
  );
  testRef.current.previousPage();
  fireEvent.click(screen.queryByTestId(/previouspage/));
  expect(onPreviouspage).toHaveBeenCalled();
});

it("toolbar page number entered", async () => {
  const testRef = React.createRef();
  render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onTextSearch={onTextSearch}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onLastpage={onLastpage}
    />
  );
  testRef.current.onSearchChange("");
  testRef.current.onSearchChange("test");
});

it("zoom clicked", () => {
  const testRef = React.createRef();
  const pdfScreen = render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onTextSearch={onTextSearch}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onLastpage={onLastpage}
    />
  );
  fireEvent.click(screen.queryByTestId(/nextpage/));
  expect(pdfScreen).not.toBeNull();
  expect(onNextpage).toHaveBeenCalled();
});

it("onSearchChange", () => {
  const testRef = React.createRef();
  const { getByPlaceholderText } = render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onTextSearch={onTextSearch}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onLastpage={onLastpage}
    />
  );
  testRef.current.state.searchText = "";
  const searchInput = getByPlaceholderText(/Search/i);
  const mockChange = jest.fn();
  expect(searchInput.value).toEqual("");
  searchInput.onChange = mockChange;
  fireEvent.change(searchInput, { target: { value: "abc" } });
  expect(searchInput.value).toEqual("abc");
});

it("onSearch Next and previous Matches", async () => {
  // const testRef = React.createRef();
  // const pdfScreen = render(
  //   <PdfToolbar isRequired={true}
  //     ref={testRef}
  //     onSetPageTo={onSetPageTo}
  //     onNextpage={onNextpage}
  //     onPreviouspage={onPreviouspage}
  //     onTextSearch={onTextSearch}
  //     onFirstpage={onFirstpage}
  //     onLastpage={onLastpage}
  //     onNextMatch={onNextMatch}
  //   />
  // );
  // const searchInput = screen.getByPlaceholderText(/Search/i);
  // fireEvent.change(searchInput, { target: { value: "test" } });
  // await wait(() =>
  //   expect(screen.getByTestId(/nextSearch/)).toBeInTheDocument()
  // );
  // fireEvent.click(screen.queryByTestId(/nextSearch/));
  // fireEvent.click(screen.queryByTestId(/previousSearch/));
  // expect(pdfScreen).not.toBeNull();
  // expect(onNextMatch).toHaveBeenCalled();
});

it("onclear of Search text", async () => {
  // const testRef = React.createRef();
  // const pdfScreen = render(
  //   <PdfToolbar isRequired={true}
  //     ref={testRef}
  //     onSetPageTo={onSetPageTo}
  //     onNextpage={onNextpage}
  //     onPreviouspage={onPreviouspage}
  //     onTextSearch={onTextSearch}
  //     onFirstpage={onFirstpage}
  //     onLastpage={onLastpage}
  //     onNextMatch={onNextMatch}
  //   />
  // );
  // const searchInput = screen.getByPlaceholderText(/Search/i);
  // fireEvent.change(searchInput, { target: { value: "test" } });
  // await wait(() =>
  //   expect(screen.getByTestId(/clearSearch/)).toBeInTheDocument()
  // );
  // fireEvent.click(screen.queryByTestId(/clearSearch/));
  // expect(pdfScreen).not.toBeNull();
});

it("Change in the pagenumber text", () => {
  const testRef = React.createRef();
  const { getByPlaceholderText } = render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onTextSearch={onTextSearch}
      onLastpage={onLastpage}
      onNextMatch={onNextMatch}
    />
  );
  testRef.current.state.totalPages = 20;
  const pageInput = getByPlaceholderText(/Pg/i);
  const mockChange = jest.fn();
  expect(pageInput.value).toEqual("");
  pageInput.onChange = mockChange;
  fireEvent.change(pageInput, { target: { value: "1" } });
  expect(pageInput.value).toEqual("1");
  testRef.current.pageNumEdit("1");
  fireEvent.change(pageInput, { target: { value: "-1" } });
  expect(pageInput.value).toEqual("-1");
  testRef.current.pageNumEdit("-1");
});

it("Change in the pagenumber text and press enter", () => {
  const testRef = React.createRef();
  const { getByPlaceholderText } = render(
    <PdfToolbar
      isRequired={true}
      ref={testRef}
      onSetPageTo={onSetPageTo}
      onNextpage={onNextpage}
      onPreviouspage={onPreviouspage}
      onFirstpage={onFirstpage}
      onLastpage={onLastpage}
      onTextSearch={onTextSearch}
      onNextMatch={onNextMatch}
    />
  );
  testRef.current.state.totalPages = 20;
  const pageInput = getByPlaceholderText(/Pg/i);
  const mockChange = jest.fn();
  expect(pageInput.value).toEqual("");
  pageInput.onChange = mockChange;
  fireEvent.change(pageInput, { target: { value: "1" } });
  expect(pageInput.value).toEqual("1");
  testRef.current.onPageChange("1");
  expect(onSetPageTo).toHaveBeenCalled();
});
