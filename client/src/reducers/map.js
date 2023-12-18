import { mapTypes } from "../actionTypes";

const initialState = {
    map: null,
    region: null,
    newTemplateLayer: null // hold the template when you add a layer
}

const map = (state = initialState, action) => {
    const newMap = JSON.parse(JSON.stringify(state.map)); ;
    const index = state.region ? state.region.feature.properties.index : -1;

    switch (action.type) {
        case mapTypes.SET_MAP:
            return {
                ...state,
                map: action.payload
            }

        case mapTypes.SET_REGION:
            return {
                ...state,
                region: action.payload
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

        case mapTypes.SET_FONT_SIZE:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        label: {
                            ...state.map.graphics.label,
                            fontSize: action.payload
                        }
                    }
                }
            };
        
        case mapTypes.SET_POSITION:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        label: {
                            ...state.map.graphics.label,
                            position: action.payload
                        }
                    }
                }
            };     

        case mapTypes.SET_TEXT:
            newMap.properties.data[index][state.map.graphics.label.property] = action.payload;
            return {
                ...state,
                map: {
                    ...newMap
                }
            };

        case mapTypes.SET_FILL:
            newMap.graphics.style[index].fill = action.payload;
            return {
                ...state,
                map: {
                    ...newMap
                }
            };

        case mapTypes.SET_BORDER:
            newMap.graphics.style[index].border = action.payload;
            return {
                ...state,
                map: {
                    ...newMap
                }
            };
        
        case mapTypes.SET_PROPERTY:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        label: {
                            ...state.map.graphics.label,
                            property: action.payload
                        }
                    }
                }
            };
        case mapTypes.SET_LEGEND:
            return {
                ...state,
                map: {
                    ...state.map,
                    graphics: {
                        ...state.map.graphics,
                        legend: {
                            ...action.payload
                        }
                    }
                }
            };
        case mapTypes.SET_TEMPLATE_LAYER:
            return {
                ...state,
                newTemplateLayer: action.payload
            }

        case mapTypes.REMOVE_TEMPLATE_LAYER:
            delete newMap.graphics[action.payload];
            return {
                ...state,
                map: {
                    ...newMap
                }
            }
        case mapTypes.ADD_TEMPLATE_LAYER:
            newMap.graphics[state.newTemplateLayer.toLowerCase()] = {
                property: state.map.graphics.label
            };
            if (state.newTemplateLayer != "Heat") {
                newMap.graphics[state.newTemplateLayer.toLowerCase()]["color"] = action.payload;
            }
            
            return {
                ...state,
                map: {
                    ...newMap
                }
            }
        default:
            return state;
    }
};

export default map;