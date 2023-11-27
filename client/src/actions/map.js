import { CREATE_MAP, CREATE_MAP_TEMPLATE, CREATE_MAP_PROPERTIES } from "../action-types/map-types";

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