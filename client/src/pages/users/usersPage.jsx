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
import { CloseOutlined } from "@ant-design/icons";

const { Search } = Input;

const UsersPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ _page: 1, _limit: 10 });
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { users, loading, error, total } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ ...filters, ...pagination }));
    };

    fetchData();
  }, [dispatch, filters, pagination]);

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
        </Show.Else>
      </Show>
    </>
  );
};

export default UsersPage;
