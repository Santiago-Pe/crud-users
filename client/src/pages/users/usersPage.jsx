import { Button, Select, Space, Table, Tag, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UserModalForm, Loader, Show } from "../../components";
import PageFaildFetch from "../errors/pageFaildFetch";
import {
  fetchUsers,
  setCurrentUser,
} from "../../reudx/actions/users/userActions";
import { useDebounce } from "../../hooks";

const { Search } = Input;

const UsersPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      q: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value, key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

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
            onClick={() => console.log("Eliminar")}
            size="small"
          >
            Eliminar
          </Button>
          <Button
            type="link"
            onClick={() => dispatch(setCurrentUser(record))}
            size="small"
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="pageHeader">
        <div className="filterHeader">
          <Search
            size="large"
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => setSearchTerm(e.target.value)} // Maneja el cambio de input
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
          <UserModalForm useButton />
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
          <Table dataSource={users} columns={columns} rowKey="id" />
        </Show.Else>
      </Show>
    </>
  );
};

export default UsersPage;
