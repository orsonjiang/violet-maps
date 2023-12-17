import { newMapTypes } from "../actionTypes";

export const setNewMap = (data) => ({
    type: newMapTypes.SET_NEW_MAP,
    payload: data
});

export const setTemplate = (data) => ({
    type: newMapTypes.SET_TEMPLATE,
    payload: data
});

export const setName = (data) => ({
    type: newMapTypes.SET_NAME,
    payload: data
});

export const setProperty = (data) => ({
    type: newMapTypes.SET_PROPERTY,
    payload: data
});

export const setColor = (data) => ({
    type: newMapTypes.SET_COLOR,
    payload: data
});