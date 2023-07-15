import { API } from "../../../Rest_API_Directory/API_Store";
import { FINANCIALS } from "../../../Store/actions/constants";
import { CheckFilesInfected } from "../../../services/FilesServices";
import * as BL from "./UploadPdfBL";
jest.mock("../../../Rest_API_Directory/API_Store");

describe("upload pdf files testcases", () => {
  let dispatch = jest.fn();
  let setPdfFile = jest.fn();
  let setErrorMsg = jest.fn();
  let setProcessing = jest.fn();

  test("hideModalForm", () => {
    BL.hideModalForm(dispatch, setPdfFile, setErrorMsg, setProcessing);
    expect(dispatch).toHaveBeenCalledWith({
      type: FINANCIALS.SHOW_UPLOAD_PDF,
      payload: false,
    });
    expect(setPdfFile).toHaveBeenCalledWith(undefined);
    expect(setErrorMsg).toHaveBeenCalledWith("");
    expect(setProcessing).toHaveBeenCalledWith(false);
  });

  test("select file successfully", async () => {
    let file = {
      size: 123,
      type: "application/pdf",
    };
    let options = {
      file,
    };
    let data = [
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
    await BL.onSelectFile(options, setPdfFile, setErrorMsg);
    expect(setPdfFile).toHaveBeenCalledWith(file);
    expect(setErrorMsg).toHaveBeenCalledWith("");
  });

  test("select file size error", async () => {
    let file = {
      size: 53477377,
      type: "application/pdf",
    };
    let options = {
      file,
    };

    await BL.onSelectFile(options, setPdfFile, setErrorMsg);
    expect(setPdfFile).toHaveBeenCalledWith(file);
    expect(setErrorMsg).toHaveBeenCalledWith(
      "File size should not exceed 50MBs"
    );
  });

  test("select file type error", async () => {
    let file = {
      size: 123,
      type: "csv/excel",
    };
    let options = {
      file,
    };

    await BL.onSelectFile(options, setPdfFile, setErrorMsg);
    expect(setPdfFile).toHaveBeenCalledWith(file);
    expect(setErrorMsg).toHaveBeenCalledWith("Please select PDF file only");
  });

  test("selected file is infected", async () => {
    let file = {
      size: 123,
      type: "application/pdf",
    };
    let options = {
      file,
    };
    let data = [
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
    await BL.onSelectFile(options, setPdfFile, setErrorMsg);
    expect(setPdfFile).toHaveBeenCalledWith(file);
    expect(setErrorMsg).toHaveBeenCalledWith("The selected file is corrupt");
  });

  test("clearFile", () => {
    BL.clearFile(setPdfFile, setErrorMsg);
    expect(setPdfFile).toHaveBeenCalledWith(undefined);
    expect(setErrorMsg).toHaveBeenCalledWith("");
  });
});
