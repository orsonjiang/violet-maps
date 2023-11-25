import { CREATE_MAP, CREATE_MAP_PROPERTIES, CREATE_MAP_TEMPLATE, SET_MAPS, SET_CURRENT_MAP, UPDATE_MAP_DATA, ADD_COMMENT, SET_LEAFLET_MAP, EXPORT_MAP } from "../action-types/map-types";

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
    leafletMap: null,
    exportType: null,
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
        case UPDATE_MAP_DATA:
            return {
                ...state,
                currentMap: {
                    data: action.payload,
                    ...state.currentMap
                }
            }
        // case PUBLISH_MAP:
        //     return {
        //         ...state,
        //         currentMap: {
        //             publishedDate: action.payload,
        //             ...state.currentMap
        //         }
        //     }
        case ADD_COMMENT: 
            return {
                ...state,
                currentMap: {
                    comments: action.payload,
                    ...state.currentMap
                }
            }
        case SET_LEAFLET_MAP:
            return {
                ...state,
                leafletMap: action.payload
            }
        case EXPORT_MAP:
            return {
                ...state,
                exportType: action.payload
            }
		default:
			return state;
	}
};

export default map;