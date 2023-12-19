import { mapsTypes } from "../actionTypes";

export const setMaps = (data) => ({
    type: mapsTypes.SET_MAPS,
    payload: data
});