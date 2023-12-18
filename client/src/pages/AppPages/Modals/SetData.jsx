import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setName, setNewProperty } from '../../../actions/newMap';
import { closeModal } from '../../../helpers';
import { MenuTypes, TemplateTypes } from '../../../constants';
import apis from '../../../api/api';

import Modal from './Modal';
import Input from './components/Input';
import TextField from './components/TextField';
import ModalDropDown from '../Menus/ModalDropDown';
import ModalColor from '../Menus/ModalColor';

const SetData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newMap = useSelector((state) => state.newMap);
    const { name, template, properties } = newMap;

    const filteredList = () => {
        if (!properties.length) return [];

        Object.filter = (obj, predicate) => 
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );

        const unfiltered = properties[0];

        switch (template) {
            case TemplateTypes.STRING:
                return Object.keys(Object.filter(unfiltered, value => typeof value === 'string'))
            case TemplateTypes.BLANK:
                return Object.keys(properties[0]);
            default:
                return Object.keys(Object.filter(unfiltered, value => typeof value === 'number'))
        }
    }

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
        dispatch(setNewProperty(item));
    };

    const PropertyField = (
        <Input title={'Data Property: '}>
            <ModalDropDown list={filteredList()} handleItem={handleSelectProperty} type={MenuTypes.FINALIZE_DROP_DOWN}/>
        </Input>
    );

    const ColorField = (
        <Input title={'Color Property: '} type={MenuTypes.FINALIZE_COLOR}>
            <ModalColor />
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
                    value = {name}
                    onChange={handleNameChange}
                />
            </Input>
            {newMap.template !== TemplateTypes.BLANK ? PropertyField : ''}
            {newMap.template === TemplateTypes.CHOROPLETH || newMap.template === TemplateTypes.BUBBLE ? ColorField : ''}
        </Modal>
    );
};

export default SetData;
