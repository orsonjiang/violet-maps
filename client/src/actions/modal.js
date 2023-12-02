import { SET_MODAL } from "../action-types/modal-types";

export const openModal = (data) => ({
    type: SET_MODAL,
    payload: data
});