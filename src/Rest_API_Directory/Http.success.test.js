import axios from "axios";
import { getCookieIdentifier, getToken } from "../utils/authHelper";
import { requestOptions, Get, Post, Put, Delete } from "./Http";

jest.mock("axios");
jest.mock("../utils/authHelper");
const url = "dummy.dummy";
const body = {};
axios.get.mockResolvedValue({ status: 200, message: "GET success" });
axios.post.mockResolvedValue({ status: 200, message: "POST success" });
axios.put.mockResolvedValue({ status: 200, message: "PUT success" });
axios.delete.mockResolvedValue({ status: 200, message: "DELETE success" });
getCookieIdentifier.mockReturnValue("dummy");
getToken.mockReturnValue("token");
describe("requestOptions", () => {
  it("should expose a function", () => {
    expect(requestOptions).toBeDefined();
  });

  it("requestOptions should return expected output", () => {
    const retValue = requestOptions();
    expect(retValue).toBeTruthy();
  });
});
describe("Get", () => {
  it("should expose a function", () => {
    expect(Get).toBeDefined();
  });

  it("Get should return expected output", async () => {
    const retValue = await Get(url);
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("GET success");
  });
});
describe("Post", () => {
  it("should expose a function", () => {
    expect(Post).toBeDefined();
  });

  it("Post should return expected output", async () => {
    const retValue = await Post(url, body);
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("POST success");
  });
});
describe("Put", () => {
  it("should expose a function", () => {
    expect(Put).toBeDefined();
  });

  it("Put should return expected output", async () => {
    const retValue = await Put(url, body);
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("PUT success");
  });
});
describe("Delete", () => {
  it("should expose a function", () => {
    expect(Delete).toBeDefined();
  });

  it("Delete should return expected output", async () => {
    const retValue = await Delete(url);
    expect(retValue).toBeTruthy();
    expect(retValue.status).toBe(200);
    expect(retValue.message).toBe("DELETE success");
  });
});
