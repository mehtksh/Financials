import * as APIEndpoint from "./API_Directory";
import { Http } from ".";

const getFilesScanned = async (body) => {
  const url = APIEndpoint.GetFileScannerURL();
  return Http.FormDataPost(url, body);
};

const uploadFileToS3 = async (body) => {
  const url = APIEndpoint.getUploadToS3Url();
  return Http.FormDataPost(url, body);
};

const getSchedulePages = async (key) => {
  const url = APIEndpoint.getSchedulePagesUrl(key);
  return Http.Get(url);
};

const extractDatafromAlexandria = async (body) => {
  const url = APIEndpoint.extractDatafromAlexandriaURL();
  return Http.Post(url, body);
};

const savePreset = async (body) => {
  const url = APIEndpoint.savePresetURL();
  return Http.Post(url, body);
};

export const API = {
  getFilesScanned,
  uploadFileToS3,
  getSchedulePages,
  extractDatafromAlexandria,
  savePreset,
};
