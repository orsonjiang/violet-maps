import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { capitalize } from '../../../../helpers';
import { setTemplateLayer, removeTemplateLayer } from '../../../../actions/map';
import { ModalTypes, TemplateTypes } from '../../../../constants';

const Bubble = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleClick = () => {
        if (map.graphics.bubble) {
            dispatch(removeTemplateLayer(TemplateTypes.BUBBLE.toLowerCase())); // delete it
        } else {
            dispatch(setTemplateLayer(capitalize(TemplateTypes.BUBBLE)));
            dispatch(setModal(ModalTypes.ADD_LAYER));
        }
        
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            {map.graphics.bubble ? <i className="fa-solid fa-minus mr-1.5"></i> : <i className="fa-solid fa-plus mr-1.5"></i>}
            <i className="text-indigo-500 fa-solid fa-circle"></i>
        </button>
	);
};

export default Bubble;
