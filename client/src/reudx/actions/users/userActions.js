import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_USER,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./userActionTypes";
import api from "../../api"; // Asegúrate de tener configurado el api.js para realizar las peticiones

// Fetch Users
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await api.get("/users");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};

// Set Current User
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// Create User
export const createUser = (user) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await api.post("/users", user);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
  }
};

// Update User
export const updateUser = (user) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.put(`/users/${user.id}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    await api.delete(`/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};
