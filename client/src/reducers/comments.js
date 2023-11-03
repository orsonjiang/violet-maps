import { SET_COMMENTS } from "../constants/action-types";

const initialState = {
	comments: []
}

const comments = (state = initialState, action) => {
	switch (action.type) {
		case SET_COMMENTS:
			return {
				...state,
				comments: action.payload
			}

		default:
			return state;
	}
};

export default comments;