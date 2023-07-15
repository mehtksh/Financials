import renderer from "react-test-renderer";
import React, { Component } from "react";

import { Tooltip } from "@maknowledgeservices/neptune";
import { FaExpand, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi";
import Ribbon from "./Ribbon";

jest.mock("../Ribbon/Ribbon.css");
jest.mock("@maknowledgeservices/neptune");
jest.mock("react-icons/fa");
jest.mock("react-icons/fi");

const renderTree = (tree) => renderer.create(tree);
describe("<Ribbon>", () => {
  it("should render component", () => {
    expect(renderTree(<Ribbon />).toJSON()).toMatchSnapshot();
  });
  it("should render component with props", () => {
    expect(
      renderTree(
        <Ribbon
          pdfModalView={false}
          modalVisible={false}
          ribbonClass={false}
          zoomInView={jest.fn()}
          zoomOutView={jest.fn()}
          previewView={jest.fn()}
          hideModal={jest.fn()}
          rotateView={jest.fn()}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
