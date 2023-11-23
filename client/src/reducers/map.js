import { CREATE_MAP, CREATE_MAP_PROPERTIES, CREATE_MAP_TEMPLATE, SET_MAPS, SET_CURRENT_MAP, UPDATE_MAP_DATA } from "../action-types/map-types";

const initialState = {
    newMap: {
        name: "",
        data: {},
        features: [],
        template: "",
        dataProperty: "",
        color: ""
    },
	currentMap: null,
    maps: []
}

const map = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MAP:
			return {
				...initialState,
                newMap: {
                    ...initialState.newMap,
                    data: action.payload["data"],
                    features: action.payload["features"]
                }
			}
        case CREATE_MAP_TEMPLATE:
            return {
                ...state,
                newMap: {
                    ...state.newMap,
                    template: action.payload
                }
            }
        case CREATE_MAP_PROPERTIES:
            return {
                ...state,
                newMap: {
                    ...state.newMap,
                    ...action.payload
                }
            }
        case SET_MAPS:
            return {
                ...state,
                maps: action.payload
            }
        case SET_CURRENT_MAP:
            return {
                ...state,
                currentMap: action.payload
            }
        case UPDATE_MAP_DATA:
            return {
                ...state,
                currentMap: {
                    data: action.payload,
                    ...currentMap
                }
            }
		default:
			return state;
	}
};

export default map;