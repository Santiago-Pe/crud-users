import { combineReducers } from "redux";
import userReducer from "./users/userReducer";

const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer;
