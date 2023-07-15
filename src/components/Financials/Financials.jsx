import React, { useEffect, useState } from "react";
import UploadDataFile from "../../assets/UploadDataFile";
import { Button, Card } from "@maknowledgeservices/neptune";
import "./Financials.css";
import PdfViewerLoader from "../PdfViewer/PdfViewerLoader/PdfViewerLoader";
import UploadPdf from "./UploadPdf/UploadPdf";
import { useDispatch, useSelector } from "react-redux";
import { FINANCIALS } from "../../Store/actions/constants";
import InputScreen from "./Input/InputScreen";
import OutputScreen from "../Output/OutputScreen";
import PropTypes from "prop-types";
import * as BL from "./FinancialsBL";

const Financials = ({ bond }) => {
  const {
    pdf,
    activePage,
    disableExtractBtn,
    showExtractedPage,
    ISFinData,
    BSFinData,
    CFFinData,
    uploadedFileData,
    userInputs,
  } = useSelector((state) => state.Financials);
  const dispatch = useDispatch();
  const [isExtract, setIsExtract] = useState(false);
  useEffect(() => {
    dispatch({ type: FINANCIALS.SET_ACTIVE_BOND, payload: bond });
  }, [pdf]);
  useEffect(() => {
    if (
      isExtract &&
      ISFinData !== undefined &&
      BSFinData !== undefined &&
      CFFinData !== undefined
    )
      dispatch({
        type: FINANCIALS.SHOW_OUTPUT_SCREEN,
        payload: true,
      });
  }, [ISFinData, BSFinData, CFFinData]);

  const handleDiscardClick = () => {
    dispatch({ type: FINANCIALS.SHOW_OUTPUT_SCREEN, payload: false });
    dispatch({ type: FINANCIALS.RESET_PDF_SELECTION, payload: undefined });
  };
  const handleExtractClick = () => {
    const tableRegion = [
      {
        table_name: "",
        coordinate: {
          x1: 0.0,
          y1: 0.0,
          x2: 0.0,
          y2: 0.0,
          width: 0.0,
          height: 0.0,
          pageNum: 0.0,
        },
      },
    ];
    if (Object.keys(uploadedFileData).length > 0) {
      dispatch({
        type: FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_IS,
        payload: {
          key: uploadedFileData.alexKey,
          table_name: "IS",
          page_num: BL.getPageNumbers(userInputs["IS"]),
          table_region: tableRegion,
        },
      });
      dispatch({
        type: FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_BS,
        payload: {
          key: uploadedFileData.alexKey,
          table_name: "BS",
          page_num: BL.getPageNumbers(userInputs["BS"]),
          table_region: tableRegion,
        },
      });
      dispatch({
        type: FINANCIALS.EXTRACT_FINANCIAL_FROM_ALEXANDRIA_CF,
        payload: {
          key: uploadedFileData.alexKey,
          table_name: "CF",
          page_num: BL.getPageNumbers(userInputs["CF"]),
          table_region: tableRegion,
        },
      });

      setIsExtract(true);
    }
  };

  return (
    <>
      {showExtractedPage ? (
        <OutputScreen />
      ) : (
        <Card style={{ borderRadius: "0px" }}>
          <Card.Body>
            <div style={{ display: "flex" }}>
              <Card
                className={`fin-card-container ${
                  pdf ? "fin-card-header-70" : ""
                }`}
              >
                <Card.Body>
                  <div>
                    {" "}
                    {pdf ? (
                      <PdfViewerLoader
                        isRequired={true}
                        filename={pdf?.name}
                        pdfFile={pdf}
                        // settings={this.props.settings}
                        showPageLabel={true}
                        fromIdentifier={true}
                        pdfModalView={false}
                        activePage={activePage}
                        dispatch={dispatch}
                      />
                    ) : (
                      <div className="fin-uploadbtn-main-container">
                        <div className="fin-uploadbtn-container">
                          <UploadDataFile />
                          <div className="fin-main">
                            Upload financial data by clicking on the button
                            below
                          </div>
                          <div>
                            <Button
                              onClick={() => {
                                dispatch({
                                  type: FINANCIALS.SHOW_UPLOAD_PDF,
                                  payload: true,
                                });
                              }}
                              outline
                              type="primary"
                              className="fin-uploadbtn"
                            >
                              Upload Files
                            </Button>
                          </div>
                          <UploadPdf />
                          {/* setUploadedFileData={setUploadedFileData} */}
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
              {pdf && <InputScreen />}
            </div>
          </Card.Body>
          <Card.Footer className="fin-footer">
            <Button type="secondary" onClick={() => handleDiscardClick()}>
              Discard
            </Button>
            <Button
              type="primary"
              disabled={disableExtractBtn}
              onClick={handleExtractClick}
            >
              Extract
            </Button>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};
export default Financials;

Financials.defaultProps = { bond: {} };
Financials.propTypes = { bond: PropTypes.object };
