import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "@maknowledgeservices/neptune";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { FINANCIALS } from "../../Store/actions/constants";
import NoResultFound from "../../assets/NoEntries";

const OutputTable = ({ finData, searchCriteria }) => {
  const [eachData, setEachData] = useState(finData);
  let staticColumn = {
    title: "Line Item",
    render: "lineitem_text",
    width: "500px",
    fixed: "left",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (finData?.page_num) {
      dispatch({
        type: FINANCIALS.SET_ACTIVE_PAGE,
        payload: finData.page_num,
      });
    }
  }, [finData]);

  useEffect(() => {
    const tableObject = {
      ...finData,
      table: finData?.table?.filter((row) =>
        row?.lineitem_text.toLowerCase().includes(searchCriteria?.toLowerCase())
      ),
    };
    setEachData(tableObject);
  }, [searchCriteria]);

  let dynamicColumns = eachData?.header?.map((x, i) => {
    return {
      title: (
        <div>
          <Tooltip
            style={{
              backgroundColor: "var(--neutral-gray-05)",
              color: "var(--neutral-gray-60)",
              minWidth: "10rem",
              maxWidth: "15rem",
            }}
            tip={x.col_text}
            position="top"
          >
            <span className="tooltip-header">{x.col_text}</span>
          </Tooltip>
        </div>
      ),
      render: (d) => <>{i < d.columns.length ? d.columns[i].value : ""}</>,
      width: "300px",
    };
  });
  let columns = dynamicColumns
    ? [staticColumn, ...dynamicColumns]
    : [staticColumn];
  let width = dynamicColumns ? dynamicColumns.length * 300 + 500 : 500;

  return (
    <>
      <div style={{ height: "calc(100vh - 326px)" }}>
        {eachData?.table?.length > 0 ? (
          <Table
            rowsInView={0}
            fixed="both"
            bordered
            width={width}
            columns={columns}
            data={eachData.table}
          />
        ) : (
          <div
            className="noEntries"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: " calc(100vh - 20.5rem)",
            }}
          >
            <NoResultFound />

            <div style={{ margin: "1rem" }}>No search results to show.</div>
          </div>
        )}
      </div>
    </>
  );
};
export default OutputTable;

OutputTable.defaultProps = { finData: {} };
OutputTable.propTypes = {
  finData: PropTypes.object,
  searchCriteria: PropTypes.string,
};
