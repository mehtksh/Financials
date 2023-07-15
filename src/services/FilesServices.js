import { API } from "../../src/Rest_API_Directory/API_Store";

export const CheckFilesInfected = async (file) => {
  let isInfected = false;
  let data = new FormData();
  data.append("file", file);
  let scannedRes = await API.getFilesScanned(data);
  if (scannedRes && scannedRes.data && scannedRes.data.length) {
    if (scannedRes.data[0].scanned && scannedRes.data[0].infected) {
      isInfected = true;
    }
  }
  return isInfected;
};
