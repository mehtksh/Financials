import {
  hideModalForm,
  onChangeCheckBox,
  isChecked,
} from "../GroupFormulaPopupBL";

describe("hideModalForm", () => {
  test("empty groupList and closed popup", () => {
    const dispatchMock = jest.fn();
    hideModalForm(dispatchMock);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        groupList: [],
        openGroupsPopUp: false,
        selectedLineItems: [],
        tags: [],
        hideLineItemTab: false,
      },
    });
  });
});

describe("onChangeCheckBox", () => {
  test("adds lineItem to selectedLineItems when checked is true", () => {
    const dispatchMock = jest.fn();
    const selectedLineItemsMock = [];
    const lineItemMock = { row_num: 1 };
    const checkedMock = true;

    onChangeCheckBox(
      dispatchMock,
      selectedLineItemsMock,
      lineItemMock,
      checkedMock
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        selectedLineItems: [{ row_num: 1 }],
      },
    });
  });

  test("removes lineItem from selectedLineItems when checked is false", () => {
    const dispatchMock = jest.fn();
    const selectedLineItemsMock = [{ row_num: 1 }, { row_num: 2 }];
    const lineItemMock = { row_num: 1 };
    const checkedMock = false;

    onChangeCheckBox(
      dispatchMock,
      selectedLineItemsMock,
      lineItemMock,
      checkedMock
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        selectedLineItems: [{ row_num: 2 }],
      },
    });
  });
});

describe("isChecked", () => {
  test("returns true if lineItem is in selectedLineItems", () => {
    const selectedLineItemsMock = [{ row_num: 1 }, { row_num: 2 }];
    const lineItemMock = { row_num: 1 };

    const result = isChecked(selectedLineItemsMock, lineItemMock);

    expect(result).toBe(true);
  });

  test("returns false if lineItem is not in selectedLineItems", () => {
    const selectedLineItemsMock = [{ row_num: 1 }, { row_num: 2 }];
    const lineItemMock = { row_num: 3 };

    const result = isChecked(selectedLineItemsMock, lineItemMock);

    expect(result).toBe(false);
  });
});
