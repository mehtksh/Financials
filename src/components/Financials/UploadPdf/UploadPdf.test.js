import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UploadPdf from "./UploadPdf";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import ProcessingFile from "../../../assets/ProcessingFile";

const mockStore = configureStore([]);
describe("Upload pdf Test", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      Financials: {
        showUploadPdfPopup: false,
        uploadedFileData: {},
        pageData: [],
      },
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {});

  test("should display a greeting", async () => {
    await render(
      <Provider store={store}>
        <UploadPdf />
      </Provider>,
      container
    );
  });

  test("image is defined", async () => {
    expect(ProcessingFile).toBeDefined();
  });
});
