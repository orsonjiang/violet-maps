import { mapTypes } from "../actionTypes";

const initialState = {
    map: null,
    maps: [],
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case mapTypes.SET_MAP:
            return {
                ...state,
                map: action.payload
            }

        case mapTypes.SET_MAPS:
            return {
                ...state,
                maps: action.payload
            }

        default:
            return state;
    }
};

export default map;