import { fork, all } from "redux-saga/effects";
import * as financialsSaga from "./financialsSaga";
import * as financialExtractionSaga from "./financialExtractionSaga";
import * as presetSaga from "./presetSaga";

export default function* rootSaga() {
  yield all(
    [
      financialsSaga.uploadFileToS3Watcher,
      financialsSaga.getSchedulePagesWatcher,
      financialExtractionSaga.extractDatafromAlexandriaCFWatcher,
      financialExtractionSaga.extractDatafromAlexandriaBSWatcher,
      financialExtractionSaga.extractDatafromAlexandriaISWatcher,
      presetSaga.savePresetWatcher,
    ].map(fork)
  );
}
