import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../../helpers';
import { MenuTypes } from '../../../constants';
import { addTemplateLayer } from '../../../actions/map';

import Modal from './Modal';
import Input from './components/Input';
import ModalColor from '../Menus/ModalColor';


const AddLayer = () => {
    const dispatch = useDispatch();

    const { map, newTemplateLayer } = useSelector((state) => state.map.present);

    const [color, setColor] = useState("#8187DC");

    const handleConfirm = () => {
        dispatch(addTemplateLayer(color));
        closeModal(dispatch);
    };

    const ColorField = (
        <Input title={'Color Property: '} type={MenuTypes.FINALIZE_COLOR}>
            <ModalColor getColor={setColor}/>
        </Input>
    );

    return (
        <Modal
            title={`Add ${newTemplateLayer} Layer`}
            confirm={handleConfirm}
            fields={true}
        >
            {ColorField}
        </Modal>
    );
};

export default AddLayer;
