import React, { useEffect, useState } from "react";
import { Tabs, Button, Tooltip, Modal } from "@maknowledgeservices/neptune";
import "./Output.css";
import {
  FaChevronLeft,
  FaExpand,
  FaTimes,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaLayerGroup,
} from "react-icons/fa";
import OutputTable from "./OutputTable";
import PdfViewerLoader from "../PdfViewer/PdfViewerLoader/PdfViewerLoader";
import { useDispatch, useSelector } from "react-redux";
import { FINANCIALS } from "../../Store/actions/constants";
import SearchBox from "../../shared/SearchBox";
import GroupFormulaPopup from "../Grouping/GroupFormulaPopup";
import "../Grouping/Groups.css";
import * as BL from "./OutputScreenBL";

const OutputScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showExpandBtn, setShowExpandBtn] = useState(true);
  const [enlargePdf, setEnlargePdf] = useState(false);
  const { ISFinData, BSFinData, CFFinData } = useSelector(
    (state) => state.Financials
  );
  const [searchCriteria, setSearchCriteria] = React.useState("");
  const panelStyle = { backgroundColor: "white" };
  const renderPanel = (value) => {
    setActiveTab(value);
  };
  const searchItem = async (input) => {
    setSearchCriteria(input?.trim());
  };

  const { pdf, activePage } = useSelector((state) => state.Financials);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: FINANCIALS.SET_ACTIVE_BOND, payload: bond });
  }, [pdf]);
  const renderPanelDetails = () => {
    switch (activeTab) {
      case 0:
        return ISFinData?.page_num ? (
          <OutputTable
            finData={ISFinData}
            searchCriteria={searchCriteria}
            key="item-search-IS"
          />
        ) : (
          <>Unable to extract</>
        );
      case 1:
        return BSFinData?.page_num ? (
          <OutputTable
            finData={BSFinData}
            searchCriteria={searchCriteria}
            key="item-search-BS"
          />
        ) : (
          <>Unable to extract</>
        );
      case 2:
        return CFFinData?.page_num ? (
          <OutputTable
            finData={CFFinData}
            searchCriteria={searchCriteria}
            key="item-search-CF"
          />
        ) : (
          <>Unable to extract</>
        );
      default:
        return <>Coming Soon..</>;
    }
  };
  const handleBackClick = () => {
    dispatch({ type: FINANCIALS.SHOW_OUTPUT_SCREEN, payload: false });
  };
  return (
    <div>
      <Modal
        file={pdf}
        title={
          <div className="fin-output-modal">
            {pdf?.name}
            <FaTimes
              className="icon-Clear clear-position"
              onClick={() => {
                setEnlargePdf(false);
              }}
            ></FaTimes>
          </div>
        }
        className="pdfviewer-modal"
        visible={enlargePdf}
        maskCloseAble={true}
      >
        <i
          className="icon-Clear clear-position"
          onClick={() => {
            setEnlargePdf(false);
          }}
        ></i>
        <PdfViewerLoader
          filename={pdf?.name}
          pdfFile={pdf}
          showPageLabel={true}
          fromIdentifier={true}
          pdfModalView={enlargePdf}
        />
      </Modal>
      <div className="fin-main-card ">
        <div className="fin-output-header">
          <div className="fin-back-btn" onClick={() => handleBackClick()}>
            <FaChevronLeft style={{ marginBottom: "-1px" }} /> Back to Input
          </div>
          <Tabs
            shape="button"
            active={activeTab}
            onChange={renderPanel}
            defaultActive={0}
            style={panelStyle}
          >
            <Tabs.Panel tab="Income Statement"></Tabs.Panel>
            <Tabs.Panel tab="Balance Sheet"></Tabs.Panel>
            <Tabs.Panel tab="Cash Flow Statement"></Tabs.Panel>
            <Tabs.Panel tab="Other KPIs"></Tabs.Panel>
          </Tabs>
        </div>
        <div className="fin-output-body">
          <div
            className={
              showExpandBtn ? "fin-output-split-69" : "fin-output-split-99"
            }
          >
            {activeTab !== 3 ? (
              <div className="fin-group-btn">
                <SearchBox key="item-search" handleChange={searchItem} />
                <div className="fin-groups">
                  <Button
                    className="fin-groups-formula-btn"
                    type="secondary"
                    onClick={() => {
                      BL.onClickGroupAndFormula(
                        dispatch,
                        activeTab,
                        ISFinData,
                        BSFinData,
                        CFFinData
                      );
                    }}
                  >
                    <FaLayerGroup className="fin-groups-icon" /> Groups &
                    Formulae
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {renderPanelDetails()}
          </div>
          {showExpandBtn && (
            <>
              {" "}
              <div className="fin-collapse">
                <span
                  className="fin-collpase-icon"
                  onClick={() => {
                    setShowExpandBtn(false);
                  }}
                >
                  <FaAngleDoubleRight className="fin-expand-icon" />
                </span>
              </div>
              <div className="fin-output-split-30">
                <div className="fin-expand">
                  Uploaded File
                  <Tooltip
                    tip="Maximize"
                    position="top"
                    trigger="hover"
                    style={{
                      backgroundColor: "var(--neutral-gray-05)",
                      color: "var(--neutral-gray-60)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <FaExpand
                      onClick={() => {
                        setEnlargePdf(true);
                      }}
                      className="fin-output-expand"
                    />
                  </Tooltip>
                </div>
                <PdfViewerLoader
                  isRequired={false}
                  filename={pdf?.name}
                  pdfFile={pdf}
                  // settings={this.props.settings}
                  showPageLabel={true}
                  fromIdentifier={false}
                  pdfModalView={true}
                  activePage={activePage}
                  dispatch={dispatch}
                />
              </div>
            </>
          )}
          {!showExpandBtn && (
            <div className="fin-collapse">
              <span
                className="fin-collpase-icon"
                onClick={() => {
                  setShowExpandBtn(true);
                }}
              >
                <FaAngleDoubleLeft className="fin-expand-icon" />
              </span>
            </div>
          )}
        </div>
        <div className="fin-footer">
          <Button type="primary">Download</Button>
        </div>
      </div>

      <GroupFormulaPopup activeTab={activeTab} />
    </div>
  );
};
export default OutputScreen;
