import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { capitalize } from '../../../../helpers';
import { setTemplateLayer, removeTemplateLayer } from '../../../../actions/map';
import { ModalTypes, TemplateTypes } from '../../../../constants';

const Choropleth = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleClick = () => {
        if (map.graphics.choropleth) {
            dispatch(removeTemplateLayer(TemplateTypes.CHOROPLETH.toLowerCase())); // delete it
        } else {
            dispatch(setTemplateLayer(capitalize(TemplateTypes.CHOROPLETH)));
            dispatch(setModal(ModalTypes.ADD_LAYER));
        }
        
    }

	return (
        <button
            className="whitespace-nowrap flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            {map.graphics.choropleth ? <i className="fa-solid fa-minus mr-1.5"></i> : <i className="fa-solid fa-plus mr-1.5"></i>}
            <i className="bg-gradient-to-b from-purple-300 to-indigo-400 text-transparent bg-clip-text fa-solid fa-square"></i>
        </button>
	);
};

export default Choropleth;