import { FINANCIALS } from "../../actions/constants";
import reducer from "../FinancialsReducer";

let state = {
  showUploadPdfPopup: false,
  uploadedFileData: {},
  pageData: [],
  pdf: undefined,
  activePage: undefined,
  totalPages: 0,
  disableExtractBtn: false,
};

describe("FinancialsReducer", () => {
  test("FinancialsReducer.default", () => {
    let actual = reducer(state, {
      type: "default",
      payload: true,
    });
    expect(actual.showUploadPdfPopup).toBeFalsy();
  });

  test("FinancialsReducer.SHOW_UPLOAD_PDF", () => {
    let actual = reducer(state, {
      type: FINANCIALS.SHOW_UPLOAD_PDF,
      payload: true,
    });
    expect(actual.showUploadPdfPopup).toBeTruthy();
  });

  test("FinancialsReducer.UPLOAD_FILE_TO_S3_SUCCESS", () => {
    let actual = reducer(state, {
      type: FINANCIALS.UPLOAD_FILE_TO_S3_SUCCESS,
      payload: {
        alexKey: "docpath/abcd.pdf",
        key: "abcd.pdf",
      },
    });
    expect(actual.uploadedFileData).toHaveProperty(
      "alexKey",
      "docpath/abcd.pdf"
    );
    expect(actual.uploadedFileData).toHaveProperty("key", "abcd.pdf");
  });

  test("FinancialsReducer.UPLOAD_FILE_TO_S3_FAILURE", () => {
    let actual = reducer(state, {
      type: FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE,
      payload: {},
    });
    expect(actual.uploadedFileData).toEqual({});
  });

  test("FinancialsReducer.GET_SCHEDULE_PAGES_SUCCESS", () => {
    let payload = [
      {
        pageNumber: 10,
        pageName: "Is",
      },
      {
        pageNumber: 12,
        pageName: "Bs",
      },
    ];
    let actual = reducer(state, {
      type: FINANCIALS.GET_SCHEDULE_PAGES_SUCCESS,
      payload: payload,
    });
    expect(actual.pageData).toHaveLength(2);
  });

  test("FinancialsReducer.GET_SCHEDULE_PAGES_FAILURE", () => {
    let actual = reducer(state, {
      type: FINANCIALS.GET_SCHEDULE_PAGES_FAILURE,
      payload: [],
    });
    expect(actual.pageData).toHaveLength(0);
  });

  test("FinancialsReducer.GET_SCHEDULE_PAGES_COMPLETED", () => {
    let actual = reducer(state, {
      type: FINANCIALS.GET_SCHEDULE_PAGES_COMPLETED,
      payload: new FormData(),
    });
    expect(actual.showUploadPdfPopup).toBeFalsy();
    expect(actual.pdf).toBeDefined();
  });

  test("FinancialsReducer.SET_ACTIVE_PAGE", () => {
    let actual = reducer(state, {
      type: FINANCIALS.SET_ACTIVE_PAGE,
      payload: 10,
    });
    expect(actual.activePage).toEqual(10);
  });

  test("FinancialsReducer.SET_TOTALPAGES_OF_PDF", () => {
    let actual = reducer(state, {
      type: FINANCIALS.SET_TOTALPAGES_OF_PDF,
      payload: 100,
    });
    expect(actual.totalPages).toEqual(100);
  });

  test("FinancialsReducer.SET_DISABLE_EXTRACT_BTN", () => {
    let actual = reducer(state, {
      type: FINANCIALS.SET_DISABLE_EXTRACT_BTN,
      payload: { disable: true },
    });
    expect(actual.disableExtractBtn).toBeTruthy();
  });

  test("FinancialsReducer.SET_ACTIVE_BOND", () => {
    let actual_state = {
      activeBond: { id: "12" },
      pdf: undefined,
      uploadedFileData: {},
      showExtractedPage: false,
    };
    let bond = { id: "14" };
    let actual = reducer(actual_state, {
      type: FINANCIALS.SET_ACTIVE_BOND,
      payload: bond,
    });
    expect(actual_state).toBeTruthy();
  });

  test("FinancialsReducer.RESET_PDF_SELECTION", () => {
    let actual_state = {
      pdf: undefined,
      uploadedFileData: {},
      showUploadPdfPopup: false,
      pageData: [102],
    };
    let bond = { id: "14" };
    let actual = reducer(actual_state, {
      type: FINANCIALS.RESET_PDF_SELECTION,
      payload: bond,
    });
    expect(actual).toBeTruthy();
  });

  test("FinancialsReducer.SHOW_OUTPUT_SCREEN", () => {
    let actual_state = {
      showExtractedPage: false,
      showUploadPdfPopup: false,
    };
    let actual = reducer(actual_state, {
      type: FINANCIALS.SHOW_OUTPUT_SCREEN,
      payload: true,
    });
    expect(actual).toBeTruthy();
  });

  test("FinancialsReducer.IS_EXTRACTION_DATA_SUCCESS", () => {
    let ISFinData = {
      key: "doc/upload/pdf/116c560a-3c97-4013-b36b-339ba7652e18.pdf",
      table_name: "IS",
      page_num: [102],
      table_region: [
        {
          table_name: "",
          coordinate: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0,
            pageNum: 0,
          },
        },
      ],
    };
    let actual = reducer(state, {
      type: FINANCIALS.IS_EXTRACTION_DATA_SUCCESS,
      payload: ISFinData,
    });
    expect(actual.ISFinData).toEqual(ISFinData);
  });

  test("FinancialsReducer.CF_EXTRACTION_DATA_SUCCESS", () => {
    let CFFinData = {
      key: "doc/upload/pdf/116c560a-3c97-4013-b36b-339ba7652e18.pdf",
      table_name: "CF",
      page_num: [104],
      table_region: [
        {
          table_name: "",
          coordinate: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0,
            pageNum: 0,
          },
        },
      ],
    };
    let actual = reducer(state, {
      type: FINANCIALS.CF_EXTRACTION_DATA_SUCCESS,
      payload: CFFinData,
    });
    expect(actual.CFFinData).toEqual(CFFinData);
  });

  test("FinancialsReducer.BS_EXTRACTION_DATA_SUCCESS", () => {
    let BSFinData = {
      key: "doc/upload/pdf/116c560a-3c97-4013-b36b-339ba7652e18.pdf",
      table_name: "BS",
      page_num: [102],
      table_region: [
        {
          table_name: "",
          coordinate: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0,
            pageNum: 0,
          },
        },
      ],
    };
    let actual = reducer(state, {
      type: FINANCIALS.BS_EXTRACTION_DATA_SUCCESS,
      payload: BSFinData,
    });
    expect(actual.BSFinData).toEqual(BSFinData);
  });
});
