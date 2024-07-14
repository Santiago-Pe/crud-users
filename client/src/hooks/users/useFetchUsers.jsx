// hooks/useFetchUsers.js
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { useDispatch } from "react-redux";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../actions/users/userActions";

const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

const useFetchUsers = () => {
  const dispatch = useDispatch();

  return useQuery("users", async () => {
    dispatch(fetchUsersRequest());
    try {
      const data = await fetchUsers();
      dispatch(fetchUsersSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      throw error;
    }
  });
};

export default useFetchUsers;
