import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  PDFViewer,
  EventBus,
  PDFLinkService,
  PDFFindController,
} from "pdfjs-dist/web/pdf_viewer.js";
import "pdfjs-dist/web/pdf_viewer.css";

class ViewerPanel extends Component {
  constructor(props) {
    super(props);
    this.initEventBus();
    this.state = {
      doc: null,
      scale: undefined,
      rect: {},
    };
    this.isFinding = false;
  }

  initEventBus() {
    let eventBus = new EventBus();
    eventBus.on("pagesinit", (e) => {
      this.setState({
        scale: this.PdfViewer.currentScale,
      });
      if (this.props.onInit) {
        this.props.onInit({});
      }
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({ scale: this.state.scale });
      }
    });
    eventBus.on("scalechange", (e) => {
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({ scale: e.scale });
      }
    });
    eventBus.on("updatetextlayermatches", (e) => {
      this.isFinding = true;
      this.scrollFoundToView();
    });
    eventBus.on("updatefindmatchescount", (e) => {
      this.props.onFindCountChange(e);
    });
    eventBus.on("pagechanging", (e) => {
      this.props.onScrollPageChange(e);
    });
    eventBus.on("pagerendered", (e) => {
      if (this.isFinding) {
        this.scrollFoundToView();
      }
    });
    eventBus.on("updatefindcontrolstate", (e) => {
      this.props.onFindCountChange(e);
      //Can be used for getting the search found status (enum FindState)
    });
    this._eventBus = eventBus;
  }

  scrollFoundToView() {
    let matchedEle = document.getElementsByClassName("highlight selected");
    if (matchedEle.length > 0) {
      matchedEle[0].scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
      this.isFinding = false;
    }
  }

  componentDidMount() {
    this.linkservice = new PDFLinkService({
      eventBus: this._eventBus,
      externalLinkTarget: 2,
    });
    this.pdfFindService = new PDFFindController({
      linkService: this.linkservice,
      eventBus: this._eventBus,
    });
    let viewerContainer = ReactDOM.findDOMNode(this);
    this.PdfViewer = new PDFViewer({
      container: viewerContainer,
      eventBus: this._eventBus,
      linkService: this.linkservice,
      findController: this.pdfFindService,
    });
    this.linkservice.setViewer(this.PdfViewer);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc) {
      this.PdfViewer.setDocument(nextState.doc);
      this.pdfFindService.setDocument(nextState.doc);
      this.linkservice.setDocument(nextState.doc);
    }
    if (this.state.scale !== nextState.scale) {
      this.PdfViewer.currentScale = nextState.scale;
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.state?.doc !== nextState?.doc ||
  //     this.state?.scale !== nextState?.scale
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  findText(searchText) {
    if (searchText && searchText.trim().length > 1) {
      this.pdfFindService.executeCommand("find", {
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: true,
        query: searchText,
      });
    } else {
      this.pdfFindService._pageMatches = [];
      // this.pdfFindService._updateAllPages();
    }
  }

  findNextMatch = (searchText, isPreviousFind = false) => {
    if (searchText && searchText.trim().length > 1) {
      this.pdfFindService.executeCommand("findagain", {
        caseSensitive: false,
        findPrevious: isPreviousFind,
        highlightAll: true,
        phraseSearch: true,
        query: searchText,
      });
    }
  };

  getClassName = () =>
    this.props.isRequired ? "viewerpanel" : "out-viewerpanel";
  render() {
    let { fromIdentifier } = this.props;

    return this.props.enableBTRMultiTableSelect ? (
      <div
        className={
          fromIdentifier
            ? "viewerpanel-Btr panel-identifier-Btr"
            : this.getClassName()
        }
      >
        <div className="pdfViewer"></div>
      </div>
    ) : (
      <div
        className={
          fromIdentifier ? "viewerpanel panel-identifier" : this.getClassName()
        }
      >
        <div className="pdfViewer"></div>
      </div>
    );
  }
}

ViewerPanel.defaultProps = {
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
  fromIdentifier: false,
  enableBTRMultiTableSelect: false,
  isRequired: true,
};

ViewerPanel.propTypes = {
  onInit: PropTypes.func,
  onScaleChanged: PropTypes.func,
  onScrollPageChange: PropTypes.func,
  onFindCountChange: PropTypes.func,
  settings: PropTypes.array,
  fromIdentifier: PropTypes.bool,
  enableBTRMultiTableSelect: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default ViewerPanel;
