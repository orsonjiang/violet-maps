import { mapTypes } from "../actionTypes";

export const setMaps = (data) => ({
    type: mapTypes.SET_MAPS,
    payload: data
});