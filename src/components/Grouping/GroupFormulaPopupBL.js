import { FORMULAE, GROUPS } from "../../Store/actions/constants";

export let hideModalForm = (dispatch) => {
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      groupList: [],
      openGroupsPopUp: false,
      selectedLineItems: [],
      hideLineItemTab: false,
      tags: [],
    },
  });
};

export let hideModalFormAfterSave = (
  dispatch,
  groupList,
  selectedLineItems
) => {
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      groupList: groupList,
      openGroupsPopUp: false,
      selectedLineItems: selectedLineItems,
    },
  });
};

export let onChangeCheckBox = (
  dispatch,
  selectedLineItems,
  lineItem,
  checked
) => {
  let newLineItems = null;
  if (checked) {
    newLineItems = [...selectedLineItems, lineItem];
  } else {
    newLineItems = selectedLineItems.filter(
      (x) => x.row_num !== lineItem.row_num
    );
  }
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { selectedLineItems: newLineItems },
  });
};

export let isChecked = (selectedLineItems, lineItem) => {
  return (
    selectedLineItems.find((x) => x.row_num === lineItem.row_num) !== undefined
  );
};

export let onClickExpandCollapseIcon = (dispatch, hideLineItemTab) => {
  dispatch({
    type: FORMULAE.FORMULAE_SET_STATE,
    payload: { selectedGroup: undefined, tags: [] },
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { hideLineItemTab: hideLineItemTab },
  });
};

export let disableSave = (groupList) => {
  let disable = false;
  let isInavlidFormula = groupList?.find((x) => x.isInvalid);
  disable = isInavlidFormula !== undefined;
  return disable;
};

export let savePreset = (dispatch, groupList, activeTab, financialState) => {
  let { activeBond } = financialState;
  let groupPayload = groupList.map((group) => {
    return {
      groupId: group.groupId,
      groupName: group.name,
      formula: group.formula,
      lineItem: group.lineItemList.map((lineItem) => {
        return {
          lineItemId: lineItem.lineItemId,
          lineItemName: lineItem.lineitem_text,
          groupId: group.groupId,
        };
      }),
    };
  });
  let FinancialPayload = {
    statementKey: activeTab,
    obligorId: activeBond.obligor.id,
    securityTypeId: activeBond.securityType.id,
    group: groupPayload,
  };
  dispatch({ type: GROUPS.GROUPS_PRESET_SAVE, payload: FinancialPayload });
};
