import { collateTypes } from "../actionTypes";

const initialState = {
    searchBy: "name",
    searchText: "",
    sortBy: "",
}

const collate = (state = initialState, action)=> {
    switch(action.type) {
        case collateTypes.SET_SEARCH_BY:
            return {
                ...state,
                searchBy: action.payload
            }

        case collateTypes.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            }

        case collateTypes.SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }

        default:
            return state;
    }
}

export default collate;