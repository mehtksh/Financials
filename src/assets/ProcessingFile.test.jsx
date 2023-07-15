import renderer from "react-test-renderer";
import React from "react";
import Icon from "./ProcessingFile";

const renderTree = (tree) => renderer.create(tree);
describe("<Icon>", () => {
  it("should render component", () => {
    expect(renderTree(<Icon />).toJSON()).toMatchSnapshot();
  });
});
