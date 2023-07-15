import { FORMULAE, GROUPS } from "../../Store/actions/constants";

export let handleFilterSuggestions = (e, suggestions) => {
  const query = e.toLowerCase().trim();
  return suggestions.filter((suggestion) => {
    return suggestion.text.toLowerCase().includes(query);
  });
};

export let handleDelete = (dispatch, tags, deletedIndex) => {
  let filteredTags = tags.filter((_tag, index) => index !== deletedIndex);
  dispatch({
    type: FORMULAE.FORMULAE_SET_STATE,
    payload: {
      tags: filteredTags,
    },
  });
};

export let handleAddition = (
  dispatch,
  selectedTag,
  tags,
  suggestions,
  operators
) => {
  let filteredList = suggestions.filter(
    (item) => item.text === selectedTag.text
  );

  let newTag = {
    id: selectedTag.id,
    text: selectedTag.text,
    type: "",
  };

  if (Number(selectedTag.text)) {
    newTag.type = "numeric";
  }

  if (filteredList.length > 0) {
    newTag.type = selectedTag.type;
  }

  if (operators.includes(selectedTag.text)) {
    newTag.type = "operator";
  }
  if (newTag.type) {
    let newTags = [...tags, newTag];
    dispatch({
      type: FORMULAE.FORMULAE_SET_STATE,
      payload: {
        tags: newTags,
      },
    });
  }
};

export let handleDrag = (dispatch, tags, draggedTag, currPos, newPos) => {
  let newTags = [...tags];
  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, draggedTag);
  dispatch({
    type: FORMULAE.FORMULAE_SET_STATE,
    payload: {
      tags: newTags,
    },
  });
};

let replaceLineItem = (formula, lineItems) => {
  let finalFormula = formula;
  for (let lineItem of lineItems) {
    finalFormula = finalFormula.replace(
      `<${lineItem.lineitem_text.toLowerCase()}>`,
      0
    );
  }
  return finalFormula;
};

let replaceGroupName = (formula, groupsList) => {
  let finalFormula = formula;
  if (finalFormula.includes("[") && finalFormula.includes("]")) {
    for (let group of groupsList) {
      finalFormula = finalFormula.replace(
        `[${group.name.toLowerCase()}]`,
        `(${group.formula})` ?? 0
      );
    }
    return replaceGroupName(finalFormula, groupsList);
  } else return finalFormula;
};

let validateFormula = (formula, lineItems, groupsList) => {
  let finalFormula = formula
    .replace("{{", "(")
    .replace("}}", ")")
    .replace("##", "-");
  finalFormula = replaceGroupName(finalFormula, groupsList);
  finalFormula = replaceLineItem(finalFormula, lineItems);
  try {
    eval(finalFormula);
    return true;
  } catch {
    return false;
  }
};

let updateFormula = (
  dispatch,
  formula,
  groupsList,
  selectedGroupIndex,
  selectedGroup,
  isValidFormula
) => {
  let newGroupList = groupsList.map((x, i) => {
    if (selectedGroupIndex === i) {
      return {
        ...x,
        formula: formula,
        isInvalid: !isValidFormula,
      };
    } else {
      return {
        ...x,
      };
    }
  });
  dispatch({
    type: GROUPS.GROUPS_SET_STATE,
    payload: {
      groupList: newGroupList,
    },
  });
  dispatch({
    type: FORMULAE.FORMULAE_SET_STATE,
    payload: {
      selectedGroup: {
        ...selectedGroup,
        isInvalid: !isValidFormula,
      },
    },
  });
};

export let constructFormulaByTags = (
  dispatch,
  tags,
  lineItems,
  groupsList,
  selectedGroupIndex,
  selectedGroup
) => {
  if (tags.length > 0) {
    let constructedFormula = "";
    for (let eachTag of tags) {
      if (eachTag.type === "operator" || eachTag.type === "numeric") {
        constructedFormula += eachTag.text.toString();
      } else if (eachTag.type === "line_item") {
        let lineItem = eachTag.text
          .toLowerCase()
          .trim()
          .replace("(", "{{")
          .replace(")", "}}")
          .replace("-", "##");
        constructedFormula += `<${lineItem}>`;
      } else if (eachTag.type === "group") {
        let groupName = eachTag.text
          .toLowerCase()
          .trim()
          .replace("(", "{{")
          .replace(")", "}}")
          .replace("-", "##");
        constructedFormula += `[${groupName}]`;
      }
    }
    let isValidFormula = validateFormula(
      constructedFormula,
      lineItems,
      groupsList
    );
    updateFormula(
      dispatch,
      constructedFormula,
      groupsList,
      selectedGroupIndex,
      selectedGroup,
      isValidFormula
    );
  }
};
