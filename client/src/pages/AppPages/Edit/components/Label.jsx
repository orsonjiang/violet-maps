import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes, PropertyTypes } from '../../../../constants';
import { setLayerProperty } from '../../../../actions/map';

const Label = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setLayerProperty(PropertyTypes.LABEL));
        dispatch(setModal(ModalTypes.ADD_LAYER));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title="Label Properties"
        >
            <i className="fa-solid fa-tag"></i>
        </button>
	);
};

export default Label;