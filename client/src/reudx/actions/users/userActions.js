import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_USER,
} from "./userActionTypes";
import apiClient from "../../../api/apiClient";

// Acción para iniciar la solicitud de usuarios
const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
// Acción para manejar el éxito de la solicitud de usuarios
const fetchUsersSuccess = (data) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data,
});
// Acción para manejar el fallo de la solicitud de usuarios
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error.message,
});

// Acción asincrónica para obtener usuarios
export const fetchUsers =
  (filters = {}) =>
  async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      // Simulamos un tiempo de espera de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const queryParams = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/users?${queryParams}`);
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error));
    } finally {
      dispatch({ type: "SET_LOADING_FALSE" });
    }
  };

// Set Current User
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
