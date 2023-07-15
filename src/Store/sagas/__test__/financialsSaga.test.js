import { expectSaga } from "redux-saga-test-plan";
import { API } from "../../../Rest_API_Directory/API_Store";
import * as saga from "../financialsSaga";
import { FINANCIALS } from "../../actions/constants";

jest.mock("../../../Rest_API_Directory/API_Store");
jest.mock("axios");

describe("Financials Saga", () => {
  test("FINANCIALS.UPLOAD_FILE_TO_S3", () => {
    API.uploadFileToS3 = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          alexKey: "docpath/ancd.pdf",
          key: "abcd.pdf",
        },
      })
    );
    return expectSaga(saga.uploadFileToS3Action, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.UPLOAD_FILE_TO_S3_SUCCESS,
        payload: {
          alexKey: "docpath/ancd.pdf",
          key: "abcd.pdf",
        },
      })
      .run();
  });

  test("FINANCIALS.UPLOAD_FILE_TO_S3 failure", () => {
    API.uploadFileToS3 = jest.fn(() =>
      Promise.resolve({
        status: 400,
        data: {},
      })
    );
    return expectSaga(saga.uploadFileToS3Action, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE,
      })
      .run();
  });

  test("FINANCIALS.UPLOAD_FILE_TO_S3 exception", () => {
    API.uploadFileToS3 = jest.fn(() =>
      Promise.resolve({
        undefined,
      })
    );
    return expectSaga(saga.uploadFileToS3Action, {
      payload: new FormData(),
    })
      .put({
        type: FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE,
      })
      .run();
  });

  test("FINANCIALS.GET_SCHEDULE_PAGES", () => {
    API.getSchedulePages = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: [{}, {}, {}],
      })
    );
    return expectSaga(saga.getSchedulePagesAction, {
      payload: { alexKey: "docpath/abcd.pdf" },
    })
      .put({
        type: FINANCIALS.GET_SCHEDULE_PAGES_SUCCESS,
        payload: [{}, {}, {}],
      })
      .run();
  });

  test("FINANCIALS.GET_SCHEDULE_PAGES exception", () => {
    API.getSchedulePages = jest.fn(() =>
      Promise.reject({
        status: 400,
        data: [{}, {}, {}],
      })
    );
    return expectSaga(saga.getSchedulePagesAction, {
      payload: { alexKey: undefined },
    })
      .put({
        type: FINANCIALS.GET_SCHEDULE_PAGES_FAILURE,
      })
      .run();
  });

  test("FINANCIALS.GET_SCHEDULE_PAGES failure", () => {
    API.getSchedulePages = jest.fn(() =>
      Promise.resolve({
        status: 400,
        data: [{}, {}, {}],
      })
    );
    return expectSaga(saga.getSchedulePagesAction, {
      payload: { alexKey: "docpath/abcd.pdf" },
    })
      .put({
        type: FINANCIALS.GET_SCHEDULE_PAGES_FAILURE,
      })
      .run();
  });
});
