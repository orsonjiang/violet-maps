import { mapTypes } from "../actionTypes";

export const setMap = (data) => ({
    type: mapTypes.SET_MAP,
    payload: data
});

export const setMaps = (data) => ({
    type: mapTypes.SET_MAPS,
    payload: data
});