import { useCallback, useContext } from "react";

import { Button, Select, Space, Table, Tag, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ApiContext from "../../context/apiContext";
import { UserModalForm, Loader, Show, UsersDeleteForm } from "../../components";
import PageFaildFetch from "../errors/pageFaildFetch";
import { useFetchUsers } from "../../hooks";
import { setCurrentUser } from "../../reudx/actions/users/userActions";
import { openModal } from "../../reudx/actions/modals/modalsActions";
import { DELETE_USER_FORM, USER_FORM } from "../../types/modals/modalTypes";

import styles from "./userPage.module.css";
import { useDispatch } from "react-redux";

const { Search } = Input;

const UsersPage = () => {
  const { client: apiClient } = useContext(ApiContext);
  const dispatch = useDispatch();
  const {
    users,
    loading,
    error,
    total,
    pagination,
    setFilters,
    setSearchTerm,
    setPagination,
    fetchData,
  } = useFetchUsers(apiClient);

  const onSearch = useCallback(
    (value) => {
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  const handleFilterChange = useCallback(
    (value, key) => {
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
    },
    [setFilters, setPagination]
  );

  const handleTableChange = useCallback(
    (pagination) => {
      setPagination((prevPagination) => ({
        ...prevPagination,
        _page: pagination.current,
        _limit: pagination.pageSize,
      }));
    },
    [setPagination]
  );

  const openUserModal = useCallback(
    (user) => {
      dispatch(openModal(USER_FORM));
      dispatch(setCurrentUser(user));
    },
    [dispatch]
  );

  const openDeleteUserModal = useCallback(
    (user) => {
      dispatch(openModal(DELETE_USER_FORM));
      dispatch(setCurrentUser(user));
    },
    [dispatch]
  );

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
  return (
    <section className={styles.usersPage__container}>
      <div className={styles.usersPage__header}>
        <div className={styles.usersPage__filters}>
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
              showSizeChanger: false,
            }}
            onChange={handleTableChange}
            className={styles.usersPage__boxShadow}
          />

          <UsersDeleteForm callback={fetchData} />
        </Show.Else>
      </Show>
    </section>
  );
};

export default UsersPage;
