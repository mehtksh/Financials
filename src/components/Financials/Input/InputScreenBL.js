import { FINANCIALS, MESSAGES } from "../../../Store/actions/constants";

let getPageNoArr = (textBoxValue) => {
  let changedData = textBoxValue.trim();
  if (textBoxValue.indexOf("-") >= 0 || textBoxValue.indexOf(",") >= 0) {
    changedData = changedData.split(" ").join("");
    changedData = changedData.split("-").join(",");
    changedData = changedData.split(",");
  }
  return Array.isArray(changedData) ? changedData : [changedData];
};

let validateInput = (value, stmntName, totalPages) => {
  let errorObj = {
    stmntName: stmntName,
    errorMsg: "",
  };
  let pageList = getPageNoArr(value);
  let isDuplicate = false;
  for (let pageNumber of pageList) {
    if (isNaN(pageNumber) || pageNumber === "") {
      errorObj.errorMsg = MESSAGES.INVALID_INPUT;
      return errorObj;
    }
    isDuplicate = pageList.filter((y) => pageNumber === y).length > 1;
    if (isDuplicate) {
      errorObj.errorMsg = MESSAGES.DUPLICATE_PAGE_NUMBER;
      return errorObj;
    }
    if (pageNumber > totalPages) {
      let errMsg = MESSAGES.PAGE_NUMBER_BETWEEN.replace("<FIRST>", 1);
      errMsg = errMsg.replace("<LAST>", totalPages);
      errorObj.errorMsg = errMsg;
      return errorObj;
    }
  }
  return errorObj;
};

export let handleFocus = (
  value,
  dispatch,
  totalPages,
  setErrorData,
  stmntName
) => {
  let pageToRender = undefined;
  let errorObj = validateInput(value, stmntName, totalPages);
  setErrorData(errorObj);
  if (
    (errorObj.errorMsg === "" && value?.indexOf("-") >= 0) ||
    value?.indexOf(",") >= 0
  ) {
    let val = getPageNoArr(value);
    if (val.length > 0) {
      pageToRender = val[0];
      dispatch({ type: FINANCIALS.SET_ACTIVE_PAGE, payload: pageToRender });
    }
  } else if (value !== "") {
    dispatch({ type: FINANCIALS.SET_ACTIVE_PAGE, payload: value });
  }
};

export let handleClick = (
  event,
  dispatch,
  totalPages,
  setErrorData,
  stmntName
) => {
  let value = event.target.value;
  handleFocus(value, dispatch, totalPages, setErrorData, stmntName);
};

export let disableExtractBtn = (formData, dispatch, errorMessage) => {
  let disable = false;
  if (
    errorMessage.length > 0 ||
    !formData?.periodDate ||
    !formData?.frequency ||
    !formData?.IS ||
    !formData?.BS ||
    !formData?.CF
  ) {
    disable = true;
  }
  dispatch({
    type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
    payload: { disable: disable, formData: formData },
  });
};

export let onChangePeriodData = (d, setErrorData) => {
  if (new Date(d) > new Date()) {
    let errorObj = {
      stmntName: "PERIODDATE",
      errorMsg: MESSAGES.SELECT_DATE_BEFORE_CURRENT,
    };
    setErrorData(errorObj);
  } else {
    let errorObj = {
      stmntName: "PERIODDATE",
      errorMsg: "",
    };
    setErrorData(errorObj);
  }
};
