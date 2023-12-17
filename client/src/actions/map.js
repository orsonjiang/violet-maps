import { mapTypes } from "../actionTypes";

export const setMap = (data) => ({
    type: mapTypes.SET_MAP,
    payload: data
});

export const toggleLabel = () => ({
    type: mapTypes.TOGGLE_LABEL,
});