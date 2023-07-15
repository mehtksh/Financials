import { getFileScannerURL, getFinancialsURL } from "../utils/authHelper";

export const GetFileScannerURL = () => `${getFileScannerURL()}/scanner/upload`;

export const getUploadToS3Url = () =>
  `${getFinancialsURL()}/extraction/UploadPdf`;

export const getSchedulePagesUrl = (key) =>
  `${getFinancialsURL()}/extraction/GetSchedulePages?docPath=${key}`;

export const extractDatafromAlexandriaURL = () =>
  `${getFinancialsURL()}/Extraction`;

export const savePresetURL = () => `${getFinancialsURL()}/SavePreset`;
