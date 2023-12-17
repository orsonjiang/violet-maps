import { menuTypes } from "../actionTypes";
import { MenuTypes } from "../constants";

const initialState = {
    menu: MenuTypes.NONE
}

const menu = (state = initialState, action)=> {
    switch (action.type) {
        case menuTypes.SET_MENU:
            return {
                menu: action.payload
            }

        default:
            return state;
    }
}

export default menu;