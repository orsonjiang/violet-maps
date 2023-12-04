import { modalTypes } from "../actionTypes";

export const openModal = (data) => ({
    type: modalTypes.SET_MODAL,
    payload: data
});