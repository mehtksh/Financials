import React, { useEffect } from "react";
import { Card } from "@maknowledgeservices/neptune";
import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import OpenBracket from "../../assets/OpenBracket";
import CloseBracket from "../../assets/CloseBracket";
import * as BL from "./FormulaeBL";
import { useDispatch, useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import "./Formula.css";

const Formulae = () => {
  const KeyCodes = {
    enter: 13,
    tab: 9,
  };
  const delimiters = [KeyCodes.enter, KeyCodes.tab];
  const dispatch = useDispatch();
  let operators = ["(", "+", "-", "*", "/", ")"];
  let { tags, suggestions, selectedGroup, selectedGroupIndex, isReadOnly } =
    useSelector((state) => state.FormulaeReducer);
  const { groupList, allLineItems } = useSelector(
    (groupState) => groupState.GroupsReducer
  );
  useEffect(() => {}, [suggestions]);
  useEffect(() => {}, [selectedGroup]);
  useEffect(() => {
    BL.constructFormulaByTags(
      dispatch,
      tags,
      allLineItems,
      groupList,
      selectedGroupIndex,
      selectedGroup
    );
  }, [tags]);
  return (
    <Card className="fin-formula-card">
      <Card.Header className="fin-formula-card-header">Formulae</Card.Header>
      <Card.Body style={{ padding: "0px" }}>
        <div className="fin-groups-operators">
          Available Operators :
          <div className="fin-formula-icon-main">
            <span className="fin-formula-operator-icons">
              <OpenBracket />
            </span>
            <span className="fin-formula-operator-icons">
              <CloseBracket />
            </span>
            <span className="fin-formula-operator-icons">
              <FaDivide />
            </span>
            <span className="fin-formula-operator-icons">
              <FaTimes />
            </span>
            <span className="fin-formula-operator-icons">
              <FaPlus />
            </span>
            <span className="fin-formula-operator-icons">
              <FaMinus />
            </span>
          </div>
        </div>
        {selectedGroup ? (
          <>
            <div className="formula-selected-group">{selectedGroup.name}:</div>
            <div
              className={
                selectedGroup.isInvalid
                  ? "formula-section mb-error"
                  : "formula-section"
              }
            >
              <ReactTags
                className="fin-formula"
                minQueryLength={1}
                allowUnique={false}
                tags={tags}
                handleFilterSuggestions={(e) => {
                  return BL.handleFilterSuggestions(e, suggestions);
                }}
                readOnly={isReadOnly}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={(deletedIndex) => {
                  BL.handleDelete(dispatch, tags, deletedIndex);
                }}
                handleAddition={(selectedTag) => {
                  BL.handleAddition(
                    dispatch,
                    selectedTag,
                    tags,
                    suggestions,
                    operators
                  );
                }}
                handleDrag={(draggedTag, currPos, newPos) => {
                  BL.handleDrag(dispatch, tags, draggedTag, currPos, newPos);
                }}
                placeholder=""
                renderSuggestion={({ text }) => <div>{text}</div>}
              />
              {selectedGroup.isInvalid ? (
                <small style={{ color: "#ff5e6c" }}>Formula has an error</small>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="fin-groups-formula-blank-state">
              <span style={{ paddingTop: "1rem" }}>
                Select a group to create formulae for it
              </span>
              <span style={{ paddingTop: "0.5rem" }}>
                by clicking on the f(x) icon
              </span>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
export default Formulae;
