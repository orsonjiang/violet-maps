import { CREATE_MAP, CREATE_MAP_PROPERTIES, CREATE_MAP_TEMPLATE } from "../action-types/map-types";

const initialState = {
    newMap: {
        name: "",
        data: {},
        template: "",
        dataProperty: "",
        color: ""
    },
	currentMap: null,
}

const map = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MAP:
			return {
				...initialState,
                newMap: {
                    ...initialState.newMap,
                    data: action.payload
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

		default:
			return state;
	}
};

export default map;