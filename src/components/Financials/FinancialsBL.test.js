import { getPageNumbers } from "./FinancialsBL";

describe("getPageNumbers", () => {
  test("should return an array with single page number", () => {
    const pageNumberString = "5";
    const result = getPageNumbers(pageNumberString);
    expect(result).toEqual([5]);
  });

  test("should return an array with multiple page numbers", () => {
    const pageNumberString = "2, 4, 6, 8";
    const result = getPageNumbers(pageNumberString);
    expect(result).toEqual([2, 4, 6, 8]);
  });

  test("should return an array with page range", () => {
    const pageNumberString = "3-7";
    const result = getPageNumbers(pageNumberString);
    expect(result).toEqual([3, 4, 5, 6, 7]);
  });

  test("should return an array with page range and single page numbers", () => {
    const pageNumberString = "1, 3-5, 9";
    const result = getPageNumbers(pageNumberString);
    expect(result).toEqual([1, 3, 4, 5, 9]);
  });

  test("should handle whitespace in the page number string", () => {
    const pageNumberString = " 2 ,  4  , 6 , 8 ";
    const result = getPageNumbers(pageNumberString);
    expect(result).toEqual([2, 4, 6, 8]);
  });
});
