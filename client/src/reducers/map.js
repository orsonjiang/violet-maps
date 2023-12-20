import { mapTypes } from "../actionTypes";
import { PropertyTypes } from "../constants";

const initialState = {
    map: null,
    region: null,
    container: null,
    layerProperty: PropertyTypes.NONE,
    thumbnail: false,
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

        case mapTypes.SET_MAP_CONTAINER:
            return {
                ...state,
                container: action.payload
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
                            isDisplayed: !state.map.graphics.label.isDisplayed
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
            newMap.graphics[action.payload.type].property = action.payload.data;
            return {
                ...state,
                map: {
                    ...newMap
                }
            };
        
        case mapTypes.SET_COLOR:
            newMap.graphics[action.payload.type].color = action.payload.data;
            return {
                ...state,
                map: {
                    ...newMap
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
        case mapTypes.SET_IMAGE:
            return {
                ...state,
                map: {
                    ...state.map,
                    social: {
                        ...state.map.social,
                        image: action.payload
                    }
                }
            };

        case mapTypes.SET_LAYER_PROPERTY:
            return {
                ...state,
                layerProperty: action.payload
            };
        
        case mapTypes.SET_DISPLAY:
            newMap.graphics[action.payload.type].isDisplayed = action.payload.data;
            return {
                ...state,
                map: {
                    ...newMap
                }
            };

        case mapTypes.SET_NAME:
            newMap.name = action.payload;
            return {
                ...state,
                map: {
                    ...newMap
                }
            }  
        case mapTypes.ADD_COMMENT:
            newMap.social.comments.unshift(action.payload);
            return {
                ...state,
                map: {
                    ...newMap
                }
            }  

        case mapTypes.SET_TAGS:
            newMap.tags = action.payload;
   
            return {
                ...state,
                map: {
                    ...newMap
                }
            }   

        case mapTypes.SET_SOCIAL:
            return {
                ...state,
                map: {
                    ...state.map,
                    social: {
                        ...action.payload
                    }
                }
            }   

        case mapTypes.SET_THUMBNAIL:
            return {
                ...state,
                thumbnail: action.payload
            }   

        default:
            return state;
    }
};

export default map;