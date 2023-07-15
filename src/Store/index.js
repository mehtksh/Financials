import { legacy_createStore as createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
