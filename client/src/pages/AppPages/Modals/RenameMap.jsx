import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../../actions/modal";
import { setName } from "../../../actions/map";
import { ModalTypes } from "../../../constants";

import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";

const RenameMap = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);
    const [name, setStateName] = useState(map.name);

    const handleConfirm = () => {
        dispatch(setName(name));
        dispatch(setModal(ModalTypes.NONE));
    };

    return (
        <Modal
            title={'Rename Map'}
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

export default RenameMap;
