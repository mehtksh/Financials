import React from "react";
import store from "../Store";
import Financials from "../components/Financials/Financials";
import { Provider } from "react-redux";
import { setConfig } from "../utils/authHelper";
import { PropTypes } from "prop-types";

let FinancialsWrapper = ({ bond, appConfig }) => {
  setConfig(appConfig);
  return (
    <Provider store={store}>
      <Financials bond={bond} />
    </Provider>
  );
};
export default FinancialsWrapper;
FinancialsWrapper.defaultProps = { appConfig: {}, bond: {} };
FinancialsWrapper.propTypes = {
  appConfig: PropTypes.object,
  bond: PropTypes.object,
};
