import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Ribbon/Ribbon.css";
import { Tooltip } from "@maknowledgeservices/neptune";
import { FaExpand, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi";
class Ribbon extends Component {
  render = () => {
    let { ribbonClass } = this.props;
    return (
      <div className={`${ribbonClass} ${"ribbon-zoomin"}`}>
        <Tooltip
          tip="Zoom-In"
          position="top"
          trigger="hover"
          style={{
            backgroundColor: "var(--neutral-gray-05)",
            color: "var(--neutral-gray-60)",
            whiteSpace: "nowrap",
          }}
        >
          <div className="ribbon-item item-1" onClick={this.props.zoomInView}>
            <FaSearchPlus
              style={{ color: "var(--primary-blue-78)" }}
              data-testid="zoomin"
            />
          </div>
        </Tooltip>
        <Tooltip
          tip="Zoom-Out"
          position="top"
          trigger="hover"
          style={{
            backgroundColor: "var(--neutral-gray-05)",
            color: "var(--neutral-gray-60)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className="ribbon-item item-3 ribbon-icons"
            onClick={this.props.zoomOutView}
          >
            <FaSearchMinus
              style={{ color: "var(--primary-blue-78)" }}
              data-testid="zoomout"
            />
          </div>
        </Tooltip>
        <Tooltip
          tip="Rotate"
          position="top"
          trigger="hover"
          style={{
            backgroundColor: "var(--neutral-gray-05)",
            color: "var(--neutral-gray-60)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className="ribbon-item item-2 ribbon-icons"
            style={{ transform: "scaleX(-1)" }}
            onClick={this.props.rotateView}
          >
            <FiRotateCcw style={{ color: "var(--primary-blue-78)" }} />
          </div>
        </Tooltip>
        {!this.props.pdfModalView ? (
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
            {" "}
            <div
              className="ribbon-item item-4 ribbon-icons"
              onClick={this.props.previewView}
            >
              <FaExpand style={{ color: "var(--primary-blue-78)" }} />
            </div>
          </Tooltip>
        ) : (
          // <div className="ribbon-item item-4" onClick={this.props.hideModal}>
          //   <BiExitFullscreen  />
          // </div>
          <></>
        )}
      </div>
    );
  };
}

export default Ribbon;

Ribbon.defaultProps = {
  pdfModalView: false,
  modalVisible: false,
  ribbonClass: false,
  zoomInView: () => {
    // This is intentional
  },
  zoomOutView: () => {
    // This is intentional
  },
  previewView: () => {
    // This is intentional
  },
  hideModal: () => {
    // This is intentional
  },
  rotateView: () => {
    // This is intentional
  },
};

Ribbon.propTypes = {
  pdfModalView: PropTypes.bool,
  modalVisible: PropTypes.bool,
  ribbonClass: PropTypes.bool,
  zoomInView: PropTypes.func,
  zoomOutView: PropTypes.func,
  previewView: PropTypes.func,
  hideModal: PropTypes.func,
  rotateView: PropTypes.func,
};
