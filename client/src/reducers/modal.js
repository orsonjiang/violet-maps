import { modalTypes } from "../actionTypes";
import { ModalTypes } from "../constants";

const initialState = {
    modal: ModalTypes.NONE
}

const modal = (state = initialState, action)=> {
    switch (action.type) {
        case modalTypes.SET_MODAL:
            return {
                modal: action.payload
            }

        default:
            return state;
    }
}

export default modal;