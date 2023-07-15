//import { useSelector } from "react-redux";
import { FORMULAE, GROUPS } from "../../Store/actions/constants";

let getNewGroupName = (groupsList, availableGroupName) => {
  let isExists = groupsList.find(
    (x) =>
      x.name.trimRight().toLowerCase() ===
      ("New Group " + availableGroupName.toString()).toLowerCase()
  );
  if (isExists) {
    return getNewGroupName(groupsList, availableGroupName + 1);
  } else {
    return "New Group " + availableGroupName.toString();
  }
};

export let addGroup = (dispatch, groupsList) => {
  let newGroupName = getNewGroupName(groupsList, groupsList.length + 1);
  let newGroup = {
    name: newGroupName,
    formula: "",
    lineItemList: [],
    isInvalid: false,
  };
  dispatch({ type: GROUPS.CREATE_GROUPS, payload: newGroup });
};

export let onClickEditButton = (state, setState, index, group, dispatch) => {
  setState({
    ...state,
    editGroupIndex: index,
    editedGroupName: group.name,
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { isGroupNameDuplicate: false },
  });
};

export let onChangeGroupName = (
  state,
  setState,
  groupName,
  groupList,
  dispatch
) => {
  let isNameDuplicate = groupList?.find(
    (x) => x.name.toLowerCase() === groupName.toLowerCase()
  );
  setState({
    ...state,
    editedGroupName: groupName,
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { isGroupNameDuplicate: isNameDuplicate !== undefined },
  });
};

export let onClickCancelGroupName = (state, setState) => {
  setState({ ...state, editedGroupName: "", editGroupIndex: -1 });
};

export let onClickSaveGroupName = (
  state,
  setState,
  dispatch,
  groupList,
  index
) => {
  let updatedGrps = groupList.map((g, i) => {
    if (i === index) {
      return {
        ...g,
        name: state.editedGroupName,
      };
    } else {
      return {
        ...g,
      };
    }
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { groupList: updatedGrps },
  });
  setState({ ...state, editedGroupName: "", editGroupIndex: -1 });
};

export let onClickMoveLineItems = (
  dispatch,
  selectedIndex,
  selectedLineItems,
  groupList,
  lineItems
) => {
  if (selectedLineItems.length > 0) {
    let newGroupList = groupList.map((group, index) => {
      if (selectedIndex === index) {
        let newLineItemList = [
          ...group.lineItemList,
          ...selectedLineItems,
        ].sort((a, b) => a.row_num - b.row_num);
        return {
          ...group,
          lineItemList: newLineItemList,
        };
      } else {
        return {
          ...group,
        };
      }
    });
    let newLineItems = lineItems.filter(
      (x) =>
        selectedLineItems.find((y) => y.row_num === x.row_num) === undefined
    );
    dispatch({
      type: GROUPS.GROUPS_SET_STATE,
      payload: {
        groupList: newGroupList,
        selectedLineItems: [],
        lineItems: newLineItems,
      },
    });
  }
};

export let onClickDeleteGroup = (
  dispatch,
  groupList,
  group,
  lineItems,
  selectedIndex
) => {
  let newGroupList = groupList.filter((item, index) => selectedIndex !== index);
  let newLineItemList = [...group.lineItemList, ...lineItems].sort(
    (a, b) => a.row_num - b.row_num
  );
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      groupList: newGroupList,
      lineItems: newLineItemList,
    },
  });
};
export let onClickRemoveLineItem = (
  dispatch,
  selectedIndex,
  groupList,
  selectedLineItem,
  lineItems
) => {
  let newGroupList = groupList.map((group, index) => {
    if (selectedIndex === index) {
      let newLineItemList = group.lineItemList.filter(
        (x) => x.row_num !== selectedLineItem.row_num
      );
      return {
        ...group,
        lineItemList: newLineItemList,
      };
    } else {
      return {
        ...group,
      };
    }
  });
  let newLineItems = [...lineItems, selectedLineItem].sort(
    (a, b) => a.row_num - b.row_num
  );
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      groupList: newGroupList,
      lineItems: newLineItems,
    },
  });
};

let getTagsFromFormula = (formula) => {
  let operators = ["(", "+", "-", "*", "/", ")"];
  let modifiedFormula = formula
    .replace(/\(/g, "@@(@@")
    .replace(/\)/g, "@@)@@")
    .replace(/\+/g, "@@+@@")
    .replace(/-/g, "@@-@@")
    .replace(/\*/g, "@@*@@")
    .replace(/\//g, "@@/@@");
  let formulaTags = modifiedFormula.split("@@");
  formulaTags = formulaTags.filter((x) => x !== "");
  let tags = [];
  for (let formulaTag of formulaTags) {
    let newTag = {
      id: formulaTag,
      text: formulaTag,
      type: "",
    };
    if (operators.includes(formulaTag)) {
      newTag.type = "operator";
      tags.push(newTag);
    } else if (Number(formulaTag)) {
      newTag.type = "numeric";
      tags.push(newTag);
    } else if (
      formulaTag.indexOf("<") === 0 &&
      formulaTag.indexOf(">") === formulaTag.length - 1
    ) {
      newTag.type = "line_item";
      formulaTag = formulaTag
        .replace("<", "")
        .replace(">", "")
        .replace("{{", "(")
        .replace("}}", ")")
        .replace("##", "-");
      newTag.id = formulaTag;
      newTag.text = formulaTag;
      tags.push(newTag);
    } else if (
      formulaTag.indexOf("[") === 0 &&
      formulaTag.indexOf("]") === formulaTag.length - 1
    ) {
      newTag.type = "group";
      formulaTag = formulaTag
        .replace("[", "")
        .replace("]", "")
        .replace("{{", "(")
        .replace("}}", ")")
        .replace("##", "-");
      newTag.id = formulaTag;
      newTag.text = formulaTag;
      tags.push(newTag);
    }
  }
  return tags;
};

export let showFormula = (
  dispatch,
  allLineItems,
  groupList,
  selectedIndex,
  isReadOnly
) => {
  let suggestions = allLineItems.map((item) => {
    return {
      id: item.lineitem_text,
      text: item.lineitem_text,
      type: "line_item",
    };
  });

  let groupSuggestions = groupList.map((item) => {
    return {
      id: item.name,
      text: item.name,
      type: "group",
    };
  });
  let selectedGroup = groupList[selectedIndex];
  let tags = selectedGroup.formula
    ? getTagsFromFormula(selectedGroup.formula)
    : [];
  dispatch({
    type: FORMULAE.FORMULAE_SET_STATE,
    payload: {
      suggestions: [...suggestions, ...groupSuggestions],
      selectedGroup: selectedGroup,
      selectedGroupIndex: selectedIndex,
      isReadOnly: isReadOnly,
      tags: tags,
    },
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: { hideLineItemTab: true },
  });
};

export let onClickGroup = (
  dispatch,
  selectedIndex,
  selectedLineItems,
  groupList,
  lineItems,
  allLineItems,
  hideLineItemTab
) => {
  if (selectedLineItems.length > 0) {
    onClickMoveLineItems(
      dispatch,
      selectedIndex,
      selectedLineItems,
      groupList,
      lineItems
    );
  } else if (hideLineItemTab) {
    showFormula(dispatch, allLineItems, groupList, selectedIndex, true);
  }
};
