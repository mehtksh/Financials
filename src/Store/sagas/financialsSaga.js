import { put, takeLatest, call } from "redux-saga/effects";
import { FINANCIALS } from "../actions/constants";
import { API } from "../../Rest_API_Directory/API_Store";
import { Message } from "@maknowledgeservices/neptune";

export const uploadFileToS3Action = function* ({ payload }) {
  try {
    const res = yield call(API.uploadFileToS3, payload);
    if (res.status === 200) {
      yield put({
        type: FINANCIALS.UPLOAD_FILE_TO_S3_SUCCESS,
        payload: res?.data,
      });
    } else {
      yield put({ type: FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE });
    }
  } catch (err) {
    yield put({ type: FINANCIALS.UPLOAD_FILE_TO_S3_FAILURE });
  }
};

export function* uploadFileToS3Watcher() {
  yield takeLatest(FINANCIALS.UPLOAD_FILE_TO_S3, uploadFileToS3Action);
}

export const getSchedulePagesAction = function* ({ payload }) {
  try {
    const res = yield call(API.getSchedulePages, payload.alexKey.trim());
    if (res.status === 200) {
      yield put({
        type: FINANCIALS.GET_SCHEDULE_PAGES_SUCCESS,
        payload: res?.data,
      });
      Message.success("Financials uploaded successfully");
    } else {
      yield put({ type: FINANCIALS.GET_SCHEDULE_PAGES_FAILURE });
      Message.error("Financials upload failed");
    }
  } catch (err) {
    yield put({ type: FINANCIALS.GET_SCHEDULE_PAGES_FAILURE });
    Message.error("Financials upload failed");
  }
};

export function* getSchedulePagesWatcher() {
  yield takeLatest(FINANCIALS.GET_SCHEDULE_PAGES, getSchedulePagesAction);
}
