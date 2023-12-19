import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes, PropertyTypes } from '../../../../constants';
import { setLayerProperty } from '../../../../actions/map';

const Choropleth = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setLayerProperty(PropertyTypes.CHOROPLETH));
        dispatch(setModal(ModalTypes.ADD_LAYER));
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title='Choropleth Layer'
        >
            <i className="bg-gradient-to-b from-purple-400 to-indigo-400 text-transparent bg-clip-text fa-solid fa-square"></i>
        </button>
	);
};

export default Choropleth;