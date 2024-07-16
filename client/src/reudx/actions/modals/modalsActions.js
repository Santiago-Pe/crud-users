import { CLOSE_MODAL, OPEN_MODAL } from "../../../types/actions";

// src/actions/modalActions.js
export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  payload: modalType,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
