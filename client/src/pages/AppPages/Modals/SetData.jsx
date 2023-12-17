import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setName } from '../../../actions/newMap';
import { closeModal } from '../../../helpers';
import apis from '../../../api/api';

import Modal from './Modal';
import Input from './components/Input';
import { InputTypes } from '../../../constants';

const SetData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newMap = useSelector((state) => state.newMap);
    const [propertiesList, setPropertiesList] = useState();
    const { template, properties } = newMap;

    useEffect(() => {
        const list = []; // List of data props for user to choose from.
        for (const property of properties) {
            for (const [key, value] of Object.entries(property)) {
                switch (template) {
                    case 'string':
                        if (typeof value == 'string') {
                            list.push(key);
                        }
                        break;

                    case '':
                        if (
                            typeof value == 'number' ||
                            typeof value == 'string'
                        ) {
                            list.push(key);
                        }
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

    return (
        <Modal
            title={'Finalize Map Info'}
            confirm={handleConfirm}
            fields={true}
        >
            <Input
                type={InputTypes.TEXT}
                title={'Name: '}
                placeholder={'Map Name'}
                onChange={handleNameChange}
            />
            {/* <Input
                type={InputTypes.DROP_DOWN}
                title={'Data Property: '}
                onClick={() => {}}
                list={propertiesList}
            />
            <Input
                type={InputTypes.COLOR}
                title={'Select Color: '}
                onClick={() => {}}
            /> */}
        </Modal>
    );
};

export default SetData;
