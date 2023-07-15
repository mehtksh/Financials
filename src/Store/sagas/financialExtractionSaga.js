import { put, takeLatest, call } from "redux-saga/effects";
import { FINANCIALS } from "../actions/constants";
import { API } from "../../Rest_API_Directory/API_Store";

export const extractDatafromAlexandriaIS = function* ({ payload }) {
  try {
    const res = yield call(API.extractDatafromAlexandria, payload);
    if (res.status === 200) {
      yield put({
        type: FINANCIALS.IS_EXTRACTION_DATA_SUCCESS,
        payload: res?.data,
      });
    } else {
      yield put({ type: FINANCIALS.IS_EXTRACTION_DATA_FAILURE });
    }
  } catch (err) {
    yield put({ type: FINANCIALS.IS_EXTRACTION_DATA_FAILURE });
  }
};

export function* extractDatafromAlexandriaISWatcher() {
  yield takeLatest(
    FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_IS,
    extractDatafromAlexandriaIS
  );
}

export const extractDatafromAlexandriaCF = function* ({ payload }) {
  try {
    const res = yield call(API.extractDatafromAlexandria, payload);
    if (res.status === 200) {
      yield put({
        type: FINANCIALS.CF_EXTRACTION_DATA_SUCCESS,
        payload: res?.data,
      });
    } else {
      yield put({ type: FINANCIALS.CF_EXTRACTION_DATA_FAILURE });
    }
  } catch (err) {
    yield put({ type: FINANCIALS.CF_EXTRACTION_DATA_FAILURE });
  }
};

export function* extractDatafromAlexandriaCFWatcher() {
  yield takeLatest(
    FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_CF,
    extractDatafromAlexandriaCF
  );
}

export const extractDatafromAlexandriaBS = function* ({ payload }) {
  try {
    const res = yield call(API.extractDatafromAlexandria, payload);
    if (res.status === 200) {
      yield put({
        type: FINANCIALS.BS_EXTRACTION_DATA_SUCCESS,
        payload: res?.data,
      });
    } else {
      yield put({ type: FINANCIALS.BS_EXTRACTION_DATA_FAILURE });
    }
  } catch (err) {
    yield put({ type: FINANCIALS.BS_EXTRACTION_DATA_FAILURE });
  }
};

export function* extractDatafromAlexandriaBSWatcher() {
  yield takeLatest(
    FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_BS,
    extractDatafromAlexandriaBS
  );
}
