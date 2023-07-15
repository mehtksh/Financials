export let getPageNumbers = (pageNumberString) => {
  let pageNumberArray = [];
  let trimmedString = pageNumberString.split(" ").join("");
  let pageChunks = trimmedString.split(",");
  for (let index = 0; index < pageChunks.length; index++) {
    const element = pageChunks[index];
    if (element.indexOf("-") >= 0) {
      processPageRange(element, pageNumberArray);
    } else pageNumberArray.push(Number(element));
  }

  return pageNumberArray.length > 0 ? pageNumberArray : [Number(trimmedString)];
};

function processPageRange(trimmedString, pageNumberArray) {
  let pageNumbers = trimmedString.split("-");

  for (
    let start = Number(pageNumbers[0]);
    start <= Number(pageNumbers[1]);
    start++
  ) {
    pageNumberArray.push(start);
  }
}
