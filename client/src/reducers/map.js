import { mapTypes } from "../actionTypes";

const initialState = {
    map: null,
    maps: [],
    createMap: {
        name: "",
        geometry: {},
        properties: {},
        graphics: {},
        template: '',
    }
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

        case mapTypes.SET_CREATE_MAP:
            return {
                ...state,
                createMap: action.payload
            }
        
        case mapTypes.SET_TEMPLATE:
            return {
                ...state,
                createMap: {
                    ...state.createMap,
                    template: action.payload
                }
            }

        default:
            return state;
    }
};

export default map;