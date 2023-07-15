import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Spin } from "@maknowledgeservices/neptune";
import PdfToolbar from "../../PdfViewer/PdfToolbar/PdfToolbar";
import ViewerPanel from "../../PdfViewer/ViewerPanel/ViewerPanel";
import Ribbon from "../../PdfViewer/Ribbon/Ribbon";
import "./../PdfViewerContainer/PdfViewerContainer.css";
import "./PdfViewerLoader.css";
import { FaTimes } from "react-icons/fa";
import { FINANCIALS } from "../../../Store/actions/constants";
class PdfViewerLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfDoc: null,
      scale: 1,
      currentPage: 1,
      totalPages: 1,
      isPdfLoading: true,
      pdfErrorMessage: null,
      rectSelect: true,
      modalVisible: false,
      isSelected: false,
      canvas: {},
      annotationsList: [],
      pageAnnotations: [],
      count: 0,
      isOk: false,
      pageIsRendering: false,
    };
    this.viewer = React.createRef();
    this.toolbar = React.createRef();
    this.pdfLoader = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ pdfHeader: this.pdfLoader });
    this.loadPdfviewer();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.docLink !== this.props.docLink) {
      this.setState({ pdfErrorMessage: null, isPdfLoading: true });
      this.loadPdfviewer();
    } else if (
      prevState.pdfDoc === null ||
      prevState.pdfErrorMessage !== null
    ) {
      this.toolbar.current.setState({ currentPage: "" });
    }
    if (
      this.props.activePage &&
      prevProps.activePage !== this.props.activePage
    ) {
      this.setpage(this.props.activePage);
    }
  };

  async loadPdfviewer() {
    await this.initilizePdfLib();
    let pdf64BaseData;

    pdf64BaseData = await this.readFile(this.props.pdfFile).catch(
      (readError) => {
        this.updateError(readError);
      }
    );

    if (pdf64BaseData) {
      let loadingTask = this.pdfjsLib.getDocument({ data: pdf64BaseData });
      await loadingTask.promise.then(
        (doc) => {
          this.setState({ pdfDoc: doc, totalPages: doc.numPages });
          this.props.dispatch({
            type: FINANCIALS.SET_TOTALPAGES_OF_PDF,
            payload: doc.numPages,
          });
          this.viewer.current.setState({ doc });
          this.toolbar.current.setState({
            totalPages: doc.numPages,
            currentPage: 1,
          });
          this.setState({ isPdfLoading: false, pdfErrorMessage: null });
          this.forceUpdate();
          if (this.props.setTotalPages) this.props.setTotalPages(doc.numPages);
        },
        (reason) => {
          this.updateError(reason);
        }
      );
    } else {
      this.updateError(` returned coded value: ${pdf64BaseData}`);
    }
  }

  readFile = (fileobj) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(fileobj);
    });
  };

  updateError(reason) {
    // APIErrorResonseValidation(reason);
    this.setState({
      isPdfLoading: false,
      pdfErrorMessage: `Unable to display PDF. Try Again \n OR Please try opening using URL`,
    });
    this.forceUpdate();
  }

  async initilizePdfLib() {
    if (this.viewer.current !== null)
      this.viewer.current.setState({ doc: null });
    if (this.pdfjsLib === undefined || this.pdfjsLib === null)
      this.pdfjsLib = await import("pdfjs-dist");
    if (this.pdfjsWorker === undefined || this.pdfjsWorker === null)
      this.pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
    if (
      (this.pdfjsLib !== undefined || this.pdfjsLib !== null) &&
      (this.pdfjsWorker !== undefined || this.pdfjsWorker !== null)
    )
      this.pdfjsLib.GlobalWorkerOptions.workerSrc = this.pdfjsWorker;
  }

  zoomIn() {
    this.viewer.current.PdfViewer.currentScale = this.state.scale * 1.1;
    this.setState({
      scale: this.state.scale * 1.1,
    });
  }

  zoomOut() {
    this.viewer.current.PdfViewer.currentScale = this.state.scale / 1.1;
    this.setState({
      scale: this.state.scale / 1.1,
    });
  }

  preview() {
    this.setState({ modalVisible: true });
  }

  handelNextPage() {
    var crntPg = this.viewer.current.PdfViewer.currentPageNumber;
    if (crntPg < this.viewer.current.PdfViewer.pagesCount) {
      this.setpage(crntPg + 1);
    }
  }

  handelPreviousPage() {
    var crntPg = this.viewer.current.PdfViewer.currentPageNumber;
    if (crntPg > 1) {
      this.setpage(crntPg - 1);
    }
  }

  handelFirstPage() {
    var crntPg = this.viewer.current.PdfViewer.currentPageNumber;
    if (crntPg > 1) {
      this.setpage(1);
    }
  }

  handelLastPage() {
    var crntPg = this.viewer.current.PdfViewer.currentPageNumber;
    if (crntPg < this.viewer.current.PdfViewer.pagesCount) {
      this.setpage(this.viewer.current.PdfViewer.pagesCount);
    }
  }

  handelSetPage(e) {
    this.setpage(e);
  }

  setpage(e) {
    if (
      e >= 1 &&
      this.viewer.current !== null &&
      e <= this.viewer.current.PdfViewer.pagesCount
    ) {
      let setPg = parseInt(e);
      if (!isNaN(setPg)) {
        this.viewer.current.PdfViewer.currentPageNumber = setPg;
        this.toolbar.current.setState({ currentPage: setPg });
        // this.setAnnotations(this.state.pdfDoc);
      }
    }
  }

  handleChange = (id) => {
    document.getElementById(id).checked = true;
  };
  userSelectedPageNumber = (pageNumbers, data) => {
    this.props.userSelectedPageNumber(pageNumbers, data, this.props.docLink);
  };

  handelTextSearch(e) {
    this.viewer.current.findText(e);
  }

  handelSearchNextMatch(e, isPreviousFind) {
    this.viewer.current.findNextMatch(e, isPreviousFind);
  }

  onFindCountUpdate(searchEvent) {
    this.toolbar.current.setState({
      currentSearchWord: searchEvent.matchesCount.current,
      totalSearchWords: searchEvent.matchesCount.total,
    });
  }

  scrollPageChange(pageChangEvent) {
    var page = pageChangEvent.pageNumber;
    this.toolbar.current.setState({ currentPage: page });
  }

  rotate(clickEvent) {
    let crntPage = this.viewer.current.PdfViewer.currentPageNumber;
    this.viewer.current.PdfViewer.pagesRotation += 90;
    this.viewer.current.PdfViewer.currentPageNumber = crntPage;
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  clearTableselect = () => {
    this.props.handleCancel();
  };

  getRibbonClass = (fromIdentifier, pdfModalView) => {
    if (fromIdentifier) {
      return pdfModalView ? "ribbon ribbon-modal" : "ribbon ribbon-identifier";
    } else {
      return pdfModalView ? "ribbon ribbon-modal" : "ribbon-fde";
    }
  };
  render = () => {
    let { fromIdentifier, pdfModalView, isFindataPage, spreaderType } =
      this.props;

    let ribbonClass = this.getRibbonClass(fromIdentifier, pdfModalView);
    const loader = (
      <Spin // name="acuity"
        name="default"
        color="#021155"
      />
    );

    return (
      <>
        <div
          className={
            fromIdentifier ? "pdfViewer_identifier" : "pdfViewer__right--column"
          }
        >
          <PdfToolbar
            ref={this.toolbar}
            onSetPageTo={(e) => this.handelSetPage(e)}
            onTextSearch={(e) => this.handelTextSearch(e)}
            onNextMatch={(e, isPrev) => this.handelSearchNextMatch(e, isPrev)}
            onNextpage={() => this.handelNextPage()}
            onPreviouspage={() => this.handelPreviousPage()}
            onFirstpage={() => this.handelFirstPage()}
            onLastpage={() => this.handelLastPage()}
            isPdfLoading={this.state.isPdfLoading}
            pdfError={this.state.pdfErrorMessage}
            fromIdentifier={fromIdentifier}
            spreaderType={spreaderType}
            isRequired={this.props.isRequired}
          />
          {this.state.isPdfLoading ? (
            <div className="pdfViewer--loader">{loader}</div>
          ) : (
            ""
          )}

          {this.state.isOk ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
              <div>
                <span> fetching annotations...</span>
              </div>
            </div>
          ) : (
            ""
          )}

          {this.state.pdfErrorMessage === null ? null : (
            <div className="error font--bold">{this.state.pdfErrorMessage}</div>
          )}
          <div
            className={
              fromIdentifier
                ? "pdfViewer_main_container identifier_container"
                : "pdfViewer_main_container"
            }
            style={{
              display:
                this.state.pdfErrorMessage === null &&
                !this.state.isPdfLoading &&
                !this.state.isOk
                  ? "flex"
                  : "none",
            }}
          >
            <ViewerPanel
              isRequired={this.props.isRequired}
              ref={this.viewer}
              onScaleChanged={(e) => this.displayScaleChanged(e)}
              onScrollPageChange={(e) => this.scrollPageChange(e)}
              onFindCountChange={(e) => this.onFindCountUpdate(e)}
              pdfFile={this.props.pdfFile}
              isFindataPage={isFindataPage}
              fromIdentifier={fromIdentifier}
              scale={this.state.scale}
              settings={this.props.settings}
              spreaderType={this.props.spreaderType}
              enableBTRMultiTableSelect={this.props.enableBTRMultiTableSelect}
            ></ViewerPanel>
            {this.props.isRequired && (
              <Ribbon
                pdfModalView={pdfModalView}
                modalVisible={this.state.modalVisible}
                ribbonClass={ribbonClass}
                zoomInView={() => this.zoomIn()}
                rotateView={(e) => this.rotate(e)}
                zoomOutView={() => this.zoomOut()}
                previewView={() => this.preview()}
                hideModal={this.hideModal}
              />
            )}
          </div>
        </div>
        <Modal
          file={this.props.pdfFile}
          title={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {this.props.filename}{" "}
              <FaTimes
                className="icon-Clear clear-position"
                onClick={this.hideModal}
              ></FaTimes>
            </div>
          }
          companyDetails={this.props.companyDetails}
          className="pdfviewer-modal"
          visible={this.state.modalVisible}
          maskCloseAble={true}
        >
          <i className="icon-Clear clear-position" onClick={this.hideModal}></i>
          <PdfViewerLoader
            filename={this.props.filename}
            pdfFile={this.props.pdfFile}
            settings={this.props.settings}
            showPageLabel={true}
            fromIdentifier={true}
            pdfModalView={this.state.modalVisible}
            spreaderType={spreaderType}
          />
        </Modal>
      </>
    );
  };
}

