import React from "react";
import { Input, Tooltip } from "@maknowledgeservices/neptune";
import { MdSearch } from "react-icons/md";
import PropTypes from "prop-types";

const SearchBox = ({ handleChange, searchCriteria, placeholder = "" }) => {
  return (
    <div className="fin-search-input">
      <Input.Group
        //inputstyle="outlined"
        style={{
          width: placeholder === "" ? "34.5rem" : "13rem",
          display: "flex",
        }}
      >
        <Input
          value={searchCriteria}
          placeholder={placeholder === "" ? "Search" : placeholder}
          onChange={(d) => handleChange(d)}
          delay={600}
          clearable
        />
        <Tooltip
          tip="Search"
          position="bottom"
          style={{
            background: "#fff 0% 0% no-repeat padding-box",
            border: "1px solid #333333",
            borderRadius: "4px",
            color: "#333333",
            whiteSpace: "nowrap",
          }}
        >
          <i>
            <MdSearch style={{ fontSize: "24px", color: "grey" }} />
          </i>
        </Tooltip>
      </Input.Group>
    </div>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  handleChange: PropTypes.object,
  searchCriteria: PropTypes.string,
  placeholder: PropTypes.string,
};
