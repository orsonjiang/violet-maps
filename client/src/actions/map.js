import { CREATE_MAP, CREATE_MAP_TEMPLATE, CREATE_MAP_PROPERTIES, SET_MAPS, SET_CURRENT_MAP, UPDATE_MAP, UPDATE_SELECTED_FEATURE} from "../action-types/map-types";

export const createMap = (data) => ({
	type: CREATE_MAP,
	payload: data
});

export const createMapTemplate = (data) => ({
	type: CREATE_MAP_TEMPLATE,
	payload: data
});

export const createMapProperties = (data) => ({
	type: CREATE_MAP_PROPERTIES,
	payload: data
});

export const setMaps = (data) => ({
	type: SET_MAPS,
	payload: data
});


export const setCurrentMap = (data) => ({
	type: SET_CURRENT_MAP,
	payload: data
});

// NEW CODE
export const updateSelectedFeature = (data) => ({
	type: UPDATE_SELECTED_FEATURE,
	payload: data
});

// export const updateMapData = (data) => ({
// 	type: UPDATE_MAP_DATA,
// 	payload: data
// });



export const updateMapInStore = (data) => ({
	type: UPDATE_MAP,
	payload: data
});

