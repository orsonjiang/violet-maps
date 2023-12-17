import { menuTypes } from "../actionTypes";

export const setMenu = (data) => ({
    type: menuTypes.SET_MENU,
    payload: data
});