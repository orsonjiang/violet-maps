import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { capitalize, closeModal } from '../../../helpers';
import { MenuTypes, ModalTypes, PropertyTypes } from '../../../constants';
import { setColor, setDisplay, setLayerProperty, setProperty } from "../../../actions/map";

import Modal from './Modal';
import Input from './components/Input';
import ModalColor from '../Menus/ModalColor';
import ModalDropDown from "../Menus/ModalDropDown";
import TextField from './components/TextField';
import Button from "./components/Button";
import { setModal } from "../../../actions/modal";


const AddLayer = () => {
    const dispatch = useDispatch();

    const { map, layerProperty } = useSelector((state) => state.map.present);

    const filteredList = () => {
        const properties = map.properties.data;
        if (!properties.length) return [];

        Object.filter = (obj, predicate) => 
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );

        const unfiltered = properties[0];

        if (layerProperty === PropertyTypes.LABEL) {
            return Object.keys(properties[0]);
        } else {
            return Object.keys(Object.filter(unfiltered, value => typeof value === 'number'))
        }
    }

    const handleSetDisplay = (display) => {
        dispatch(setDisplay(layerProperty, display === 'show'));
    };

    const handleSetProperty = (property) => {
        dispatch(setProperty(layerProperty, property));
    };


    const handleSetColor = (color) => {
        dispatch(setColor(layerProperty, color));
    };

    const handleConfirm = () => {
        dispatch(setLayerProperty(PropertyTypes.NONE));
        closeModal(dispatch);
    };
    
    const DisplayField = (
        <Input title={'Displayed: '}>
            <ModalDropDown list={['show', 'hide']} handleItem={handleSetDisplay} type={MenuTypes.SET_DISPLAY} currentItem={map.graphics[layerProperty].isDisplayed ? 'show' : 'hide'}/>
        </Input>
    );

    const PropertyField = (
        <Input title={'Data Property: '}>
            <ModalDropDown list={filteredList()} handleItem={handleSetProperty} type={MenuTypes.SET_LAYER_PROPERTY} currentItem={map.graphics[layerProperty].property}/>
        </Input>
    );

    const defaultColor = map.graphics[layerProperty].color ? map.graphics[layerProperty].color : "#8187DC";
    const ColorField = (
        <Input title={'Color Property: '} type={MenuTypes.SET_LAYER_COLOR}>
            <ModalColor handleSetColor={handleSetColor} defaultColor={defaultColor}/>
        </Input>
    );

    const EditLegend = (
        <Input title={'Legend: '} type={MenuTypes.SET_LAYER_LEGEND}>
            <Button onClick={() => dispatch(setModal(ModalTypes.EDIT_LEGEND))}>Edit Properties</Button>
        </Input>
    );

    return (
        <Modal
            title={<div className='flex items-center gap-3 align-bottom'>Edit Layer <div className="flex text-xs font-medium text-indigo-500 align-bottom h-full">Layer: {capitalize(layerProperty)}</div></div>}
            confirm={handleConfirm}
            fields={true}
            close={true}
        >
            {DisplayField}
            {PropertyField}
            {layerProperty === PropertyTypes.CHOROPLETH || layerProperty === PropertyTypes.BUBBLE ? ColorField : ''}
            {layerProperty === PropertyTypes.CHOROPLETH ? EditLegend : ''}
        </Modal>
    );
};

export default AddLayer;