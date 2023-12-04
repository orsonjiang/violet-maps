import { useDispatch } from 'react-redux';

import { setModal } from '../actions/modal';
import { ModalTypes } from '../constants';

const closeModal = () => {
	const dispatch = useDispatch();
	dispatch(setModal(ModalTypes.NONE));
};

export {
	closeModal
};