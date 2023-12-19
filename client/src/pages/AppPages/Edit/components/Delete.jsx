import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Delete = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setModal(ModalTypes.DELETE_MAP));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            <i className="fa-solid fa-trash"></i>
        </button>
	);
};

export default Delete;