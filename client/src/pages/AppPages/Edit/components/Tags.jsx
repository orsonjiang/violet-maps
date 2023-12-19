import { useDispatch } from 'react-redux';

import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';

const Tags = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setModal(ModalTypes.SET_TAGS));
    }

    return (
        <button
            className="flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
            title='Tags'
        >
            <i class="fa-solid fa-hashtag"></i>        
        </button> 
    )

}

export default Tags;