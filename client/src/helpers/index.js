import { setModal } from '../actions/modal';
import { ModalTypes } from '../constants';

export const closeModal = (dispatch) => {
	dispatch(setModal(ModalTypes.NONE));
};