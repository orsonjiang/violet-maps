import { SET_USER } from "../action-types/user-types";

export const setUser = (data) => ({
	type: SET_USER,
	payload: data
});