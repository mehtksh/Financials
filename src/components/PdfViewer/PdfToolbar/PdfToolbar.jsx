import React, { Component } from "react";
import { Input } from "@maknowledgeservices/neptune";
import PropTypes from "prop-types";
import "./PdfToolbar.css";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

class PdfToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "",
      totalPages: "",
      searchText: "",
      showSearchButtons: false,
      currentSearchWord: "",
      totalSearchWords: 0,
      currentSearchIndex: 1,
      tablesSelected: true,
      count: 0,
    };
    this.pageNum = "";
  }

  componentDidUpdate = () => {
    var relatedEle = document.getElementsByClassName(
      "nep-input nep-input-bottom-border pageInput"
    );
    if (relatedEle?.length > 0) {
      for (let idx = 0; idx < relatedEle.length; idx++) {
        relatedEle.item(idx).classList.remove("pageInputError");
      }
    }
  };

  navigateFirstPage() {
    if (this.props.onFirstpage) {
      this.pageNumEdit(1);
      this.props.onFirstpage();
    }
  }

  navigateLastPage() {
    if (this.props.onLastpage) {
      this.pageNumEdit(this.state.totalPages);
      this.props.onLastpage();
    }
  }

  previousPage() {
    if (this.props.onPreviouspage) {
      this.pageNumEdit(this.state.currentPage - 1);
      this.props.onPreviouspage();
    }
  }

  nextPage() {
    if (this.props.onNextpage) {
      this.pageNumEdit(this.state.currentPage + 1);
      this.props.onNextpage();
    }
  }

  pageNumEdit(pageNum) {
    var relatedEle = document.getElementsByClassName(
      "nep-input nep-input-bottom-border pageInput"
    );
    if (relatedEle?.length > 0) {
      if (
        pageNum !== "" &&
        relatedEle.length > 0 &&
        (pageNum < 1 || pageNum > this.state.totalPages)
      ) {
        for (let idx = 0; idx < relatedEle.length; idx++) {
          relatedEle.item(idx).classList.add("pageInputError");
        }
      } else {
        for (let idx = 0; idx < relatedEle.length; idx++) {
          relatedEle.item(idx).classList.remove("pageInputError");
        }
      }
    }
  }

  onPageChange(pageNum) {
    if (!isNaN(pageNum)) {
      if (pageNum >= 1 && pageNum <= this.state.totalPages) {
        this.setState({ currentPage: pageNum });
      }
      this.props.onSetPageTo(pageNum);
    }
  }

  onSearchChange(text) {
    if (text !== "" && text.length > 1 && !this.state.showSearchButtons) {
      this.setState({ showSearchButtons: true, currentSearchIndex: 1 });
    } else if (text === "") {
      this.setState({
        showSearchButtons: false,
        totalSearchWords: 0,
        currentSearchIndex: 1,
      });
    }
    this.setState({ searchText: text });
    this.props.onTextSearch(text, true);
  }

  onSearchNextMatch(text) {
    this.props.onNextMatch(text, false);
    let { currentSearchIndex, totalSearchWords } = this.state;
    if (currentSearchIndex < totalSearchWords) {
      ++currentSearchIndex;
    } else {
      currentSearchIndex = 1;
    }
    this.setState({ currentSearchIndex });
  }

  onSearchPreviousMatch(text) {
    this.props.onNextMatch(text, true);
    let { currentSearchIndex, totalSearchWords } = this.state;
    if (currentSearchIndex > 1) {
      --currentSearchIndex;
    } else {
      currentSearchIndex = totalSearchWords;
    }
    this.setState({ currentSearchIndex });
  }

  onClearSearch() {
    this.setState({ searchText: "", showSearchButtons: false });
    this.props.onTextSearch("", true);
  }
  render() {
    let { fromIdentifier } = this.props;
    return (
      <div className="flex-row-align-centre">
        <div
          className={`pdfViewer__Toolbar ${
            fromIdentifier ? "schedule_toolBar" : ""
          }`}
        >
          <div className="pdfViewer__Toolbar_Child">
            <div style={{ width: "100%", display: "flex", height: "3rem" }}>
              <div
                className={`${
                  this.props.isRequired ? "search-box" : "output-search"
                }`}
              >
                <Input.Group className="search_Textbox">
                  <Input
                    placeholder="Search"
                    size="small"
                    value={this.state.searchText}
                    onChange={(e) => this.onSearchChange(e)}
                    onEnterPress={(e) => this.onSearchNextMatch(e)}
                    clearable
                  />
                  <FiSearch style={{ margin: "auto" }} />
                </Input.Group>
              </div>
              <div
                className={`${
                  this.props.isRequired ? "search-next" : "output-next"
                }`}
              >
                <FaChevronLeft
                  style={{ width: "9px", height: "14px" }}
                  data-testid="previousSearch"
                  className="icon-Single-chevro-left search_buttons"
                  onClick={() =>
                    this.onSearchPreviousMatch(this.state.searchText)
                  }
                  disabled={this.state.totalSearchWords === 0 ? true : false}
                />
              </div>
              <div
                className={`${
                  this.props.isRequired ? "search-next" : "output-next"
                }`}
                style={{
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                <FaChevronRight
                  style={{ width: "9px", height: "14px" }}
                  data-testid="nextSearch"
                  className="icon-Single-chevron-right search_buttons"
                  onClick={() => this.onSearchNextMatch(this.state.searchText)}
                  disabled={this.state.totalSearchWords === 0 ? true : false}
                />
              </div>
              {this.state.totalSearchWords !== 0 && (
                <div
                  style={{
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "7px",
                  }}
                >
                  {this.state.currentSearchIndex} of{" "}
                  {this.state.totalSearchWords}
                </div>
              )}
              <div style={{ flex: 1 }}></div>
              {this.props.isRequired && (
                <div width={1 / 5} className="pdfViewer__Toolbar_pageOf">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ cursor: "pointer" }}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingRight: "8px",
                        }}
                        data-testid="previouspage"
                        onClick={() => this.previousPage()}
                        disabled={
                          this.state.currentPage === 1 ||
                          this.state.currentPage === ""
                            ? true
                            : false
                        }
                      >
                        <FaChevronLeft
                          style={{ width: "12px", height: "12px" }}
                        />
                      </span>
                    </div>
                    <Input
                      type="number"
                      value={this.state.currentPage}
                      defaultValue="1"
                      onChange={(e) => this.pageNumEdit(e)}
                      className="pageInput"
                      placeholder="Pg"
                      onEnterPress={(e) => this.onPageChange(e)}
                      min={1}
                      max={this.state.totalPages}
                    />
                    / {this.state.totalPages}
                    <div>
                      <span
                        data-testid="nextpage"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => this.nextPage()}
                        disabled={
                          this.state.currentPage === this.state.totalPages ||
                          this.state.currentPage === ""
                            ? true
                            : false
                        }
                      >
                        <FaChevronRight
                          style={{ width: "12px", height: "12px" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PdfToolbar.propTypes = {
  onZoomOut: PropTypes.func,
  onZoomIn: PropTypes.func,
  onNextpage: PropTypes.func,
  onPreviouspage: PropTypes.func,
  onFirstpage: PropTypes.func,
  onLastpage: PropTypes.func,
  onSetPageTo: PropTypes.func,
  onTextSearch: PropTypes.func,
  onNextMatch: PropTypes.func,
  isPdfLoading: PropTypes.bool,
  pdfError: PropTypes.string,
  fromIdentifier: PropTypes.bool,
  onSelectTable: PropTypes.func,
  spreaderType: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default PdfToolbar;
