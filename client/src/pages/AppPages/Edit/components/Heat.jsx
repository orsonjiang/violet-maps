import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes, PropertyTypes } from '../../../../constants';
import { setLayerProperty } from '../../../../actions/map';

const Heat = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setLayerProperty(PropertyTypes.HEAT));
        dispatch(setModal(ModalTypes.ADD_LAYER));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title="Heat Layer"
        >
            <i className="bg-gradient-to-b from-red-500 to-purple-500 text-transparent bg-clip-text fa-solid fa-fire"></i>
        </button>
	);
};

export default Heat;