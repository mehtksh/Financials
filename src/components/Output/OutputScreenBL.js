import { GROUPS } from "../../Store/actions/constants";

let getLineItemData = (activeTab, ISFinData, BSFinData, CFFinData) => {
  switch (activeTab) {
    case 0:
      return ISFinData;
    case 1:
      return BSFinData;
    case 2:
      return CFFinData;
    default:
      return undefined;
  }
};

export let onClickGroupAndFormula = (
  dispatch,
  activeTab,
  ISFinData,
  BSFinData,
  CFFinData
) => {
  let finData = getLineItemData(activeTab, ISFinData, BSFinData, CFFinData);
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      openGroupsPopUp: true,
      lineItems: finData?.table,
      allLineItems: finData?.table,
      activeTab: activeTab,
    },
  });
};
