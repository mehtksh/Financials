import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Formulae from "../Formulae";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("test Formulae Component", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      GroupsReducer: {
        groupList: [],
        lineItems: [],
      },
      FormulaeReducer: {
        tags: [],
        suggestions: [],
        selectedGroup: undefined,
        selectedGroupIndex: undefined,
        isReadOnly: true,
      },
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  test("should render", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Formulae />
      </Provider>,
      container
    );
    expect(
      getByText(/Select a group to create formulae for it/i)
    ).toBeInTheDocument();
  });
});
