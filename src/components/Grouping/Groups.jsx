import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "@maknowledgeservices/neptune";
import { useDispatch, useSelector } from "react-redux";
import NoEntries from "../../assets/NoEntries";
import * as BL from "./GroupsBL";
import {
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaRegTrashAlt,
  FaRegMinusSquare,
} from "react-icons/fa";
import MathFunction from "../../assets/MathFunction";
import MathFunctionRed from "../../assets/MathFunctionRed";
import MathFunctionSelected from "../../assets/MathFunctionSelected";

const initialState = {
  editGroupIndex: -1,
  editedGroupName: "",
};

const Groups = () => {
  const [state, setState] = useState(initialState);
  const [activeAccordian, setActiveAccordian] = useState(0);
  const dispatch = useDispatch();
  const {
    groupList,
    openGroupsPopUp,
    selectedLineItems,
    lineItems,
    hideLineItemTab,
    allLineItems,
    isGroupNameDuplicate,
  } = useSelector((groupState) => groupState.GroupsReducer);
  const { selectedGroupIndex } = useSelector(
    (groupState) => groupState.FormulaeReducer
  );

  useEffect(() => {
    setState(initialState);
  }, [openGroupsPopUp]);

  useEffect(() => {}, [selectedLineItems]);

  let getAccordianClass = (isActiveAccordian, index) => {
    let strClassName = isActiveAccordian
      ? "group-card-header groups-active-accordian-header"
      : "group-card-header";
    strClassName +=
      isGroupNameDuplicate && index === state.editGroupIndex
        ? " formula-name-duplicate-error-msg"
        : "";
    return strClassName;
  };

  let getFormulaIcon = (group, index) => {
    let icon = <MathFunction className="groups-icon" />;
    if (group.isInvalid) icon = <MathFunctionRed className="groups-icon" />;
    else if (selectedGroupIndex === index && hideLineItemTab)
      icon = <MathFunctionSelected className="groups-icon" />;

    return icon;
  };

  let getIconAreaClassName = (group, index) => {
    let className = "groups-icon-area ";
    if (group.isInvalid) className += "groups-error-formula-icon";
    else if (selectedGroupIndex === index && hideLineItemTab)
      className += "groups-selected-formula-icon";

    return className;
  };

  return (
    <>
      <Card className="fin-groups-card">
        <Card.Header className="group-groups-header">
          {hideLineItemTab ? "Groups & Line Items" : "Groups"}
          {!hideLineItemTab ? (
            <Button
              onClick={() => {
                BL.addGroup(dispatch, groupList);
              }}
              type="secondary"
              data-testid="create-group"
            >
              Create Group
            </Button>
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Body
          className={groupList.length > 0 ? "" : "groups-no-entries"}
          style={{ padding: "0px", overflow: "auto" }}
        >
          {groupList.length > 0 ? (
            <Card.Accordion
              defaultActive={0}
              onChange={(value) => {
                setActiveAccordian(value);
              }}
            >
              {groupList.map((item, index) => {
                return (
                  <Card style={{ borderTop: "0px" }}>
                    <div
                      className={
                        selectedLineItems.length > 0
                          ? "fin-groups-selection"
                          : ""
                      }
                      onClick={() => {
                        BL.onClickGroup(
                          dispatch,
                          index,
                          selectedLineItems,
                          groupList,
                          lineItems,
                          allLineItems,
                          hideLineItemTab
                        );
                      }}
                    >
                      <Card.Header
                        className={getAccordianClass(
                          activeAccordian === index,
                          index
                        )}
                      >
                        {state.editGroupIndex === index ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ width: "100%" }}>
                                <Input
                                  value={item.name}
                                  onChange={(grpName) => {
                                    BL.onChangeGroupName(
                                      state,
                                      setState,
                                      grpName,
                                      groupList,
                                      dispatch
                                    );
                                  }}
                                  className={
                                    isGroupNameDuplicate
                                      ? "mb-input-error"
                                      : "group-input"
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: "1rem",
                                }}
                              >
                                <span
                                  className="groups-icon-area"
                                  onClick={() => {
                                    BL.onClickCancelGroupName(state, setState);
                                  }}
                                >
                                  <FaTimesCircle className="groups-cancel-icon" />
                                </span>
                                <span
                                  className="groups-icon-area"
                                  onClick={() => {
                                    if (!isGroupNameDuplicate) {
                                      BL.onClickSaveGroupName(
                                        state,
                                        setState,
                                        dispatch,
                                        groupList,
                                        index
                                      );
                                    }
                                  }}
                                >
                                  <FaCheckCircle className="groups-check-icon" />
                                </span>
                              </div>
                            </div>

                            {isGroupNameDuplicate ? (
                              <small
                                style={{
                                  color: "var(--negative-red-100)",
                                  marginTop: "0.25rem",
                                }}
                              >
                                Group name should be unique
                              </small>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <>
                            <div style={{ width: "100%" }}> {item.name} </div>

                            <div
                              onClick={(e) => {
                                // e.preventDefault();
                                e.stopPropagation();
                                BL.showFormula(
                                  dispatch,
                                  allLineItems,
                                  groupList,
                                  index,
                                  false
                                );
                              }}
                              className={getIconAreaClassName(item, index)}
                              data-testid="fx-icon"
                              style={{ marginRight: "0.25rem" }}
                            >
                              {getFormulaIcon(item, index)}
                            </div>
                            {!hideLineItemTab ? (
                              <>
                                <div
                                  className="groups-icon-area"
                                  onClick={() => {
                                    BL.onClickEditButton(
                                      state,
                                      setState,
                                      index,
                                      item,
                                      dispatch
                                    );
                                  }}
                                  data-testid="edit-group"
                                >
                                  <FaPen className="groups-icon" />
                                </div>

                                <div
                                  className="groups-icon-area groups-delete-icon-area"
                                  onClick={() => {
                                    BL.onClickDeleteGroup(
                                      dispatch,
                                      groupList,
                                      item,
                                      lineItems,
                                      index
                                    );
                                  }}
                                  data-testid="delete-group"
                                >
                                  <FaRegTrashAlt className="groups-icon" />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </Card.Header>
                    </div>
                    <Card.Body style={{ padding: "0px" }}>
                      {item.lineItemList.map((lineItem) => {
                        return (
                          <>
                            <div className="fin-groups-data">
                              {lineItem.lineitem_text}
                              {!hideLineItemTab ? (
                                <span
                                  onClick={() => {
                                    BL.onClickRemoveLineItem(
                                      dispatch,
                                      index,
                                      groupList,
                                      lineItem,
                                      lineItems
                                    );
                                  }}
                                  className="groups-removing-line-item"
                                >
                                  <div>
                                    <FaRegMinusSquare />
                                  </div>
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </Card.Body>
                  </Card>
                );
              })}
            </Card.Accordion>
          ) : (
            <>
              <NoEntries />
              <span style={{ paddingTop: "1rem" }}>
                Group line items by creating groups{" "}
              </span>
              <span style={{ paddingTop: "0.5rem" }}>
                & adding line items in them
              </span>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Groups;
