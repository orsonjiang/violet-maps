import { useState } from "react";
import { MenuTypes } from '../../../constants';

import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";
import ModalDropDown from '../Menus/ModalDropDown';

const EditLegend = () => {
    const positionOptions = ['bottomleft', 'bottomright', 'topleft', 'topright']
    const VisibilityOptions = ['visible', 'hidden'];

    const [name, setName] = useState("");

    return (
        <Modal
            title={'Legend Properties'}
            // confirm={handleConfirm}
            fields={true}
        >
            <Input title={'Name: '}>
                <TextField
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    placeholder={"Name your legend"}
                />
            </Input>
            
            <Input title={'Position: '}>
                <ModalDropDown list={positionOptions} handleItem={()=> {}} type={MenuTypes.SET_LEGEND_POSITION}/>
            </Input>

            <Input title={'Visibility: '}>
                <ModalDropDown list={VisibilityOptions} handleItem={()=> {}} type={MenuTypes.SET_LEGEND_VISIBILITY}/>
            </Input>                        
        </Modal>
    );
};

export default EditLegend;
