import { OPEN_MODAL } from "../action-types/modal-types";

// const CurrentModal = {
//     NONE : "NONE",
//     UPLOAD_MAP: "UPLOAD_MAP",
//     CHOOSE_TEMPLATE: "CHOOSE_TEMPLATE",
//     TEMPLATE_DATA_PROPERTY: "TEMPLATE_DATA_PROPERTY",
//     DELETE_MAP: "DELETE_MAP",
//     RENAME_MAP: "RENAME_MAP",
//     FORK_MODAL: "FORK_MODAL",
//     PUBLISH_MODAL: "PUBLISH_MODAL",
//     EDIT_LABEL: "EDIT_LABEL",
//     EDIT_MAP_PROPERTIES: "EDIT_MAP_PROPERTIES",
//     ADD_DATA_PROP_MODAL: "ADD_DATA_PROP_MODAL",
//     LEGEND_MODAL: "LEGEND_MODAL",
// }

const initialState = {
    currentModal: "NONE"
}

const modal = (state = initialState, action)=> {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                currentModal: action.payload
            }

        default:
            return state;
    }
}

export default modal;