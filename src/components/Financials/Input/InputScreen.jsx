import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Tabs,
} from "@maknowledgeservices/neptune";
import { useSelector, useDispatch } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import * as BL from "./InputScreenBL";

const InputScreen = () => {
  const [formData, setFormData] = useState({});
  let { pageData, totalPages, userInputs } = useSelector(
    (state) => state.Financials
  );
  const frequencyData = ["ANL", "HYL", "QTR"];
  const [errorData, setErrorData] = useState({ stmntName: "", errorMsg: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageData) {
      let newFormData = userInputs;
      for (let page of pageData) {
        newFormData[page.scheduleName] = page.pageNumber;
      }
      setFormData(newFormData);
    }
  }, []);

  useEffect(() => {
    BL.disableExtractBtn(formData, dispatch, errorData.errorMsg);
  }, [errorData, JSON.stringify(formData)]);

  return (
    <Card className={`fin-card-container fin-card-header-30`}>
      <Tabs shape="button" defaultActive={0}>
        <Tabs.Panel tab="Financials">
          <Card.Body style={{ padding: "1rem" }}>
            <Form value={formData} labelAlign="top">
              <Form.Item label="Income Statement Page Range">
                <Input
                  style={{ width: "100%" }}
                  name="IS"
                  placeholder="Enter income statement page range"
                  onChange={(d) => {
                    setFormData({ ...formData, IS: d });
                    BL.handleFocus(d, dispatch, totalPages, setErrorData, "IS");
                  }}
                  onClick={(d) => {
                    BL.handleClick(d, dispatch, totalPages, setErrorData, "IS");
                  }}
                  className={
                    errorData.stmntName === "IS" &&
                    errorData.errorMsg.length > 0
                      ? "mb-input-error"
                      : ""
                  }
                />
                {errorData.stmntName === "IS" &&
                errorData.errorMsg.length > 0 ? (
                  <small style={{ color: "#ff5e6c" }}>
                    {errorData.errorMsg}
                  </small>
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item label="Balance Sheet Page Range">
                <Input
                  style={{ width: "100%" }}
                  name="BS"
                  placeholder="Enter balance sheet page range"
                  onChange={(d) => {
                    setFormData({ ...formData, BS: d });
                    BL.handleFocus(d, dispatch, totalPages, setErrorData, "BS");
                  }}
                  onClick={(d) => {
                    BL.handleClick(d, dispatch, totalPages, setErrorData, "BS");
                  }}
                  className={
                    errorData.stmntName === "BS" &&
                    errorData.errorMsg.length > 0
                      ? "mb-input-error"
                      : ""
                  }
                />
                {errorData.stmntName === "BS" &&
                errorData.errorMsg.length > 0 ? (
                  <small style={{ color: "#ff5e6c" }}>
                    {errorData.errorMsg}
                  </small>
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item label="Cash Flow Statement Page Range">
                <Input
                  style={{ width: "100%" }}
                  name="CF"
                  placeholder="Enter cash flow statement page range"
                  onChange={(d) => {
                    setFormData({ ...formData, CF: d });
                    BL.handleFocus(d, dispatch, totalPages, setErrorData, "CF");
                  }}
                  onClick={(d) => {
                    BL.handleClick(d, dispatch, totalPages, setErrorData, "CF");
                  }}
                  className={
                    errorData.stmntName === "CF" &&
                    errorData.errorMsg.length > 0
                      ? "mb-input-error"
                      : ""
                  }
                />
                {errorData.stmntName === "CF" &&
                errorData.errorMsg.length > 0 ? (
                  <small style={{ color: "#ff5e6c" }}>
                    {errorData.errorMsg}
                  </small>
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item label="Frequency">
                <Select
                  name="frequency"
                  keygen
                  style={{ width: "100%" }}
                  clearable
                  data={frequencyData}
                  placeholder="Select frequency"
                  onChange={(d) => {
                    setFormData({ ...formData, frequency: d });
                  }}
                />
              </Form.Item>
              <Form.Item label="Period End Date">
                <div style={{ position: "relative" }}>
                  <DatePicker
                    type="date"
                    format={"dd-MMM-yyyy"}
                    placeholder="Select latest period date"
                    style={{ width: "100%" }}
                    min={new Date("01-01-2010")}
                    max={Date.now()}
                    name="periodDate"
                    onChange={(d) => {
                      setFormData({ ...formData, periodDate: d });
                      BL.onChangePeriodData(d, setErrorData);
                    }}
                    className={
                      errorData.stmntName === "PERIODDATE" &&
                      errorData.errorMsg.length > 0
                        ? "mb-input-error"
                        : ""
                    }
                  />
                  {errorData.stmntName === "PERIODDATE" &&
                  errorData.errorMsg.length > 0 ? (
                    <small style={{ color: "#ff5e6c" }}>
                      {errorData.errorMsg}
                    </small>
                  ) : (
                    <></>
                  )}
                </div>
              </Form.Item>
            </Form>

            <div style={{ display: "flex" }}>
              <span
                style={{ height: "16px", width: "16px", marginRight: "0.5rem" }}
              >
                <FaInfoCircle
                  style={{ color: "var(--informational-blue-90" }}
                />
              </span>
              <span
                style={{ color: "var(--neutral-gray-60)", letterSpacing: "0" }}
              >
                While entering statement page numbers, you can use “-“ to select
                a continuous range of pages or you can use”,” for selecting
                multiple pages in non- continuation. Example - 4,5,6 or 4-6
              </span>
            </div>
          </Card.Body>
        </Tabs.Panel>
        <Tabs.Panel tab="Other KPIs">
          <span>coming soon.</span>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default InputScreen;
