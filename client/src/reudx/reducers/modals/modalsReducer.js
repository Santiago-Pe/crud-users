import { CLOSE_MODAL, OPEN_MODAL } from "../../../types/actions";

const initialState = {
  modalVisible: false,
  currentModal: null,
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalVisible: true,
        currentModal: action.payload,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
        currentModal: null,
      };
    default:
      return state;
  }
};

export default modalsReducer;
