import { OPEN_MODAL } from "../action-types/modal-types";

export const openModal = (data) => ({
    type: OPEN_MODAL,
    payload: data
});