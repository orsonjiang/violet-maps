import { SET_MODAL } from "../actionTypes/modalTypes";

export const openModal = (data) => ({
    type: SET_MODAL,
    payload: data
});