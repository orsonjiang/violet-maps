import { SET_SEARCH_TEXT, SET_SEARCH_BY, SET_SORT_BY } from "../action-types/home-types"; 

const initialState = {
    searchBy: "Map Name",
    searchText: "",
    sortBy: "",
}

const home = (state = initialState, action)=> {
    switch(action.type) {
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