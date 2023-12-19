import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import Input from "./components/Input";
import TextField from "./components/TextField";
import ModalDropDown from '../Menus/ModalDropDown';

import { setLegend, setLayerProperty } from "../../../actions/map";
import { setModal } from "../../../actions/modal";
import { MenuTypes, ModalTypes, PropertyTypes } from "../../../constants";

const EditLegend = () => {
    const dispatch = useDispatch();

    const positionOptions = ['bottomleft', 'bottomright', 'topleft', 'topright']
    const visibilityOptions = ['show', 'hide'];

    const { map } = useSelector((state) => state.map.present);

    const [name, setName] = useState(map.graphics.legend.name);
    const [position, setPosition] = useState("");
    const [visibility, setVisibility] = useState("");

    const handleConfirm = () => {
        var visible = visibility == "hide" ? false : true;
        dispatch(setLegend({name, position, visible}));
        dispatch(setModal(ModalTypes.NONE));
        dispatch(setLayerProperty(PropertyTypes.NONE));
    };

    return (
        <Modal
            title={'Legend Properties'}
            confirm={handleConfirm}
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
                <ModalDropDown list={positionOptions} handleItem={setPosition} currentItem={map.graphics.legend.position} type={MenuTypes.SET_LEGEND_POSITION}/>
            </Input>

            <Input title={'Visibility: '}>
                <ModalDropDown list={visibilityOptions} handleItem={setVisibility} currentItem={map.graphics.legend.visible ? "show" : "hide"} type={MenuTypes.SET_LEGEND_VISIBILITY}/>
            </Input>                        
        </Modal>
    );
};

export default EditLegend;
