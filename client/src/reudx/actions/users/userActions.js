import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_USER,
  SET_TOTAL_USER,
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

// Acción para establecer el total de usuarios
const setTotalRecord = (total) => ({
  type: SET_TOTAL_USER,
  payload: total,
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
      const { data, headers } = response;
      const totalUsers = headers["x-total-count"];

      dispatch(fetchUsersSuccess(data));
      dispatch(setTotalRecord(totalUsers)); // Seteamos el total de usuarios en el estado
    } catch (error) {
      dispatch(fetchUsersFailure(error));
    } finally {
      dispatch({ type: "SET_LOADING_FALSE" }); // Podrías usar una acción específica para esto si es necesario
    }
  };

// Acción para establecer el usuario actual
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
