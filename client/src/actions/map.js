import { mapTypes } from "../actionTypes";

export const setMap = (data) => ({
    type: mapTypes.SET_MAP,
    payload: data
});

export const setRegion = (data) => ({
    type: mapTypes.SET_REGION,
    payload: data
});

export const toggleLabel = () => ({
    type: mapTypes.TOGGLE_LABEL,
});

export const setFont = (data) => ({
    type: mapTypes.SET_FONT,
    payload: data
});

export const setFontSize = (data) => ({
    type: mapTypes.SET_FONT_SIZE,
    payload: data
});

export const setPosition = (data) => ({
    type: mapTypes.SET_POSITION,
    payload: data
});

export const setText = (data) => ({
    type: mapTypes.SET_TEXT,
    payload: data
});

export const setFill = (data) => ({
    type: mapTypes.SET_FILL,
    payload: data
});

export const setBorder = (data) => ({
    type: mapTypes.SET_BORDER,
    payload: data
});
