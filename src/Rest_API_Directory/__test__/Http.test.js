import * as authHelper from "../../utils/authHelper";
import { Delete, FormDataPost, Get, Post, Put } from "../Http";
import axios from "axios";

jest.mock("../../utils/authHelper");
jest.mock("axios");
describe("tests for http", () => {
  authHelper.getCookieIdentifier = jest.fn(() => "user_bondshub");
  authHelper.getToken = jest.fn(() => "FDSKFKL2321KLNLKNASDFL");
  test("get success", async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: [] }));
    let actual = await Get("https://localhost:5004/sample/endpoint");
    expect(actual).toEqual({ data: [] });
  });

  test("put failure", async () => {
    axios.get = jest.fn(() => Promise.reject());
    let actual = await Get("https://localhost:5004/sample/endpoint");
    expect(actual).toBeUndefined();
  });

  test("post success", async () => {
    axios.post = jest.fn(() => Promise.resolve({ data: [] }));
    let actual = await Post("https://localhost:5004/sample/endpoint", {});
    expect(actual).toEqual({ data: [] });
  });

  test("post failure", async () => {
    axios.post = jest.fn(() => Promise.reject());
    let actual = await Post("https://localhost:5004/sample/endpoint", {});
    expect(actual).toBeUndefined();
  });

  test("put success", async () => {
    axios.put = jest.fn(() => Promise.resolve({ data: [] }));
    let actual = await Put("https://localhost:5004/sample/endpoint", {});
    expect(actual).toEqual({ data: [] });
  });

  test("put failure", async () => {
    axios.put = jest.fn(() => Promise.reject());
    let actual = await Put("https://localhost:5004/sample/endpoint", {});
    expect(actual).toBeUndefined();
  });

  test("delete success", async () => {
    axios.delete = jest.fn(() => Promise.resolve(true));
    let actual = await Delete("https://localhost:5004/sample/endpoint");
    expect(actual).toBeTruthy();
  });

  test("delete failure", async () => {
    axios.delete = jest.fn(() => Promise.reject());
    let actual = await Delete("https://localhost:5004/sample/endpoint");
    expect(actual).toBeUndefined();
  });

  test("delete failure2", async () => {
    axios.delete = jest.fn(() =>
      Promise.resolve({ response: { status: 401 } })
    );
    let actual = await Delete("https://localhost:5004/sample/endpoint");
    expect(actual.response.status).toEqual(401);
  });

  test("formdata post success", async () => {
    axios.post = jest.fn(() => Promise.resolve({ data: [] }));
    let actual = await FormDataPost(
      "https://localhost:5004/sample/endpoint",
      {}
    );
    expect(actual).toEqual({ data: [] });
  });

  test("formdata post failure", async () => {
    axios.post = jest.fn(() => Promise.reject());
    let actual = await FormDataPost(
      "https://localhost:5004/sample/endpoint",
      {}
    );
    expect(actual).toBeUndefined();
  });
});
