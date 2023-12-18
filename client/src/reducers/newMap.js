import { newMapTypes } from "../actionTypes";
import { TemplateTypes } from "../constants";

const initialState = {
	name: "",
	geometry: {},
	properties: {},
	graphics: {},
	template: TemplateTypes.BLANK,
}

const newMap = (state = initialState, action) => {
	const graphics = state.graphics;
    switch (action.type) {
        case newMapTypes.SET_NEW_MAP:
            return {
				...initialState,
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
		
		case newMapTypes.SET_PROPERTY:
			if (state.template === TemplateTypes.NUMERICAL || state.template === TemplateTypes.STRING) {
				const propertyKey = state.template.toLowerCase();
				if (!graphics[propertyKey]) graphics[propertyKey] = {};
				graphics[propertyKey]['property'] = action.payload;

				if (propertyKey === "choropleth") graphics.legend.visible = true;
			}
			if (propertyKey === "label") graphics[propertyKey]['showLabels'] = true;

			return {
				...state,
				graphics: graphics,
			}

		case newMapTypes.SET_COLOR:
			const colorKey = state.template.toLowerCase();
			if (!graphics[colorKey]) graphics[colorKey] = {};
			graphics[colorKey]['color'] = action.payload;

			return {
				...state,
				graphics: graphics,
			}
		
        default:
            return state;
    }
};

export default newMap;