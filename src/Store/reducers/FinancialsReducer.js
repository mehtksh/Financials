import { FINANCIALS } from "../actions/constants";

let initialState = {
  showExtractedPage: false,
  showUploadPdfPopup: false,
  uploadedFileData: {},
  pageData: [],
  pdf: undefined,
  activePage: undefined,
  totalPages: 0,
  disableExtractBtn: false,
  activeBond: undefined,
  ISFinData: {},
  BSFinData: {},
  CFFinData: {},
  userInputs: {},
};

let FinancialsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIALS.SHOW_UPLOAD_PDF: {
      return Object.assign({}, state, {
        showUploadPdfPopup: payload,
      });
    }
    case FINANCIALS.UPLOAD_FILE_TO_S3_SUCCESS: {
      return Object.assign({}, state, {
        uploadedFileData: payload,
      });
    }
    case FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE: {
      return Object.assign({}, state, {
        uploadedFileData: {},
      });
    }

    case FINANCIALS.GET_SCHEDULE_PAGES_SUCCESS: {
      return Object.assign({}, state, {
        pageData: payload,
      });
    }

    case FINANCIALS.GET_SCHEDULE_PAGES_FAILURE: {
      return Object.assign({}, state, {
        pageData: [],
      });
    }

    case FINANCIALS.GET_SCHEDULE_PAGES_COMPLETED: {
      return Object.assign({}, state, {
        showUploadPdfPopup: false,
        pdf: payload,
      });
    }

    case FINANCIALS.SET_ACTIVE_PAGE: {
      return Object.assign({}, state, {
        activePage: payload,
      });
    }

    case FINANCIALS.SET_TOTALPAGES_OF_PDF: {
      return Object.assign({}, state, {
        totalPages: payload,
      });
    }

    case FINANCIALS.SET_DISABLE_EXTRACT_BTN: {
      return Object.assign({}, state, {
        disableExtractBtn: payload.disable,
        userInputs: payload.formData,
      });
    }
    case FINANCIALS.SET_ACTIVE_BOND: {
      let { activeBond, pdf, uploadedFileData, showExtractedPage } = state;
      if (activeBond?.id !== payload?.id) {
        pdf = undefined;
        uploadedFileData = {};
        showExtractedPage = false;
      }

      return Object.assign({}, state, {
        activeBond: payload,
        uploadedFileData,
        pageData: [],
        pdf,
        showExtractedPage,
      });
    }
    case FINANCIALS.RESET_PDF_SELECTION: {
      return Object.assign({}, state, {
        showUploadPdfPopup: false,
        uploadedFileData: {},
        pageData: [],
        pdf: payload,
        userInputs: {},
      });
    }
    case FINANCIALS.SHOW_OUTPUT_SCREEN: {
      return Object.assign({}, state, {
        showExtractedPage: payload,
        showUploadPdfPopup: !payload,
      });
    }
    case FINANCIALS.IS_EXTRACTION_DATA_SUCCESS: {
      return Object.assign({}, state, {
        ISFinData: payload,
      });
    }
    case FINANCIALS.CF_EXTRACTION_DATA_SUCCESS: {
      return Object.assign({}, state, {
        CFFinData: payload,
      });
    }
    case FINANCIALS.BS_EXTRACTION_DATA_SUCCESS: {
      return Object.assign({}, state, {
        BSFinData: payload,
      });
    }
    default:
      return state;
  }
};

export default FinancialsReducer;
