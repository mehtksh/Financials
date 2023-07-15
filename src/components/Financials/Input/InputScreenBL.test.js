import { FINANCIALS, MESSAGES } from "../../../Store/actions/constants";
import {
  handleFocus,
  handleClick,
  disableExtractBtn,
  onChangePeriodData,
} from "./InputScreenBL";

jest.mock("../../../Store/actions/constants");
const dispatch = jest.fn();
const totalPages = 50;
const stmntName = "stmntName";
const value = "1,2-4";
const errorMessage = "errorMessage";
const frequency = "ANL";
const periodData = new Date();
describe("handleFocus", () => {
  it("should expose a function", () => {
    expect(handleFocus).toBeDefined();
  });

  it("handleFocus should return expected output", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      value,
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "",
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });

  it("handleFocus should return expected output when invalid page number is given", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      "value",
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "Invalid input type",
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });

  it("handleFocus should return expected error message when invalid page number is given", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      "value",
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "Invalid input type",
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });

  it("handleFocus should return expected error message when blank page number is given", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      " ",
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "Invalid input type",
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });

  it("handleFocus should return expected error message when duplicate page number is given", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      "1,2,3,1",
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "Duplicate page numbers not allowed",
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });
  it("handleFocus should return expected error message when duplicate page number is given", () => {
    const setErrorData = jest.fn();
    const retValue = handleFocus(
      "100",
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: `Only page numbers between 1 and ${totalPages} are allowed`,
      stmntName: "stmntName",
    });
    expect(retValue).toBeUndefined();
  });
});
describe("handleClick", () => {
  it("should expose a function", () => {
    expect(handleClick).toBeDefined();
  });

  it("handleClick should return expected output", () => {
    const setErrorData = jest.fn();
    const retValue = handleClick(
      { target: { value: "1,2" } },
      dispatch,
      totalPages,
      setErrorData,
      stmntName
    );

    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "",
      stmntName: "stmntName",
    });
  });
});
describe("disableExtractBtn", () => {
  it("should expose a function", () => {
    expect(disableExtractBtn).toBeDefined();
  });

  it("disableExtractBtn should return expected output", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      {
        IS: "1",
        BS: "2",
        CF: "3",
        frequency: "ANL",
        periodDate: "12-Jun-2023",
      },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,

      payload: {
        disable: false,
        formData: {
          IS: "1",
          BS: "2",
          CF: "3",
          frequency: "ANL",
          periodDate: "12-Jun-2023",
        },
      },
    });
  });

  it("disableExtractBtn should return expected output when BS not defined", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      { IS: "1", CF: "3", frequency: "ANL", periodDate: "12-Jun-2023" },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: {
        disable: true,
        formData: {
          IS: "1",
          CF: "3",
          frequency: "ANL",
          periodDate: "12-Jun-2023",
        },
      },
    });
  });

  it("disableExtractBtn should return expected output when CF is not defined", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      { IS: "1", BS: "2", frequency: "ANL", periodDate: "12-Jun-2023" },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: {
        disable: true,
        formData: {
          IS: "1",
          BS: "2",
          frequency: "ANL",
          periodDate: "12-Jun-2023",
        },
      },
    });
  });

  it("disableExtractBtn should return expected output when IS is not defined", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      { BS: "2", CF: "3", frequency: "ANL", periodDate: "12-Jun-2023" },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: {
        disable: true,
        formData: {
          BS: "2",
          CF: "3",
          frequency: "ANL",
          periodDate: "12-Jun-2023",
        },
      },
    });
  });

  it("disableExtractBtn should return expected output when frequency is undefined", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      {
        IS: "1",
        BS: "2",
        CF: "3",
        frequency: undefined,
        periodDate: "12-Jun-2023",
      },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: {
        disable: true,
        formData: {
          IS: "1",
          BS: "2",
          CF: "3",
          frequency: undefined,
          periodDate: "12-Jun-2023",
        },
      },
    });
  });

  it("disableExtractBtn should return expected output when period data is undefined", () => {
    const dispatchCurrent = jest.fn();
    const retValue = disableExtractBtn(
      { IS: "1", BS: "2", CF: "3", frequency: "ANL", periodDate: undefined },
      dispatchCurrent,
      ""
    );
    expect(dispatchCurrent).toHaveBeenCalledWith({
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: {
        disable: true,
        formData: {
          IS: "1",
          BS: "2",
          CF: "3",
          frequency: "ANL",
          periodDate: undefined,
        },
      },
    });
  });
});
describe("onChangePeriodData", () => {
  it("should expose a function", () => {
    expect(onChangePeriodData).toBeDefined();
  });

  it("onChangePeriodData should return expected output", () => {
    const setErrorData = jest.fn();
    const retValue = onChangePeriodData("12-DEC-2022", setErrorData);
    expect(setErrorData).toHaveBeenCalledWith({
      stmntName: "PERIODDATE",
      errorMsg: "",
    });
  });

  it("onChangePeriodData should return expected output when date is greated than current date", () => {
    const setErrorData = jest.fn();
    const retValue = onChangePeriodData("12-12-3022", setErrorData);
    expect(setErrorData).toHaveBeenCalledWith({
      errorMsg: "Date can not be greater than today's date",
      stmntName: "PERIODDATE",
    });
  });
});
