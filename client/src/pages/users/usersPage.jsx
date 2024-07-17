import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Select, Space, Table, Tag, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ApiContext from "../../context/apiContext";
import { UserModalForm, Loader, Show, UsersDeleteForm } from "../../components";
import PageFaildFetch from "../errors/pageFaildFetch";
import { useDebounce } from "../../hooks";
import {
  setCurrentUser,
  setError,
  setLoading,
  setTotalRecords,
  setUsers,
} from "../../reudx/actions/users/userActions";
import { fetchUsers } from "../../services/users/usersServices";
import { openModal } from "../../reudx/actions/modals/modalsActions";
import { DELETE_USER_FORM, USER_FORM } from "../../types/modals/modalTypes";

const { Search } = Input;

const UsersPage = () => {
  const dispatch = useDispatch();
  const { client: apiClient } = useContext(ApiContext);
  const { users, loading, error, total } = useSelector((state) => state.users);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ _page: 1, _limit: 10 });

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // Fetch
  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetchUsers(apiClient, {
        ...filters,
        ...pagination,
      });
      dispatch(setUsers(response.data));
      dispatch(setTotalRecords(response.totalUsers));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Functions
  const onSearch = (value) => {
    setSearchTerm(value);
  };
  const handleFilterChange = (value, key) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (value === undefined) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
    setPagination((prevPagination) => ({
      ...prevPagination,
      _page: 1, // Reset current page when filters change
    }));
  };
  const handleTableChange = (pagination) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      _page: pagination.current,
      _limit: pagination.pageSize,
    }));
  };
  const openUserModal = (user) => {
    dispatch(openModal(USER_FORM));
    dispatch(setCurrentUser(user));
  };
  const openDeleteUserModal = (user) => {
    dispatch(openModal(DELETE_USER_FORM));
    dispatch(setCurrentUser(user));
  };

  // Columns Table
  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      width: "33.33%",
      render: (username) => <span>{username}</span>,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "33.33%",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      width: "33.33%",
      render: (lastname) => <span>{lastname}</span>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Activo" : "Inactivo"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => openDeleteUserModal(record)}
            size="small"
          >
            Eliminar
          </Button>
          <Button
            type="link"
            onClick={() => openUserModal(record)}
            size="small"
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination]);

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

  return (
    <>
      <div className="pageHeader">
        <div className="filterHeader">
          <Search
            size="large"
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: 300,
            }}
          />
          <Select
            allowClear={{ clearIcon: <CloseOutlined /> }}
            onChange={(value) => handleFilterChange(value, "status")}
            options={[
              { value: "active", label: "Activo" },
              { value: "inactive", label: "Inactivo" },
            ]}
            placeholder="Filtrar por estado"
            size="large"
            style={{
              width: 200,
            }}
          />
        </div>
        <div>
          <UserModalForm useButton callback={fetchData} />
        </div>
      </div>
      <Show>
        <Show.When isTrue={loading}>
          <Loader />
        </Show.When>
        <Show.When isTrue={error}>
          <PageFaildFetch />
        </Show.When>
        <Show.Else>
          <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
            pagination={{
              current: pagination._page,
              pageSize: pagination._limit,
              total: total,
            }}
            onChange={handleTableChange}
          />
          <UsersDeleteForm callback={fetchData} />
        </Show.Else>
      </Show>
    </>
  );
};

export default UsersPage;
