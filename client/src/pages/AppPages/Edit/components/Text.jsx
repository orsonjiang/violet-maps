import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Text = () => {
    const dispatch = useDispatch();

    const { region } = useSelector((state) => state.map.present);

    return [
        <button
            disabled={!region}
            key={'edit-text'}
            className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7"
            onClick={() => dispatch(setModal(ModalTypes.SET_TEXT))}
        >
            <img src="https://img.icons8.com/ios/50/text-box.png" alt="text-box"/>
        </button>,
    ];
};

export default Text;
