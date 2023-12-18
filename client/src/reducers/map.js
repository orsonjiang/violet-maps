import { mapTypes } from "../actionTypes";

const initialState = {
    map: null,
    showLabel: {
        a: false
    }
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case mapTypes.SET_MAP:
            return {
                ...state,
                map: action.payload
            }

        case mapTypes.TOGGLE_LABEL:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        label: {
                            ...state.map.graphics.label,
                            showLabels: !state.map.graphics.label.showLabels
                        }
                    }
                }
            };

        case mapTypes.SET_FONT:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        label: {
                            ...state.map.graphics.label,
                            fontStyle: action.payload
                        }
                    }
                }
            };

        default:
            return state;
    }
};

export default map;