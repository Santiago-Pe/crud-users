// src/redux/reducers/users/userReducer.js
import {
  FETCH_USERS_SUCCESS,
  SET_CURRENT_USER,
  SET_LOADING,
  SET_ERROR,
  SET_TOTAL_RECORD,
} from "../../actions/users/userActionTypes";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  total: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_TOTAL_RECORD:
      return {
        ...state,
        total: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
