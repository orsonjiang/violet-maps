import { SET_VIEW, SET_SEARCH_TEXT, SET_SEARCH_BY, SET_SORT_BY } from "../action-types/home-types"; 

const initialState = {
    view: "NONE",
    searchBy: "Map Name",
    searchText: "",
    sortBy: "",
}

const home = (state = initialState, action)=> {
    switch(action.type) {
        case SET_VIEW:
            return {
                ...state,
                view: action.payload,
                searchBy: "Map Name"
            }
        case SET_SEARCH_BY:
            return {
                ...state,
                searchBy: action.payload
            }
        default:
            return state;
    }
}

export default home;