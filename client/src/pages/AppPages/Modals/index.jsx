import { useSelector } from "react-redux";

import { ModalTypes } from "../../../constants";

import UploadMap from './UploadMap';
import ChooseTemplate from './ChooseTemplate';
import SetData from './SetData';

const Modals = () => {
    const { modal } = useSelector((state) => state.modal);

	const renderModal = {
        [ModalTypes.UPLOAD_MAP]: <UploadMap />,
        [ModalTypes.CHOOSE_TEMPLATE]: <ChooseTemplate />,
        [ModalTypes.SET_DATA]: <SetData />
    };

	return renderModal[modal];
};

export default Modals;