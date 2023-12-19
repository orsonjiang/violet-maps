import { useSelector } from "react-redux";

import { ModalTypes } from "../../../constants";

import UploadMap from './UploadMap';
import ChooseTemplate from './ChooseTemplate';
import SetData from './SetData';
import SetText from './SetText';
import EditLegend from "./EditLegend";
import AddLayer from "./AddLayer";
import PublishMap from "./PublishMap";

const Modals = () => {
    const { modal } = useSelector((state) => state.modal);

	const renderModal = {
        [ModalTypes.UPLOAD_MAP]: <UploadMap />,
        [ModalTypes.CHOOSE_TEMPLATE]: <ChooseTemplate />,
        [ModalTypes.SET_DATA]: <SetData />,
        [ModalTypes.SET_TEXT]: <SetText />,
        [ModalTypes.EDIT_LEGEND]: <EditLegend />,
        [ModalTypes.ADD_LAYER]: <AddLayer />,
        [ModalTypes.PUBLISH_MAP]: <PublishMap />,
    };

	return renderModal[modal];
};

export default Modals;