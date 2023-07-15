import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import InputScreen from "./InputScreen";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("InputScreen Test", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      Financials: {
        totalPages: 10,
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
        <InputScreen />
      </Provider>,
      container
    );
  });
});
