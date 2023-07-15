import React from "react";
import { render } from "@testing-library/react";
import ViewerPanel from "./ViewerPanel";

const onScaleChanged = jest.fn();
const onScrollPageChange = jest.fn();
const onFindCountChange = jest.fn();

it("pdf viewer loads", async () => {
  const ref = React.createRef();
  const viewer = render(
    <ViewerPanel
      ref={ref}
      onScaleChanged={onScaleChanged}
      onScrollPageChange={onScrollPageChange}
      onFindCountChange={onFindCountChange}
    />
  );
  expect(viewer).not.toBeNull();
});

it("initialising event bus", async () => {
  const ref = React.createRef();
  const viewer = render(
    <ViewerPanel
      ref={ref}
      onScaleChanged={onScaleChanged}
      onScrollPageChange={onScrollPageChange}
      onFindCountChange={onFindCountChange}
    />
  );
  expect(viewer).not.toBeNull();
  ref.current.initEventBus();
});

it("Finding the text in pdf", async () => {
  const ref = React.createRef();
  const viewer = render(
    <ViewerPanel
      ref={ref}
      onScaleChanged={onScaleChanged}
      onScrollPageChange={onScrollPageChange}
      onFindCountChange={onFindCountChange}
    />
  );
  expect(viewer).not.toBeNull();
  ref.current.findText("test");
});

it("Finding the text again in pdf", async () => {
  const ref = React.createRef();
  const viewer = render(
    <ViewerPanel
      ref={ref}
      onScaleChanged={onScaleChanged}
      onScrollPageChange={onScrollPageChange}
      onFindCountChange={onFindCountChange}
    />
  );
  expect(viewer).not.toBeNull();
  ref.current.findNextMatch("test");
});

it("Finding the text highlighted", async () => {
  const ref = React.createRef();
  const viewer = render(
    <ViewerPanel
      ref={ref}
      onScaleChanged={onScaleChanged}
      onScrollPageChange={onScrollPageChange}
      onFindCountChange={onFindCountChange}
    />
  );
  expect(viewer).not.toBeNull();
  ref.current.scrollFoundToView();
});
