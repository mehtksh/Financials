import React from "react";
import {
  Modal,
  Checkbox,
  CardGroup,
  Card,
  Button,
} from "@maknowledgeservices/neptune";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaTimes } from "react-icons/fa";
import * as BL from "./GroupFormulaPopupBL";
import Groups from "./Groups";
import Formulae from "./Formulae";

const GroupFormulaPopup = () => {
  const dispatch = useDispatch();
  const {
    openGroupsPopUp,
    selectedLineItems,
    lineItems,
    hideLineItemTab,
    groupList,
    isGroupNameDuplicate,
    activeTab,
  } = useSelector((state) => state.GroupsReducer);

  let financialState = useSelector((state) => state.Financials);
  let getHeaderEelement = () => {
    return (
      <>
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="fin-upload-title"
        >
          Groups & Formulae
        </div>
        <div
          onClick={() => {
            BL.hideModalForm(dispatch);
          }}
          className="fin-upload-titleclose"
        >
          <FaTimes
            className="fin-upload-crossicon"
            onClick={() => {
              BL.hideModalForm(dispatch);
            }}
            data-testid="close-group-popup"
          />
        </div>
      </>
    );
  };

  let renderFooter = () => {
    return (
      <div className="groups-formula-footer">
        <Button type="secondary">Reset</Button>
        <Button
          type="primary"
          onClick={() => {
            BL.savePreset(dispatch, groupList, activeTab, financialState);
            BL.hideModalFormAfterSave(dispatch, groupList, selectedLineItems);
          }}
          disabled={BL.disableSave(groupList) || isGroupNameDuplicate}
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <Modal
      visible={openGroupsPopUp}
      width={"calc(100vw - 187px)"}
      height={"calc(100vh - 157px)"}
      title={getHeaderEelement()}
      maskCloseAble={false}
      footer={renderFooter()}
    >
      <div style={{ display: "flex" }}>
        {hideLineItemTab ? (
          <div className="fin-groups-collapse-btn">
            <span className="fin-groups-expand-icon">
              <FaAngleDoubleRight
                onClick={() => {
                  BL.onClickExpandCollapseIcon(dispatch, false);
                }}
              />
            </span>
          </div>
        ) : (
          <Card className="fin-lineitem-card">
            <Card.Header className="group-lineitem-header">
              Line Items
            </Card.Header>
            <Card.Body className="fin-lineitem-body">
              <CardGroup style={{ height: "calc(100vh - 301px)" }}>
                {lineItems &&
                  lineItems.map((lineItem) => {
                    return (
                      <CardGroup.Item
                        style={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "none",
                          borderLeft: "none",
                        }}
                      >
                        <Checkbox
                          style={{ marginLeft: "1rem", marginRight: "1rem" }}
                          checked={BL.isChecked(selectedLineItems, lineItem)}
                          onChange={(value, checked) => {
                            BL.onChangeCheckBox(
                              dispatch,
                              selectedLineItems,
                              lineItem,
                              checked
                            );
                          }}
                        >
                          {" "}
                          {lineItem.lineitem_text}
                        </Checkbox>
                      </CardGroup.Item>
                    );
                  })}
              </CardGroup>
            </Card.Body>
          </Card>
        )}

        <Groups />
        {!hideLineItemTab ? (
          <div className="fin-groups-exapand-btn">
            <span
              className={
                selectedLineItems.length > 0
                  ? "groups-disable-collapse-icon fin-groups-expand-icon"
                  : "fin-groups-expand-icon"
              }
              onClick={() => {
                if (selectedLineItems.length === 0) {
                  BL.onClickExpandCollapseIcon(dispatch, true);
                }
              }}
            >
              <FaAngleDoubleLeft />
            </span>
          </div>
        ) : (
          <></>
        )}

        {hideLineItemTab ? <Formulae /> : <></>}
      </div>
    </Modal>
  );
};

export default GroupFormulaPopup;
