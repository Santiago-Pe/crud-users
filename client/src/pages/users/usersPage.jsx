import { Button, Select, Space, Table, Tag } from "antd";
import { Input } from "antd";
import { UsersForm } from "../../components";
import { useState } from "react";

const { Search } = Input;
const dataSource = [
  {
    key: "1",
    name: "Mike",
    lastname: "Bubble",
    status: false,
    user: "mike_bubble",
  },
  {
    key: "2",
    name: "John",
    lastname: "Valverde",
    status: false,
    user: "john_valverde",
  },
  {
    key: "3",
    name: "Jane",
    lastname: "Smith",
    status: true,
    user: "jane_smith",
  },
  { key: "4", name: "Doe", lastname: "Doe", status: true, user: "doe_doe" },
  {
    key: "5",
    name: "Anna",
    lastname: "Taylor",
    status: false,
    user: "anna_taylor",
  },
  {
    key: "6",
    name: "Tom",
    lastname: "Johnson",
    status: true,
    user: "tom_johnson",
  },
  { key: "7", name: "Lucy", lastname: "Lee", status: false, user: "lucy_lee" },
  {
    key: "8",
    name: "Mark",
    lastname: "Brown",
    status: true,
    user: "mark_brown",
  },
  {
    key: "9",
    name: "Emma",
    lastname: "White",
    status: false,
    user: "emma_white",
  },
  {
    key: "10",
    name: "James",
    lastname: "Garcia",
    status: true,
    user: "james_garcia",
  },
];

const UsersPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const columns = [
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      width: "33.33%",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "33.33%",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      width: "33.33%",
    },
    {
      width: 100,
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Activo" : "Inactivo"}
        </Tag>
      ),
    },
    {
      width: 200,
      title: "Acciones",
      dataIndex: "accions",
      key: "accions",
      render: (text, record) => (
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
            onClick={() => setCurrentUser(record)}
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
            style={{
              width: 300,
            }}
          />
          <Select
            options={[{ value: "sample", label: <span>sample</span> }]}
            placeholder="Filtrar por estado"
            size="large"
            style={{
              width: 200,
            }}
          />
        </div>
        <div>
          <UsersForm user={currentUser} reset={() => setCurrentUser(null)} />
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} rowHoverable={false} />
    </>
  );
};

export default UsersPage;
