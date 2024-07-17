import { CLOSE_MODAL, OPEN_MODAL } from "../../../types/actions";

export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  payload: modalType,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
