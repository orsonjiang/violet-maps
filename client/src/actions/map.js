import { mapTypes } from "../actionTypes";

export const setMap = (data) => ({
    type: mapTypes.SET_MAP,
    payload: data
});

export const setMapContainer = (data) => ({
    type: mapTypes.SET_MAP_CONTAINER,
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

export const setProperty = (type, data) => ({
    type: mapTypes.SET_PROPERTY,
    payload: {
        type: type,
        data: data
    }
});

export const setColor = (type, data) => ({
    type: mapTypes.SET_COLOR,
    payload: {
        type: type,
        data: data
    }
});

export const setLegend = (data) => ({
    type: mapTypes.SET_LEGEND,
    payload: data
});

export const setImage = (data) => ({
    type: mapTypes.SET_IMAGE,
    payload: data
});

export const setLayerProperty = (data) => ({
    type: mapTypes.SET_LAYER_PROPERTY,
    payload: data
});

export const setDisplay = (type, data) => ({
    type: mapTypes.SET_DISPLAY,
    payload: {
        type: type,
        data: data
    }
});

export const setName = (data) => ({
    type: mapTypes.SET_NAME,
    payload: data
});


export const addComment = (data) => ({
    type: mapTypes.ADD_COMMENT,
    payload: data
});
