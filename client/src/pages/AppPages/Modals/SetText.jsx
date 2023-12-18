import { useState } from "react";
import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";
import { useSelector } from "react-redux";

const SetText = () => {
    const { map } = useSelector((state) => state.map.present);
    const [name, setName] = useState();

    const handleConfirm = () => {

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
