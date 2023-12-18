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
                template: initialState.template,
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
			const propertyKey = state.template === TemplateTypes.NUMERICAL || state.template === TemplateTypes.STRING ? "label" : state.template.toLowerCase();
			if (!graphics[propertyKey]) graphics[propertyKey] = {};
			if (propertyKey === "label") graphics[propertyKey]['showLabels'] = true;
			graphics[propertyKey]['property'] = action.payload;
			graphics['label']['property'] = action.payload;
			if (propertyKey === "choropleth") graphics.legend.visible = true;

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