import { SET_COMMENTS } from "../constants/action-types";

export const setComments = (comments) => ({
	type: SET_COMMENTS,
	payload: comments
})