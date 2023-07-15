import {
  addGroup,
  onClickEditButton,
  onChangeGroupName,
  onClickCancelGroupName,
  onClickSaveGroupName,
  onClickMoveLineItems,
  onClickDeleteGroup,
} from "../GroupsBL";

describe("addGroup", () => {
  test("dispatches the correct action with a new group", () => {
    const dispatchMock = jest.fn();
    const groupsListMock = [
      { name: "Existing Group 1" },
      { name: "New Group 3" },
    ];

    addGroup(dispatchMock, groupsListMock);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "CREATE_GROUPS",
      payload: {
        name: "New Group 4",
        formula: "",
        lineItemList: [],
        isInvalid: false,
      },
    });
  });
});

describe("onClickEditButton", () => {
  test("updates state with the index and name of the clicked group", () => {
    const setStateMock = jest.fn();
    const indexMock = 1;
    const groupMock = { name: "Existing Group" };
    const stateMock = { editGroupIndex: -1, editedGroupName: "" };

    onClickEditButton(stateMock, setStateMock, indexMock, groupMock, jest.fn());

    expect(setStateMock).toHaveBeenCalledWith({
      ...stateMock,
      editGroupIndex: 1,
      editedGroupName: "Existing Group",
    });
  });
});

describe("onChangeGroupName", () => {
  test("updates state with the new group name", () => {
    const setStateMock = jest.fn();
    const groupNameMock = "New Group";

    onChangeGroupName({}, setStateMock, groupNameMock, [], jest.fn());

    expect(setStateMock).toHaveBeenCalledWith({
      ...{},
      editedGroupName: "New Group",
    });
  });
});

describe("onClickCancelGroupName", () => {
  test("resets state with empty group name and index", () => {
    const setStateMock = jest.fn();
    const stateMock = { editedGroupName: "Existing Group", editGroupIndex: 2 };

    onClickCancelGroupName(stateMock, setStateMock);

    expect(setStateMock).toHaveBeenCalledWith({
      ...stateMock,
      editedGroupName: "",
      editGroupIndex: -1,
    });
  });
});

describe("onClickSaveGroupName", () => {
  test("dispatches the correct action with updated group name", () => {
    const setStateMock = jest.fn();
    const dispatchMock = jest.fn();
    const groupListMock = [{ name: "Group 1" }, { name: "Group 2" }];
    const stateMock = {
      editedGroupName: "Updated Group",
      editGroupIndex: 0,
    };

    onClickSaveGroupName(
      stateMock,
      setStateMock,
      dispatchMock,
      groupListMock,
      0
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        groupList: [{ name: "Updated Group" }, { name: "Group 2" }],
      },
    });
    expect(setStateMock).toHaveBeenCalledWith({
      ...stateMock,
      editedGroupName: "",
      editGroupIndex: -1,
    });
  });
});

describe("onClickMoveLineItems", () => {
  test("line items moved to the selected group", () => {
    const dispatchMock = jest.fn();
    const selectedIndexMock = 1;
    const selectedLineItemsMock = [{ row_num: 1 }, { row_num: 2 }];
    const groupListMock = [{ lineItemList: [] }, { lineItemList: [] }];
    const lineItemsMock = [{ row_num: 1 }, { row_num: 2 }, { row_num: 3 }];

    onClickMoveLineItems(
      dispatchMock,
      selectedIndexMock,
      selectedLineItemsMock,
      groupListMock,
      lineItemsMock
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        groupList: [
          { lineItemList: [] },
          { lineItemList: [{ row_num: 1 }, { row_num: 2 }] },
        ],
        selectedLineItems: [],
        lineItems: [{ row_num: 3 }],
      },
    });
  });

  test("does not move line items are selected", () => {
    const dispatchMock = jest.fn();
    const selectedIndexMock = 1;
    const selectedLineItemsMock = [];
    const groupListMock = [{ lineItemList: [] }, { lineItemList: [] }];
    const lineItemsMock = [{ row_num: 1 }, { row_num: 2 }];

    onClickMoveLineItems(
      dispatchMock,
      selectedIndexMock,
      selectedLineItemsMock,
      groupListMock,
      lineItemsMock
    );

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  test("onDelete group", () => {
    const dispatchMock = jest.fn();
    const selectedIndexMock = 1;
    const groupMock = {
      lineItemList: [
        {
          row_num: 3,
        },
      ],
    };
    const groupListMock = [{ lineItemList: [] }, groupMock];
    const lineItemsMock = [{ row_num: 1 }, { row_num: 2 }];

    onClickDeleteGroup(
      dispatchMock,
      groupListMock,
      groupMock,
      lineItemsMock,
      selectedIndexMock
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        groupList: [{ lineItemList: [] }],
        lineItems: [{ row_num: 1 }, { row_num: 2 }, { row_num: 3 }],
      },
    });
  });
});
