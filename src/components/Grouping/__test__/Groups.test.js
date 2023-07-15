import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Groups from "../Groups";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("Groups Test", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      GroupsReducer: {
        groupList: [],
        selectedLineItems: [],
      },
      FormulaeReducer: {
        selectedGroupIndex: undefined,
      },
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {});

  test("should display groups", async () => {
    store = mockStore({
      GroupsReducer: {
        groupList: [
          {
            name: "group 1",
            lineItemList: [
              {
                lineitem_text: "line item 1",
              },
            ],
          },
        ],
        selectedLineItems: [],
      },
      FormulaeReducer: {
        selectedGroupIndex: undefined,
      },
    });
    let { getByText } = await render(
      <Provider store={store}>
        <Groups />
      </Provider>,
      container
    );
    expect(getByText("group 1")).toBeDefined();
  });

  test("render with no groups", async () => {
    let { getByText } = await render(
      <Provider store={store}>
        <Groups />
      </Provider>,
      container
    );
    expect(getByText("Group line items by creating groups")).toBeDefined();
  });

  test("add groups", async () => {
    store = mockStore({
      GroupsReducer: {
        groupList: [
          {
            name: "New Group 1",
            lineItemList: [
              {
                lineitem_text: "line item 1",
              },
            ],
          },
        ],
        selectedLineItems: [],
      },
      FormulaeReducer: {
        selectedGroupIndex: undefined,
      },
    });
    let { getByText, getByTestId } = await render(
      <Provider store={store}>
        <Groups />
      </Provider>,
      container
    );
    let createGroupBtn = getByTestId("create-group");
    fireEvent.click(createGroupBtn);
    waitFor(() => {
      expect(getByText("New Group 2")).toBeDefined();
      let editGroupBtn = getByTestId("edit-group");
      fireEvent.click(editGroupBtn);
    });
  });

  test("delete groups", async () => {
    store = mockStore({
      GroupsReducer: {
        groupList: [
          {
            name: "New Group 1",
            lineItemList: [
              {
                lineitem_text: "line item 1",
              },
            ],
          },
        ],
        selectedLineItems: [],
      },
      FormulaeReducer: {
        selectedGroupIndex: undefined,
      },
    });
    let { getByText, getByTestId } = await render(
      <Provider store={store}>
        <Groups />
      </Provider>,
      container
    );
    let createGroupBtn = getByTestId("create-group");
    fireEvent.click(createGroupBtn);
    waitFor(() => {
      expect(getByText("New Group 2")).toBeDefined();
      let deleteGroupBtn = getByTestId("delete-group");
      fireEvent.click(deleteGroupBtn);
      expect(getByText("New Group 2")).toBeUndefined();
    });
  });
});
