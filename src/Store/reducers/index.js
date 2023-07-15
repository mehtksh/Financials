import { combineReducers } from "redux";
import Financials from "./FinancialsReducer";
import GroupsReducer from "./GroupsReducer";
import FormulaeReducer from "./FormulaeReducer";

export default combineReducers({
  Financials,
  GroupsReducer,
  FormulaeReducer,
});
