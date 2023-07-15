import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
//jest.mock('react-dom');
import App from "./App";
describe("App Test", () => {
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
  test("should display a greeting ", async () => {
    await render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
});
