import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Fork = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setModal(ModalTypes.FORK_MAP));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title="Fork Map"
        >
            <i className="fa-solid fa-copy"></i>
        </button>
	);
};

export default Fork;