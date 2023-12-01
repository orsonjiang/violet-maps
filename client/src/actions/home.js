import { SET_SEARCH_TEXT, SET_SEARCH_BY, SET_SORT_BY } from "../action-types/home-types";

export const setSearchText = (data) => ({
    type: SET_SEARCH_TEXT,
    payload: data
});

export const setSearchBy = (data) => ({
    type: SET_SEARCH_BY,
    payload: data
});

export const setSortBy = (data) => ({
    type: SET_SORT_BY,
    payload: data
});