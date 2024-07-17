import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, Form, Input, Row, Col, Select, message } from "antd";

import ApiContext from "../../../context/apiContext";
import { createUser, updateUser } from "../../../services/users/usersServices";
import { setCurrentUser } from "../../../reudx/actions/users/userActions";
import {
  openModal,
  closeModal,
} from "../../../reudx/actions/modals/modalsActions";
import { USER_FORM } from "../../../types/modals/modalTypes";

const UserModalForm = ({ useButton = true, callback }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const { currentModal, modalVisible } = useSelector((state) => state.modals);
  const { client: apiClient } = useContext(ApiContext);

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Functions
  const close = () => {
    dispatch(setCurrentUser(null));
    dispatch(closeModal());
    form.resetFields();
  };
  const open = () => {
    dispatch(openModal(USER_FORM));
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
          close();
          message.success(
            currentUser ? "Usuario actualizado" : "Usuario creado"
          );
          callback?.();
        } catch (error) {
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
      form.setFieldsValue(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      {useButton && (
        <Button type="primary" onClick={open} size="large">
          Agregar usuario
        </Button>
      )}
      <Modal
        title={currentUser ? "Editar usuario" : "Crear usuario"}
        open={modalVisible && currentModal === USER_FORM}
        onOk={handleOk}
        onCancel={close}
        confirmLoading={confirmLoading}
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
        <Form form={form} layout="vertical">
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
          </Row>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor ingrese un email" },
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
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalForm;
