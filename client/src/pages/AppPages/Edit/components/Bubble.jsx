import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { setTemplateLayer, removeTemplateLayer } from '../../../../actions/map';
import { ModalTypes } from '../../../../constants';

const Bubble = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleClick = () => {
        if (map.graphics.bubble) {
            dispatch(removeTemplateLayer('bubble')); // delete it
        } else {
            dispatch(setTemplateLayer('Bubble'));
            dispatch(setModal(ModalTypes.ADD_LAYER));
        }
        
    }

	return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            {map.graphics.bubble ? <i className="fa-solid fa-minus mr-1.5"></i> : <i className="fa-solid fa-plus mr-1.5"></i>}
            <i class="text-indigo-500 fa-solid fa-circle"></i>
        </button>
	);
};

export default Bubble;
