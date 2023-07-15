import { getFileScannerURL, getFinancialsURL } from "../utils/authHelper";
import {
  GetFileScannerURL,
  getUploadToS3Url,
  getSchedulePagesUrl,
} from "./API_Directory";

jest.mock("../utils/authHelper");

getFinancialsURL.mockReturnValue("FinancialsURL");
getFileScannerURL.mockReturnValue("FileScannerURL");
describe("GetFileScannerURL", () => {
  it("should expose a function", () => {
    expect(GetFileScannerURL).toBeDefined();
  });

  it("GetFileScannerURL should return expected output", () => {
    const retValue = GetFileScannerURL();
    expect(retValue).toBe("FileScannerURL/scanner/upload");
    expect(retValue).toBeTruthy();
  });
});
describe("getUploadToS3Url", () => {
  it("should expose a function", () => {
    expect(getUploadToS3Url).toBeDefined();
  });

  it("getUploadToS3Url should return expected output", () => {
    const retValue = getUploadToS3Url();
    expect(retValue).toBe("FinancialsURL/extraction/UploadPdf");
    expect(retValue).toBeTruthy();
  });
});
describe("getSchedulePagesUrl", () => {
  it("should expose a function", () => {
    expect(getSchedulePagesUrl).toBeDefined();
  });

  it("getSchedulePagesUrl should return expected output", () => {
    const retValue = getSchedulePagesUrl("1");
    expect(retValue).toBe(
      "FinancialsURL/extraction/GetSchedulePages?docPath=1"
    );
    expect(retValue).toBeTruthy();
  });
});
