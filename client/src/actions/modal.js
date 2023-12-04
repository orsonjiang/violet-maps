import { modalTypes } from "../actionTypes";

export const setModal = (data) => ({
    type: modalTypes.SET_MODAL,
    payload: data
});