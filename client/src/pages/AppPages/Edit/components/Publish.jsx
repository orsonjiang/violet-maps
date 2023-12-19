import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Publish = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setModal(ModalTypes.PUBLISH_MAP));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title="Publish Map"
        >
            <i className="fa-solid fa-upload"></i>
        </button>
	);
};

export default Publish;