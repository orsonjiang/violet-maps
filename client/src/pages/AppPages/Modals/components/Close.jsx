import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../helpers';

import Button from './Button';

const Close = () => {
    const dispatch = useDispatch()

    return (
        <div className="flex py-1 text-sm">
            <Button onClick={() => closeModal(dispatch)}>Close</Button>
        </div>
    );
};

export default Close;
