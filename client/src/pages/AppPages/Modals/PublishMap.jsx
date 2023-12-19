import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import apis from "../../../api/api";
import { closeModal } from "../../../helpers";

import Modal from "./Modal";

const PublishMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleConfirm = async () => {
        await apis.publishMap(map._id);
        navigate(`/app/map/${map._id}`);
        closeModal(dispatch)
    };

    return (
        <Modal
            title={'Publish Map'}
            confirm={handleConfirm}
            fields={true}
        >
            Are you sure you want to publish this map? You can not undo this action.
        </Modal>
    );
};

export default PublishMap;