export default PdfViewerLoader;

PdfViewerLoader.propTypes = {
  pdfFile: PropTypes.object,
  docLink: PropTypes.string,
  userSelectedPageNumber: PropTypes.func,
  pageNumber: PropTypes.any,
  settings: PropTypes.array,
  isFindataPage: PropTypes.bool,
  companyDetails: PropTypes.object,
  pdfModalView: PropTypes.bool,
  fromIdentifier: PropTypes.bool,
  filename: PropTypes.any,
  getAnnotations: PropTypes.func,
  setPageAnnotations: PropTypes.func,
  spreaderType: PropTypes.string,
  setTotalPages: PropTypes.func,
  showStickyInfo: PropTypes.func,
  enableBTRMultiTableSelect: PropTypes.bool,
  isConfirmed: PropTypes.func,
  handleCancel: PropTypes.func,
  activePage: PropTypes.any,
  dispatch: PropTypes.func,
  isRequired: PropTypes.bool,
};

PdfViewerLoader.defaultProps = {
  settings: [
    {
      file: null,
      filename: "mock_file.pdf",
      totalpages: 0,
      pagetorender: "",
      zoomby: 0,
      rotateby: 0,
      fullscreen: false,
      pagenumberIsVisible: true,
    },
  ],
  companyDetails: { cik: 0, ticker: "", name: "" },
  isFindataPage: false,
  pdfModalView: false,
  fromIdentifier: false,
  getAnnotations: () => {
    // This is intentional
  },
  setPageAnnotations: () => {
    // This is intentional
  },
  setTotalPages: () => {},
  showStickyInfo: () => {},
  enableBTRMultiTableSelect: false,
  isConfirmed: () => {},
  handleCancel: () => {},
  dispatch: () => {},
  activePage: undefined,
  isRequired: true,
};
