import { takeLatest, call } from "redux-saga/effects";
import { GROUPS } from "../actions/constants";
import { API } from "../../Rest_API_Directory/API_Store";
import { Message } from "@maknowledgeservices/neptune";

export const savePreset = function* ({ payload }) {
  try {
    const res = yield call(API.savePreset, payload);
    if (res.status === 200) {
      Message.success("Groupings & formulas saved and applied successfully");
    } else {
      Message.error("Changes could not be saved due to an error");
    }
  } catch (err) {
    Message.error("Changes could not be saved due to an error");
  }
};

export function* savePresetWatcher() {
  yield takeLatest(GROUPS.GROUPS_PRESET_SAVE, savePreset);
}
