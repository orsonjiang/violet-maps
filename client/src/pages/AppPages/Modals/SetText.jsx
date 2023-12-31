import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setText } from "../../../actions/map";
import { setModal } from "../../../actions/modal";
import { ModalTypes } from "../../../constants";

import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";

const SetText = () => {
    const dispatch = useDispatch();

    const { map, region } = useSelector((state) => state.map.present);

    const oldName = () => {
        if (!region) return '';

        const index = region.feature.properties.index;
        return map.properties.data[index][map.graphics.label.property];
    }

    const [name, setName] = useState(oldName());

    const handleConfirm = () => {
        dispatch(setText(name));
        dispatch(setModal(ModalTypes.NONE));
    };

    return (
        <Modal
            title={'Add/Edit Label for Region'}
            confirm={handleConfirm}
            fields={true}
        >
            <Input title={'Name: '}>
                <TextField
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />
            </Input>
        </Modal>
    );
};

export default SetText;
