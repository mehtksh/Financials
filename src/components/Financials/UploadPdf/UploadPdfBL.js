import { FINANCIALS } from "../../../Store/actions/constants";
import { CheckFilesInfected } from "../../../services/FilesServices";

export let hideModalForm = (
  dispatch,
  setPdfFile,
  setErrorMsg,
  setProcessing
) => {
  dispatch({ type: FINANCIALS.SHOW_UPLOAD_PDF, payload: false });
  setErrorMsg("");
  setPdfFile(undefined);
  setProcessing(false);
};

export let onSelectFile = async (options, setPdfFile, setErrorMsg) => {
  let { file } = options;
  let errorMsg = "";
  if (file.size > 53477376) {
    errorMsg = "File size should not exceed 50MBs";
  } else if (file.type !== "application/pdf") {
    errorMsg = "Please select PDF file only";
  } else {
    let isInfected = await CheckFilesInfected(file);
    if (isInfected) errorMsg = "The selected file is corrupt";
  }
  setErrorMsg(errorMsg);
  setPdfFile(file);
};

export let clearFile = (setPdfFile, setErrorMsg) => {
  setErrorMsg("");
  setPdfFile(undefined);
};

export let handleUploadClick = (dispatch, pdfFile, setProcessing) => {
  let data = new FormData();
  data.append("Document", pdfFile);
  dispatch({ type: FINANCIALS.UPLOAD_FILE_TO_S3, payload: data });
  setProcessing(true);
};
