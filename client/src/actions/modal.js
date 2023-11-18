import { OPEN_MODAL, CLOSE_MODAL } from "../action-types/modal-types";

export const openModal = (data) => ({
	type: OPEN_MODAL,
	payload: data
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: null
});