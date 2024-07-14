import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  users: userReducer,
  // Otros reducers si es necesario
});

export default rootReducer;
