import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import GroupFormulaPopup from "../GroupFormulaPopup";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("GroupFormulaPopup Test", () => {
  let container;
  let store = null;
  beforeEach(() => {
    store = mockStore({
      GroupsReducer: {
        openGroupsPopUp: true,
        groupList: [
          {
            name: "group 1",
            lineItemList: [
              {
                lineitem_text: "IS line item",
              },
            ],
          },
        ],
        selectedLineItems: [],
        lineItems: [
          {
            lineitem_text: "line item 1",
          },
        ],
      },
      FormulaeReducer: {
        selectedGroupIndex: undefined,
      },
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {});

  test("should display  line items", async () => {
    let { getByText } = await render(
      <Provider store={store}>
        <GroupFormulaPopup />
      </Provider>,
      container
    );
    expect(getByText("Line Items")).toBeDefined();
    expect(getByText("line item 1")).toBeDefined();
  });

  test("should not display line items", async () => {
    let { getByText } = await render(
      <Provider store={store}>
        <GroupFormulaPopup />
      </Provider>,
      container
    );
    expect(getByText("Line Items")).toBeDefined();
  });

  test("on click of close popup", async () => {
    let { getByTestId } = await render(
      <Provider store={store}>
        <GroupFormulaPopup />
      </Provider>,
      container
    );
    let element = getByTestId("close-group-popup");
    fireEvent.click(element);
  });
});
