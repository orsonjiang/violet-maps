import { userTypes } from "../actionTypes";

export const setUser = (data) => ({
    type: userTypes.SET_USER,
    payload: data
});