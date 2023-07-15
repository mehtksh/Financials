import React from "react";
import OutputTable from "./OutputTable";
import createMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
jest.mock("@maknowledgeservices/neptune");
jest.mock("react-redux");
jest.mock("../../Store/actions/constants");
let finData = {
  companyname: "",
  cik: null,
  ticker: null,
  accession_num: "",
  acuity_id: "",
  formtype: "",
  filed_date: null,
  balancesheet_date: null,
  source_url: "PDF",
  process_date: "2023-06-15T11:46:10.328547",
  language: "en",
  extraction_accuracy: 100,
  country: null,
  key: "doc/upload/pdf/98a04607-8ec4-4c76-bb97-e79045e7eec0.pdf",
  table_name: "IS",
  merge: null,
  page_num: 102,
  table_region: [
    {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
    },
  ],
  app_name: "munibond",
  orientation: "vertical",
  header: [
    {
      col_num: 1,
      qtrs: 0,
      months: 0,
      col_text: "2019",
      asofdate: null,
      unit: "USD",
    },
    {
      col_num: 2,
      qtrs: 4,
      months: 12,
      col_text: "Year Ended September 30, 2018",
      asofdate: null,
      unit: "USD",
    },
    {
      col_num: 3,
      qtrs: 0,
      months: 0,
      col_text: "2017",
      asofdate: null,
      unit: "USD",
    },
  ],
  table: [
    {
      row_num: 1,
      lineitem_text: "(in millions, except per share data)",
      parent_text: "",
      page_num: 102,
      columns: [
        {
          col_num: 1,
          value: 2019,
          sign: "+",
        },
        {
          col_num: 2,
          value: 2018,
          sign: "+",
        },
        {
          col_num: 3,
          value: 2017,
          sign: "+",
        },
      ],
      row_bbox: [25.67, 143.26, 573.02, 155.93],
      is_header: false,
    },
    {
      row_num: 2,
      lineitem_text: "Net sales",
      parent_text: "",
      page_num: 102,
      columns: [
        {
          col_num: 1,
          value: 16526,
          sign: "+",
        },
        {
          col_num: 2,
          value: 17439,
          sign: "+",
        },
        {
          col_num: 3,
          value: 16213,
          sign: "+",
        },
      ],
      row_bbox: [25.67, 155.93, 573.02, 169.84],
      is_header: false,
    },
    {
      row_num: 7,
      lineitem_text: "Equity income (loss)",
      parent_text: "",
      page_num: 102,
      columns: [
        {
          col_num: 1,
          value: 275,
          sign: "+",
        },
        {
          col_num: 2,
          value: -13,
          sign: "-",
        },
        {
          col_num: 3,
          value: 522,
          sign: "+",
        },
      ],
      row_bbox: [25.67, 224.75, 573.02, 238.66],
      is_header: false,
    },
  ],
};
describe("<OutputTable>", () => {
  let store = null;
  beforeEach(() => {
    store = createMockStore({
      Financials: {
        showUploadPdfPopup: false,
        uploadedFileData: {},
        pageData: [],
        ISFinData: {},
        BSFinData: {},
        CFFinData: {},
      },
    });
  });
  it("should render component with props", async () => {
    await render(
      <Provider store={store}>
        <OutputTable finData={finData} searchCriteria={""} />
      </Provider>
    );
  });
});
