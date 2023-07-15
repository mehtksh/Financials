import { Http } from "..";
import { API } from "../API_Store";
jest.mock("..");

test("getFilesScanned", async () => {
  let mockedRes = [
    {
      date: "2023-05-23T15:14:59.798Z",
      name: "chart1.png",
      uploaded: true,
      scanned: true,
      infected: false,
      deleted: true,
    },
  ];
  Http.FormDataPost = jest.fn(() => Promise.resolve(mockedRes));
  const actual = await API.getFilesScanned(new FormData());
  expect(actual[0].scanned).toBeTruthy();
  expect(actual[0].infected).toBeFalsy();
});
