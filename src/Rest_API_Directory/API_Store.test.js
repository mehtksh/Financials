import * as APIEndpoint from "./API_Directory";
import { Http } from ".";
import { API } from "./API_Store";

jest.mock("./API_Directory");
jest.mock(".");

Http.Get.mockResolvedValue({ status: 200, message: "GET success" });
Http.Post.mockResolvedValue({ status: 200, message: "POST success" });
Http.Put.mockResolvedValue({ status: 200, message: "PUT success" });
Http.FormDataPost.mockResolvedValue({
  status: 200,
  message: "FormDataPost success",
});
Http.Delete.mockResolvedValue({ status: 200, message: "DELETE success" });

describe("getFilesScanned", () => {
  it("should expose a function", () => {
    expect(API.getFilesScanned).toBeDefined();
  });

  it("getFilesScanned should return expected output", async () => {
    const retValue = await API.getFilesScanned({});
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("FormDataPost success");
  });
});
describe("uploadFileToS3", () => {
  it("should expose a function", () => {
    expect(API.uploadFileToS3).toBeDefined();
  });

  it("uploadFileToS3 should return expected output", async () => {
    const retValue = await API.uploadFileToS3({});
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("FormDataPost success");
  });
});
describe("getSchedulePages", () => {
  it("should expose a function", () => {
    expect(API.getSchedulePages).toBeDefined();
  });

  it("getSchedulePages should return expected output", async () => {
    const retValue = await API.getSchedulePages({});
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("GET success");
  });
});
