import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UploadDataFile from "../../assets/UploadDataFile";
import Financials from "./Financials";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { FINANCIALS } from "../../Store/actions/constants";

const mockStore = configureStore([]);
describe("Financials Test", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      Financials: {
        pdf: null,
        activePage: 1,
        disableExtractBtn: false,
        showExtractedPage: false,
        ISFinData: undefined,
        BSFinData: undefined,
        CFFinData: undefined,
        uploadedFileData: {},
        FormData: {
          IS: {},
          BS: {},
          CF: {},
        },
        showUploadPdfPopup: false,
        uploadedFileData: {},
        pageData: [],
      },
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {});
  test("should display a greeting ", () => {
    expect(UploadDataFile).toBeDefined();
    const { getByText } = render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );
    expect(
      getByText("Upload financial data by clicking on the button below")
    ).toBeInTheDocument();
  });
  test("displays PdfViewerLoader when pdf file is present", () => {
    const pdfFile = new File(["pdf content"], "sample.pdf", {
      type: "application/pdf",
    });
    store.dispatch({
      type: FINANCIALS.SET_TOTALPAGES_OF_PDF,
      payload: pdfFile,
    });
    render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );
    expect(screen.getByText("Discard")).toBeInTheDocument();
  });
  test('calls handleExtractClick when "Extract" button is clicked', () => {
    render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );

    const extractButton = screen.getByText("Extract");
    const handleExtractClickMock = jest.fn();
    Financials.handleExtractClick = handleExtractClickMock;

    fireEvent.click(extractButton);
    expect(screen.getByText("Extract"));
  });
  test("triggers handleExtractClick function when Extract button is clicked", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );
    fireEvent.click(screen.getByText("Extract"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: FINANCIALS.SET_ACTIVE_BOND,
      payload: expect.any(Object),
    });
  });
  test("triggers handleDiscardClick function when Discard button is clicked", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );
    fireEvent.click(screen.getByText("Discard"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: FINANCIALS.RESET_PDF_SELECTION,
      payload: undefined,
    });
  });
  test('calls onClick when "Upload Files" button is clicked', () => {
    store.dispatch = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Financials />
      </Provider>
    );
    let element = getByText("Upload Files");
    fireEvent.click(element);
    expect(screen.getByText("Upload Files"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: FINANCIALS.SHOW_UPLOAD_PDF,
      payload: true,
    });
  });
});
