import { CREATE_MAP, CREATE_MAP_PROPERTIES, CREATE_MAP_TEMPLATE, SET_MAPS, SET_CURRENT_MAP, UPDATE_MAP, UPDATE_SELECTED_FEATURE } from "../action-types/map-types";

const initialState = {
    newMap: {
        name: "",
        data: {},
        features: [],
        username: "",
        template: "",
        dataProperty: "",
        color: ""
    },
	currentMap: null,
    selectedFeature: null, // NEW CODE: is set when user clicks on a feature, holds the feature ref
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
                    features: action.payload["features"], 
                    username: action.payload["username"]
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
        case UPDATE_SELECTED_FEATURE: // NEW CODE
            return {
                ...state,
                selectedFeature: action.payload
            }
        // case UPDATE_MAP_DATA:
        //     return {
        //         ...state,
        //         currentMap: {
        //             data: action.payload,
        //             ...state.currentMap
        //         }
        //     }
        case UPDATE_MAP:
            return {
                ...state,
                currentMap: {
                    data: { ...state.currentMap.data },
                    ...action.payload
                }
            }
        // case SET_LEAFLET_MAP:
        //     return {
        //         ...state,
        //         leafletMap: action.payload
        //     }
        // case EXPORT_MAP:
        //     return {
        //         ...state,
        //         exportType: action.payload
        //     }
		default:
			return state;
	}
};

export default map;