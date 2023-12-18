import { mapsTypes } from "../actionTypes";

const initialState = {
    maps: [],
}

const maps = (state = initialState, action) => {
    switch (action.type) {
        case mapsTypes.SET_MAPS:
            return {
                ...state,
                maps: action.payload
            }

        default:
            return state;
    }
};

export default maps;