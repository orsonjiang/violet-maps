import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setName, setProperty } from '../../../actions/newMap';
import { closeModal } from '../../../helpers';
import { InputTypes, TemplateTypes } from '../../../constants';
import apis from '../../../api/api';

import Modal from './Modal';
import Input from './components/Input';
import TextField from './components/TextField';
import DropDown from './Menus/DropDown';
import Color from './Menus/Color';

const SetData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newMap = useSelector((state) => state.newMap);
    const [propertiesList, setPropertiesList] = useState([]);

    useEffect(() => {
        const list = []; // List of data props for user to choose from.

        const { template, properties } = newMap;
        for (const property of properties) {
            for (const [key, value] of Object.entries(property)) {
                switch (template) {
                    case TemplateTypes.STRING:
                        if (typeof value == 'string') {
                            list.push(key);
                        }
                        break;

                    case TemplateTypes.BLANK:
                        break;

                    default:
                        if (typeof value == 'number') {
                            list.push(key);
                        }
                        break;
                }
            }
        }

        setPropertiesList(list);
    }, []);

    const handleConfirm = () => {
        apis.createMap(newMap)
            .then((res) => {
                navigate(`/app/edit/${res.data.id}`);
            })
            .catch((err) => console.log(err));
        closeModal(dispatch);
    };

    const handleNameChange = (event) => {
        dispatch(setName(event.target.value));
    };

    const handleSelectProperty = (item) => {
        dispatch(setProperty(item));
    };

    const PropertyField = (
        <Input title={'Data Property: '}>
            <DropDown list={propertiesList} handleItem={handleSelectProperty} />
        </Input>
    );

    const ColorField = (
        <Input title={'Color Property: '}>
            <Color />
        </Input>
    );

    return (
        <Modal
            title={'Finalize Map Info'}
            confirm={handleConfirm}
            fields={true}
        >
            <Input title={'Name: '}>
                <TextField
                    placeholder={'Map Name'}
                    onChange={handleNameChange}
                />
            </Input>
            {newMap.template !== TemplateTypes.BLANK ? PropertyField : ''}
            {newMap.template === TemplateTypes.CHOROPLETH || newMap.template === TemplateTypes.BUBBLE ? ColorField : ''}
        </Modal>
    );
};

export default SetData;
