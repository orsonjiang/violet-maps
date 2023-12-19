import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import apis from "../../../api/api";
import { closeModal } from "../../../helpers";

import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";

const ForkMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);
    const [name, setStateName] = useState(map.name);

    const handleConfirm = () => {
        apis.forkMap(map._id, name)
            .then((res) => {
                closeModal(dispatch);
                navigate(`/app/edit/${res.data.id}`);
            })
    };

    return (
        <Modal
            title={'Fork Map'}
            confirm={handleConfirm}
            fields={true}
        >
            <Input title={'Map Name: '}>
                <TextField
                    onChange={(event) => setStateName(event.target.value)}
                    value={name}
                />
            </Input>
        </Modal>
    );
};

export default ForkMap;
