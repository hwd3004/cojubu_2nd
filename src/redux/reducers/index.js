import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import autReducer from "./authReducer";

// connected-react-router를 사용한 connectRouter를 일단 간단하게 router로 명명함
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: autReducer,
  });

export default createRootReducer;
