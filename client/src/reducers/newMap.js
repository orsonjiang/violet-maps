import { newMapTypes } from "../actionTypes";

const initialState = {
	name: "",
	geometry: {},
	properties: {},
	graphics: {},
	template: '',
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case newMapTypes.SET_NEW_MAP:
            return {
                ...state,
                ...action.payload,
            }
		
		case newMapTypes.SET_TEMPLATE:
			return {
				...state,
				template: action.payload,
			}

		case newMapTypes.SET_NAME:
			return {
				...state,
				name: action.payload,
			}

		case newMapTypes.SET_COLOR:
			const graphics = state.graphics;
			graphics[state.template]['color'] = action.payload;

			return {
				...state,
				graphics: graphics,
			}
		
        default:
            return state;
    }
};

export default map;