import { useDispatch } from 'react-redux';

import { ModalTypes } from '../../../../constants';
import { setModal } from '../../../../actions/modal';

import Button from './Button';

const Dialog = ({ confirm, cancel }) => {
	const dispatch = useDispatch();

	const defaultCancel = () => {
		dispatch(setModal(ModalTypes.NONE));
	};

	const handleConfirm = confirm;
	const handleCancel = cancel ? cancel : defaultCancel;
	
	<div className='grid grid-cols-4 grid-row-1 py-1'>
		<div className='col-span-2 flex space-x-2 justify-end text-sm'>
			<Button onClick={handleConfirm}>
				Confirm
			</Button>
			<Button onClick={handleCancel}>
				Cancel
			</Button>
		</div>
	</div>
};

export default Dialog;
