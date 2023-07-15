import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, Tooltip } from "@maknowledgeservices/neptune";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTimes,
  FaRegFilePdf,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import * as BL from "./UploadPdfBL";
import UploadDataFile from "../../../assets/UploadDataFile";
import ProcessingFile from "../../../assets/ProcessingFile";
import { FINANCIALS } from "../../../Store/actions/constants";

const UploadPdf = () => {
  const [pdfFile, setPdfFile] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const { showUploadPdfPopup, uploadedFileData, pageData } = useSelector(
    (state) => state.Financials
  );

  useEffect(() => {
    if (Object.keys(uploadedFileData).length > 0) {
      dispatch({
        type: FINANCIALS.GET_SCHEDULE_PAGES,
        payload: uploadedFileData,
      });
      // setUploadedFileData(uploadedFileData);
    }
  }, [uploadedFileData]);

  useEffect(() => {
    if (pageData.length > 0) {
      dispatch({
        type: FINANCIALS.GET_SCHEDULE_PAGES_COMPLETED,
        payload: pdfFile,
      });
    }
  }, [pageData]);

  let getHeaderEelement = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "middle",
          }}
          className="fin-upload-title"
        >
          Upload Financials
        </div>
        <div
          onClick={() => {
            BL.hideModalForm(dispatch, setPdfFile, setErrorMsg, setProcessing);
          }}
          className="fin-upload-titleclose"
        >
          <FaTimes className="fin-upload-crossicon-size" />
        </div>
      </>
    );
  };

  return (
    <Modal
      visible={showUploadPdfPopup}
      width={"49rem"}
      height={"22.125rem"}
      title={getHeaderEelement()}
      onClose={() => {
        BL.hideModalForm(dispatch, setPdfFile, setErrorMsg, setProcessing);
      }}
      maskCloseAble={false}
      className="fin-upload-popup"
    >
      <div>
        {processing ? (
          <>
            <div className="fin-upload-processcontent fin-upload-processimage">
              <ProcessingFile />
            </div>
            <div className="fin-upload-processcontent">
              Processing the uploaded file
            </div>
            <div className="fin-upload-loader">
              <div className="fin-upload-loaderbar"></div>
            </div>
          </>
        ) : (
          <>
            <div className="fin-upload-notemsg">
              Note: Supported file format is PDF and file size should not exceed
              50MB
            </div>
            <div className="fin-upload-status-container">
              <div>
                <UploadDataFile />
              </div>
              <div className="fin-upload-message">
                {pdfFile === undefined ? (
                  <> No file selected yet</>
                ) : (
                  <> File Selected</>
                )}
              </div>
            </div>
            <div className="fin-upload-footer">
              {pdfFile === undefined ? (
                <Upload
                  limit={1}
                  accept=".pdf"
                  request={(options) => {
                    BL.onSelectFile(options, setPdfFile, setErrorMsg);
                  }}
                >
                  <Button type="secondary">Browse</Button>
                </Upload>
              ) : (
                <div className="fin-upload-selectedfile-container">
                  <FaRegFilePdf className="fin-upload-pdficon" />

                  <span>{pdfFile?.name}</span>
                  <span className="fin-upload-lastbtns">
                    {errorMsg.length > 0 ? (
                      <Tooltip
                        tip={errorMsg}
                        position="top"
                        trigger="hover"
                        style={{
                          backgroundColor: "var(--neutral-gray-05)",
                          color: "var(--neutral-gray-60)",
                          minWidth: "11rem",
                          maxWidth: "20rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <FaExclamationCircle className="fin-upload-exlamatoryicon" />
                      </Tooltip>
                    ) : (
                      <FaCheckCircle className="fin-upload-checkicon" />
                    )}
                    <FaTimes
                      className="fin-upload-status-crossicon"
                      onClick={() => {
                        BL.clearFile(setPdfFile, setErrorMsg);
                      }}
                    />
                  </span>
                </div>
              )}
              <Button
                onClick={() =>
                  BL.handleUploadClick(dispatch, pdfFile, setProcessing)
                }
                type="primary"
                className="fin-upload-uploadbtn"
                disabled={pdfFile === undefined || errorMsg.length > 0}
              >
                {" "}
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UploadPdf;
