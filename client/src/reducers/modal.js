import { CLOSE_MODAL, OPEN_MODAL } from "../action-types/modal-types";

// const CurrentModal = {
//     NONE : "NONE",
//     UPLOAD_MAP: "UPLOAD_MAP",
//     CHOOSE_TEMPLATE: "CHOOSE_TEMPLATE",
//     TEMPLATE_DATA_PROPERTY: "TEMPLATE_DATA_PROPERTY",
//     DELETE_MAP: "DELETE_MAP",
//     RENAME_MAP: "RENAME_MAP",
//     FORK_MAP: "FORK_MAP",
//     PUBLISH: "PUBLISH",
//     EDIT_LABEL: "EDIT_LABEL",
//     EDIT_MAP_PROPERTIES: "EDIT_MAP_PROPERTIES",
//     ADD_DATA_PROPERTY: "ADD_DATA_PROPERTY",
//     EDIT_LEGEND: "EDIT_LEGEND",
// }

const initialState = {
    currentModal: null
}

const modal = (state = initialState, action)=> {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                currentModal: action.payload
            }
        case CLOSE_MODAL:
            return {
                currentModal: null
            }
        default:
            return state;
    }
}

export default modal;