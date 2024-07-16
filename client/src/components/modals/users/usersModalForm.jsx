import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Row, Col, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../../context/apiContext";
import { createUser, updateUser } from "../../../services/users/usersServices";
import { setCurrentUser } from "../../../reudx/actions/users/userActions";

const UserModalForm = ({ useButton = true, callback }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const { client: apiClient } = useContext(ApiContext);
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Functions
  const handleModal = () => {
    setVisible((prevState) => !prevState);

    if (currentUser) {
      dispatch(setCurrentUser(null));
    }
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);

        try {
          if (currentUser) {
            await updateUser(apiClient, currentUser.id, values);
          } else {
            await createUser(apiClient, values);
          }
          handleModal();
          message.success(
            currentUser ? "Usuario actualizado" : "Usuario creado"
          );
          callback?.();
        } catch (error) {
          console.error("Error al procesar la operación:", error);
          message.error("Hubo un error al procesar la operación");
        } finally {
          setConfirmLoading(false);
        }
      })
      .catch((errorInfo) => {
        console.log("Error al validar el formulario:", errorInfo);
      });
  };

  useEffect(() => {
    if (currentUser) {
      setVisible(true);
      form.setFieldsValue(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      {useButton && (
        <Button type="primary" onClick={handleModal} size="large">
          Agregar usuario
        </Button>
      )}
      <Modal
        title={currentUser ? "Editar usuario" : "Crear usuario"}
        open={visible}
        onOk={handleOk}
        onCancel={handleModal}
        confirmLoading={confirmLoading}
        okText={currentUser ? "Editar usuario" : "Crear usuario"}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            {currentUser ? "Editar usuario" : "Crear usuario"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={currentUser ? currentUser : {}}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Usuario"
                name="username"
                rules={[
                  { required: true, message: "Por favor ingrese un usuario" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  { required: true, message: "Por favor ingrese un nombre" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[
                  { required: true, message: "Por favor ingrese un apellido" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Estado"
                name="status"
                rules={[
                  { required: true, message: "Por favor seleccione un estado" },
                ]}
              >
                <Select>
                  <Select.Option value="active">Activo</Select.Option>
                  <Select.Option value="inactive">Inactivo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Por favor ingrese un email válido",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Edad"
                name="age"
                rules={[
                  {
                    type: "string",
                    message: "Por favor ingrese una edad válida",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalForm;
