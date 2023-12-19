import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import apis from "../../../api/api";

const PublishMap = () => {
    const navigate = useNavigate();

    const { map } = useSelector((state) => state.map.present);

    const handleConfirm = async () => {
        await apis.publishMap(map._id);
        navigate(`/app/map/${map._id}`);
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
