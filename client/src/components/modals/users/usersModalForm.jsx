import { useState } from "react";
import { Button, Modal } from "antd";
import { UsersForm } from "../../forms";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../reudx/actions/users/userActions";
// eslint-disable-next-line react/prop-types
const UserModalForm = ({ useButton = true }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleModal = () => {
    setOpen((prevState) => {
      if (!prevState && currentUser) {
        return false;
      }
      return !prevState;
    });

    if (currentUser) {
      dispatch(setCurrentUser(null));
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      {useButton && (
        <Button type="primary" onClick={handleModal} size="large">
          Agregar usuario
        </Button>
      )}
      <Modal
        title="Title"
        open={open || currentUser}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleModal}
        footer={null}
      >
        <UsersForm />
      </Modal>
    </>
  );
};

export default UserModalForm;
