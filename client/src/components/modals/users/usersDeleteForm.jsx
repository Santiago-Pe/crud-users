import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, message } from "antd";

import { deleteUser } from "../../../services/users/usersServices";
import { closeModal } from "../../../reudx/actions/modals/modalsActions";
import { setCurrentUser } from "../../../reudx/actions/users/userActions";
import { DELETE_USER_FORM } from "../../../types/modals/modalTypes";
import ApiContext from "../../../context/apiContext";

const UsersDeleteForm = ({ callback }) => {
  const { client: apiClient } = useContext(ApiContext);
  const currentUser = useSelector((state) => state.users.currentUser);
  const { currentModal, modalVisible } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteUser(apiClient, currentUser.id);
      close();
      message.success("Usuario eliminado exitosamente");
      callback?.();
    } catch (error) {
      console.log(error);
      message.error("Hubo un error al eliminar el usuario");
    } finally {
      setConfirmLoading(false);
    }
  };
  const close = () => {
    dispatch(setCurrentUser(null));
    dispatch(closeModal());
  };

  return (
    <Modal
      title="Eliminar usuario"
      open={modalVisible && currentModal === DELETE_USER_FORM}
      close
      onCancel={close}
      footer={[
        <Button key="back" onClick={close}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          loading={confirmLoading}
          onClick={handleDelete}
        >
          Eliminar
        </Button>,
      ]}
    >
      <p>¿Está seguro que desea eliminar el usuario {currentUser?.username}?</p>
    </Modal>
  );
};

export default UsersDeleteForm;
