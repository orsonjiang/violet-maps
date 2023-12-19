import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import apis from "../../../api/api";
import { closeModal } from "../../../helpers";

const PublishMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleConfirm = () => {
        apis.deleteMap(map._id)
            .then(() => {
                closeModal(dispatch);
                navigate("/app/home");
            })
            .catch((err) => console.log(err))
    };

    return (
        <Modal
            title={'Delete Map'}
            confirm={handleConfirm}
            fields={true}
        >
            Are you sure you want to delete this map? You can not undo this action.
        </Modal>
    );
};

export default PublishMap;
