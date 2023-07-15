import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Viewer from "./PdfViewerLoader";
const cancelHandel = jest.fn();
const userSelectedPageNumber = jest.fn();
const page = { pageNumber: "3" };
it("toolbar zoom in", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.state.scale = 1;
  testRef.current.zoomIn();
  fireEvent.click(screen.queryByTestId(/zoomin/));
  expect(Math.round(testRef.current.state.scale * 100) / 100).toEqual(1.1);
});

it("toolbar zoom out", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.state.scale = 1;
  testRef.current.zoomOut();
  fireEvent.click(screen.queryByTestId(/zoomout/));
  expect(Math.round(testRef.current.state.scale * 100) / 100).toEqual(0.91);
});

it("toolbar navigate next page", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.handelNextPage();
});

it("toolbar navigate previous page", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.handelPreviousPage();
});

it("toolbar navigate first page", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.handelFirstPage();
});

it("toolbar navigate last page", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.handelLastPage();
});

it("toolbar setPage", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      pdfFile={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.setpage("5", "6");
});

it("toolbar text search", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.handelTextSearch("file");
});

it("toolbar pagechange", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.scrollPageChange(page);
});

it("toolbar rotate", async () => {
  const testRef = React.createRef();
  render(
    <Viewer
      ref={testRef}
      cancelHandel={cancelHandel}
      userSelectedPageNumber={userSelectedPageNumber}
      docLink={"https://www.bis.org/publ/qtrpdf/r_qt1809e.pdf"}
      pageNumber={"2"}
      pdfloading={false}
      isChecked={false}
      query={"Expected growth / Market size"}
      industry={3}
      region={42}
      ratio={0.3}
    />
  );
  testRef.current.rotate();
});
