import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_USER,
  SET_TOTAL_USER,
} from "../../actions/users/userActionTypes";

const initialState = {
  users: [],
  total: null,
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_TOTAL_USER:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};

export default userReducer;
