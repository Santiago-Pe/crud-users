import { useCallback, useEffect, useState } from "react";
import {
  setError,
  setLoading,
  setTotalRecords,
  setUsers,
} from "../../reudx/actions/users/userActions";
import { fetchUsers } from "../../services/users/usersServices";
import useDebounce from "../filters/useDebounce";
import { useDispatch, useSelector } from "react-redux";

const useFetchUsers = (apiClient) => {
  const dispatch = useDispatch();
  const { users, loading, error, total } = useSelector((state) => state.users);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ _page: 1, _limit: 10 });
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetchUsers(apiClient, {
        ...filters,
        ...pagination,
        q: debouncedSearchTerm,
      });
      dispatch(setUsers(response.data));
      dispatch(setTotalRecords(response.totalUsers));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [apiClient, dispatch, filters, pagination, debouncedSearchTerm]);

  useEffect(() => {
    fetchData();
  }, [filters, pagination, fetchData]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      q: debouncedSearchTerm,
    }));
    setPagination((prevPagination) => ({
      ...prevPagination,
      _page: 1, // Reset current page when filters change
    }));
  }, [debouncedSearchTerm]);

  return {
    users,
    loading,
    error,
    total,
    searchTerm,
    pagination,
    setFilters,
    setSearchTerm,
    setPagination,
    fetchData,
  };
};

export default useFetchUsers;
