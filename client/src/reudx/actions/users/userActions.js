// src/redux/actions/users/userActions.js

import {
  FETCH_USERS_SUCCESS,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_LOADING,
  SET_TOTAL_RECORD,
} from "../../../types/actions";

export const setUsers = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const setTotalRecords = (total) => ({
  type: SET_TOTAL_RECORD,
  payload: total,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
