import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import modalsReducer from "./modals/modalsReducer";

const rootReducer = combineReducers({
  users: userReducer,
  modals: modalsReducer,
});

export default rootReducer;
