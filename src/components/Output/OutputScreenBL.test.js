import { onClickGroupAndFormula } from "./OutputScreenBL";

describe("Output screen BL testcases", () => {
  test("onClickGroupAndFormula button", () => {
    let dispatchMock = jest.fn();
    let ISFinData = {
      table: [{ name: "ISFindata" }],
    };
    let BSFinData = {
      table: [{ name: "BSFindata" }],
    };
    let CFFinData = {
      table: [{ name: "CFFindata" }],
    };

    onClickGroupAndFormula(dispatchMock, 0, ISFinData, BSFinData, CFFinData);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        openGroupsPopUp: true,
        lineItems: [{ name: "ISFindata" }],
        allLineItems: [{ name: "ISFindata" }],
        activeTab: 0,
      },
    });
    onClickGroupAndFormula(dispatchMock, 1, ISFinData, BSFinData, CFFinData);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        openGroupsPopUp: true,
        lineItems: [{ name: "BSFindata" }],
        allLineItems: [{ name: "BSFindata" }],
        activeTab: 1,
      },
    });
    onClickGroupAndFormula(dispatchMock, 2, ISFinData, BSFinData, CFFinData);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        openGroupsPopUp: true,
        lineItems: [{ name: "CFFindata" }],
        allLineItems: [{ name: "CFFindata" }],
        activeTab: 2,
      },
    });
    onClickGroupAndFormula(dispatchMock, 3, ISFinData, BSFinData, CFFinData);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "GROUPS_SET_STATE",
      payload: {
        openGroupsPopUp: true,
        lineItems: undefined,
        allLineItems: undefined,
        activeTab: 3,
      },
    });
  });
});
