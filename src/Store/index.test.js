import rootReducer from "./index";

describe("rootReducer", () => {
  test("should return rootreducer", () => {
    expect(rootReducer).not.toBe(undefined);
  });
});
