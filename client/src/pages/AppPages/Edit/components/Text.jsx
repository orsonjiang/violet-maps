import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Text = () => {
    const dispatch = useDispatch();

    return [
        <button
            key={'edit-text'}
            className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-6"
            onClick={() => dispatch(setModal(ModalTypes.SET_TEXT))}
        >
            <i className="fa-solid fa-plus"></i>
        </button>,
    ];
};

export default Text;
