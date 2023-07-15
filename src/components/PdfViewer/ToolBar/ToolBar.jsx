import React, { Component } from "react";
import "./Toolbar.css";
import { Input, Button } from "@maknowledgeservices/neptune";
import PropTypes from "prop-types";

let _candisplaypagination = true;
let allow = false;
let localTrigger = false;
let currPage = 1;
let _totalpages = 0;
class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: JSON.parse(JSON.stringify(this.props.settings)),
      _disablenextstatus: false,
      _disableprevstatus: true,
    };
    _totalpages = this.state.settings.totalpages;
    _candisplaypagination = this.props.showPageLabel;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.settings.pagetorender === "" ||
      this.state.settings.pagetorender === ""
    ) {
      allow = false;
      return true;
    } else if (
      nextState.settings.pagetorender === this.state.settings.pagetorender &&
      0 === currPage
    ) {
      return false;
    }
    if (nextProps.settings.pagetorender !== this.props.settings.pagetorender) {
      allow = false;
      return true;
    } else if (
      nextProps.settings.pagetorender !== this.state.settings.pagetorender &&
      !localTrigger
    ) {
      allow = true;
      return true;
    } else if (localTrigger) {
      localTrigger = false;
      allow = false;
      return true;
    } else {
      allow = false;
      return false;
    }
  }
  componentDidUpdate = () => {
    let { settings } = this.state;
    if (settings.pagetorender !== currPage) {
      settings.pagetorender = currPage;
      this.setState({ settings });
    }
  };

  //move to next page
  moveNext = () => {
    let pagetorender = currPage;

    localTrigger = true;
    if (parseInt(pagetorender) !== parseInt(_totalpages)) {
      this.setState({
        settings: { pagetorender: parseInt(pagetorender) + 1 },
      });
      this.props.showPage(parseInt(pagetorender) + 1);
    }
  };

  moveBack = () => {
    let pagetorender = currPage;
    localTrigger = true;
    if (parseInt(pagetorender) !== 1) {
      this.setState({
        settings: { pagetorender: parseInt(pagetorender) - 1 },
      });
      this.props.showPage(parseInt(pagetorender) - 1);
    }
  };

  movetoLast = () => {
    let pagetorender = currPage;
    localTrigger = true;
    if (parseInt(pagetorender) !== parseInt(_totalpages)) {
      this.setState({
        settings: { pagetorender: _totalpages },
      });
      this.props.showPage(_totalpages);
    }
  };

  movetoFirst = () => {
    localTrigger = true;
    this.setState({
      settings: { pagetorender: 1 },
    });
    this.props.showPage(1);
  };

  disablePrevStatus = () => {
    let { pagetorender } = this.state.settings;
    if (pagetorender === 1 || pagetorender === 0) {
      return true;
    }
    return false;
  };
  disableNextStatus = () => {
    let { pagetorender } = this.state.settings;
    if (pagetorender === _totalpages) {
      return true;
    }
    return false;
  };

  handleChange = (target) => {
    if (target === "" || target === undefined || isNaN(target)) {
      if (target === "") currPage = 0;
      this.setState({
        settings: { pagetorender: "" },
      });
      localTrigger = true;
      return;
    } else if (parseInt(target) <= 0) {
      this.setState({
        settings: { pagetorender: 1 },
      });
      this.movetoFirst();
      return;
    } else if (parseInt(target) > parseInt(_totalpages)) {
      this.movetoLast();
      return;
    } else {
      this.setState({
        settings: { pagetorender: parseInt(target) },
      });
      localTrigger = true;
      this.props.showPage(parseInt(target));
    }
  };
  render() {
    let pagetorender = this.state.settings.pagetorender;
    if (
      allow &&
      this.state.settings !== undefined &&
      pagetorender !== undefined &&
      pagetorender !== ""
    ) {
      pagetorender = this.props.settings.pagetorender;
    }
    pagetorender =
      pagetorender === undefined || pagetorender.length === 0
        ? 1
        : pagetorender;
    if (pagetorender.toString().indexOf(",") >= 0) {
      pagetorender = pagetorender.toString().replace(";", ",").replace(" ", "");
      pagetorender = pagetorender.split(",");
      pagetorender = Number(pagetorender[0]);
    }
    if (pagetorender !== "") {
      currPage = pagetorender;
      this.props.showPage(parseInt(pagetorender));
    }
    return (
      <div
        className={
          _candisplaypagination
            ? "toolbar-container"
            : "toolbar-container no-left-border"
        }
      >
        <div className="grid-item-search">
          <Input.Group inputstyle="outlined">
            <Input inputstyle="outlined" placeholder="search text" />
            <i className="grid-item-img icon-Search"></i>
          </Input.Group>
        </div>

        {_candisplaypagination ? (
          <div className="grid-item-2">
            <span className="centre-aligned">
              {currPage + " of " + _totalpages}
            </span>
          </div>
        ) : (
          <div></div>
        )}

        <div className="grid-item-3">
          <Button
            type="link"
            disabled={this.disablePrevStatus() || pagetorender <= 1}
            className={
              _candisplaypagination
                ? "grid-item-pagination grid-button-pagination-length first-button first"
                : "grid-item-pagination grid-button-pagination-length first"
            }
            onClick={this.movetoFirst}
          >
            <i className="grid-item-img icon-First-page"></i>
          </Button>

          <Button
            type="link"
            disabled={this.disablePrevStatus() || pagetorender <= 1}
            className="grid-item-pagination grid-button-pagination-length back"
            onClick={this.moveBack}
          >
            <i className="grid-item-img  icon-Single-chevro-left"></i>
          </Button>
          <div className="grid-item-pagination-search">
            <Input.Number
              size="large"
              min={0}
              max={_totalpages}
              digits={0}
              inputstyle="outlined"
              value={pagetorender}
              placeholder={1}
              onChange={this.handleChange.bind(this)}
            />
          </div>

          <Button
            type="link"
            disabled={this.disableNextStatus() || pagetorender >= _totalpages}
            className="grid-item-pagination grid-button-pagination-length first-button next"
            onClick={this.moveNext}
          >
            <i className="grid-item-img icon-Single-chevron-right"></i>
          </Button>

          <Button
            type="link"
            disabled={this.disableNextStatus() || pagetorender >= _totalpages}
            className="grid-item-pagination grid-button-pagination-length last-botton last"
            onClick={this.movetoLast}
          >
            <i className="grid-item-img icon-Last-page"></i>
          </Button>
        </div>
      </div>
    );
  }
}

export default ToolBar;
ToolBar.defaultProps = {
  settings: {
    file: null,
    filename: "",
    totalpages: 0,
    pagetorender: 1,
    zoomby: 0,
    rotateby: 0,
    fullscreen: false,
    pagenumberIsVisible: true,
  },
};
ToolBar.propTypes = {
  settings: PropTypes.object,
  showPageLabel: PropTypes.bool,
  showPage: PropTypes.func,
};
