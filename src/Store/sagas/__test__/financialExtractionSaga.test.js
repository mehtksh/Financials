import { FINANCIALS } from "../../actions/constants";
import { API } from "../../../Rest_API_Directory/API_Store";
import * as saga from "../financialExtractionSaga";
import { expectSaga } from "redux-saga-test-plan";

jest.mock("../../../Rest_API_Directory/API_Store");
jest.mock("axios");

const mockdata = {
  accession_num: "",
  acuity_id: "",
  app_name: "munibond",
  balancesheet_date: null,
  cik: null,
  companyname: "",
  country: null,
  extraction_accuracy: 100,
  filed_date: null,
  formtype: "",
  header: [
    {
      col_num: 1,
      qtrs: 0,
      months: 0,
      col_text: "2019",
      asofdate: null,
      unit: "USD",
    },
  ],
  key: "doc/upload/pdf/67b72f96-2962-4bd2-a171-caf60bd7a837.pdf",
  language: "en",
  merge: null,
  orientation: "vertical",
  page_num: 102,
  process_date: "2023-06-16T08:09:29.660892",
  source_url: "PDF",
  table: [
    {
      is_header: false,
      lineitem_text: "(in millions, except per share data)",
      page_num: 102,
      parent_text: "",
      columns: [{ col_num: 1, value: 2019, sign: "+" }],
      row_bbox: [[25.67, 143.26, 573.02, 155.93]],
    },
  ],
  table_name: "IS",
  table_region: [{ x1: null, y1: null, x2: null, y2: null }],
  ticker: null,
};

describe("Financials Saga", () => {
  test("extractDatafromAlexandriaIS", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaIS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.IS_EXTRACTION_DATA_SUCCESS,
        payload: mockdata,
      })
      .run();
  });

  test("extractDatafromAlexandriaIS", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 400,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaIS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.IS_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });

  test("extractDatafromAlexandriaBS exception", () => {
    API.extractDatafromAlexandria = jest.fn(() => Promise.resolve(undefined));
    return expectSaga(saga.extractDatafromAlexandriaIS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.IS_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });
});

describe("extractDatafromAlexandriaISWatcher", () => {
  test("extractDatafromAlexandriaCF", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaCF, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.CF_EXTRACTION_DATA_SUCCESS,
        payload: mockdata,
      })
      .run();
  });

  test("extractDatafromAlexandriaCF", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 400,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaCF, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.CF_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });

  test("extractDatafromAlexandriaBS exception", () => {
    API.extractDatafromAlexandria = jest.fn(() => Promise.resolve(undefined));
    return expectSaga(saga.extractDatafromAlexandriaCF, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.CF_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });
});

describe("extractDatafromAlexandriaBS", () => {
  test("extractDatafromAlexandriaBS", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaBS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.BS_EXTRACTION_DATA_SUCCESS,
        payload: mockdata,
      })
      .run();
  });

  test("extractDatafromAlexandriaBS", () => {
    API.extractDatafromAlexandria = jest.fn(() =>
      Promise.resolve({
        status: 400,
        data: mockdata,
      })
    );
    return expectSaga(saga.extractDatafromAlexandriaBS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.BS_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });

  test("extractDatafromAlexandriaBS exception", () => {
    API.extractDatafromAlexandria = jest.fn(() => Promise.resolve(undefined));
    return expectSaga(saga.extractDatafromAlexandriaBS, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.BS_EXTRACTION_DATA_FAILURE,
      })
      .run();
  });
});
