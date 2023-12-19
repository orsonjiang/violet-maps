import { collateTypes } from "../actionTypes";

export const setSearchText = (data) => ({
    type: collateTypes.SET_SEARCH_TEXT,
    payload: data
});

export const setSearchBy = (data) => ({
    type: collateTypes.SET_SEARCH_BY,
    payload: data
});

export const setSortBy = (data) => ({
    type: collateTypes.SET_SORT_BY,
    payload: data
});