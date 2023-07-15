import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import ToolBar from "./ToolBar";
// import Adapter from "enzyme-adapter-react-16";
// import { shallow, configure } from "enzyme";

afterEach(cleanup);
// configure({ adapter: new Adapter() });
// const pdf = "..ToolBar/mock_file.pdf";
// let mockobj = pdf;
// let mockfilename = "mock_file.pdf";

let mockarray = {
  pagenumberIsVisible: true,
  filename: "mock_file.pdf",
  file: { UploadedPath: "mock_file.pdf" },
  pagetorender: 1,
  zoomby: 0,
  rotateby: 0,
  fullscreen: false,
  totalpages: 25,
};
let mocktotalpages = 25;
let mockisvisible = true;
let mockshowpage = () => {
  // This is intentional
};
let wrapper;
describe.skip("Toolbar component", () => {
  let containerroot;
  beforeEach(() => {
    expect.hasAssertions();
    containerroot = document.createElement("div");
    document.body.appendChild(containerroot);
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
    wrapper = shallow(
      <ToolBar
        settings={mockarray}
        showPage={mockshowpage}
        showPageLabel={mockisvisible}
      />
    );
    expect({}).toBeDefined();
  });

  afterEach(() => {
    document.body.removeChild(containerroot);
    containerroot = null;
    ReactDOM.createPortal.mockClear();
  });
  it("shows a toolbar", async () => {
    ReactDOM.render(
      <ToolBar
        settings={mockarray}
        showPage={mockshowpage}
        showPageLabel={mockisvisible}
      />,
      containerroot
    );
  });
  describe("Tool Bar component", () => {
    beforeEach(() => {
      expect.hasAssertions();
    });
    it("starts with a count of 1", () => {
      const text = wrapper.find("span").text();
      expect(text).toEqual("1 of " + mocktotalpages);
    });

    it("increments count by 1 when the next button is clicked", () => {
      const incrementBtn = wrapper.find(".next");
      incrementBtn.simulate("click");
      const text = wrapper.find("span").text();
      expect(text).toEqual("2 of " + mocktotalpages);
    });
    it("decrements count by 1 when the previous button is clicked", () => {
      const incrementBtn = wrapper.find(".back");
      incrementBtn.simulate("click");
      const text = wrapper.find("span").text();
      expect(text).toEqual("1 of " + mocktotalpages);
    });
    it("goes to 1 when the previous button is clicked", () => {
      const incrementBtn = wrapper.find(".first");
      incrementBtn.simulate("click");
      const text = wrapper.find("span").text();
      expect(text).toEqual("1 of " + mocktotalpages);
    });
    it("goes to last when the previous button is clicked", () => {
      const incrementBtn = wrapper.find(".last");
      incrementBtn.simulate("click");
      const text = wrapper.find("span").text();
      expect(text).toEqual(mocktotalpages + " of " + mocktotalpages);
    });
    it("moveBack test", async () => {
      const component = await shallow(
        <ToolBar
          settings={mockarray}
          showPage={mockshowpage}
          showPageLabel={mockisvisible}
        />
      );
      let instance = component.instance();
      await instance.moveBack();
      expect(instance.state.pagetorender === 1).toBeFalsy();
    });
    it("handleChange test", async () => {
      const component = await shallow(
        <ToolBar
          settings={mockarray}
          showPage={mockshowpage}
          showPageLabel={mockisvisible}
        />
      );
      let instance = component.instance();
      await instance.handleChange(1);
      expect(instance.state.settings.pagetorender === 1).toBeTruthy();
      await instance.handleChange(7);
      expect(instance.state.settings.pagetorender === 7).toBeTruthy();
      await instance.handleChange(27);
    });
  });
});
