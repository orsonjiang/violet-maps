import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes, PropertyTypes } from '../../../../constants';
import { setLayerProperty } from '../../../../actions/map';

const Bubble = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setLayerProperty(PropertyTypes.BUBBLE));
        dispatch(setModal(ModalTypes.ADD_LAYER));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            <i className="text-indigo-500 fa-solid fa-circle"></i>
        </button>
	);
};

export default Bubble;