import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { capitalize, closeModal } from '../../../helpers';
import { MenuTypes, TemplateTypes } from '../../../constants';
import apis from '../../../api/api';

import Modal from './Modal';
import Input from './components/Input';
import ModalColor from '../Menus/ModalColor';

const AddLayer = () => {
    const dispatch = useDispatch();

    const { map, newTemplateLayer } = useSelector((state) => state.map.present);

    const handleConfirm = () => {
        // apis.createMap(newMap)
        //     .then((res) => {
        //         navigate(`/app/edit/${res.data.id}`);
        //     })
        //     .catch((err) => console.log(err));
        closeModal(dispatch);
    };

    const ColorField = (
        <Input title={'Color Property: '} type={MenuTypes.FINALIZE_COLOR}>
            <ModalColor />
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
