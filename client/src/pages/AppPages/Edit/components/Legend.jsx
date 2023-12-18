import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Legend = () => {
    const dispatch = useDispatch();
    
	return (
        <button
            className="px-2 hover:bg-gray-200 rounded-full"
            onClick={() => dispatch(setModal(ModalTypes.EDIT_LEGEND))}
        >
            Legend
        </button>
	);
};

export default Legend;
