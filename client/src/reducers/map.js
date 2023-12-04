import { mapTypes } from "../actionTypes";

const initialState = {
    map: null,
    maps: [],
    newMap: {
        name: "",
        geometry: {},
        properties: {},
        graphics: {},
    }
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case mapTypes.SET_MAP:
            return {
                ...state,
                map: action.payload.map
            }

        case mapTypes.SET_MAPS:
            return {
                ...state,
                maps: action.payload.maps
            }

        case mapTypes.SET_CREATE_MAP:
            return {
                ...state,
                newMap: action.payload
            }

        default:
            return state;
    }
};

export default map;