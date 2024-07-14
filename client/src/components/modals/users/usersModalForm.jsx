import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { UsersForm } from "../../forms";
// eslint-disable-next-line react/prop-types
const UserModalForm = ({ user = null, useButton = true, reset = null }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setOpen(true);
    }
  }, [user]);

  const handleModal = () => {
    setOpen((prevState) => !prevState);
    reset?.();
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      reset?.();
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
        open={open}
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
