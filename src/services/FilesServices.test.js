import { CheckFilesInfected } from "./FilesServices";
import { API } from "../../src/Rest_API_Directory/API_Store";
jest.mock("../../src/Rest_API_Directory/API_Store");

describe("File services testcases", () => {
  const fileDetails = {
    name: "10-Q_2017-05-01.pdf",
    size: 394473,
    type: "application/pdf",
    lastModifiedDate: "2022-09-29T12:07:39.804Z",
  };

  beforeEach(() => {
    expect.hasAssertions();
  });

  test("File is not Infected", async () => {
    const data = [
      {
        date: "2023-01-12T07:38:58.417Z",
        name: "10-Q_2017-05-01.pdf",
        uploaded: true,
        scanned: true,
        infected: false,
        deleted: true,
      },
    ];
    API.getFilesScanned = jest.fn(() =>
      Promise.resolve({ status: 200, data: data })
    );
    let result = await CheckFilesInfected(fileDetails);
    expect(result).toBeFalsy();
  });

  test("file is infected", async () => {
    const data = [
      {
        date: "2023-01-12T07:38:58.417Z",
        name: "10-Q_2017-05-01.pdf",
        uploaded: true,
        scanned: true,
        infected: true,
        deleted: true,
      },
    ];
    API.getFilesScanned = jest.fn(() =>
      Promise.resolve({ status: 200, data: data })
    );
    let result = await CheckFilesInfected(fileDetails);
    expect(result).toBeTruthy();
  });
});
