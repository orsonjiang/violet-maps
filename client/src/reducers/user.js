import { SET_USER } from "../action-types/user-types";

const initialState = {
	user: {
		_id: "",
		username: "",
		firstName: "",
		lastName: "",
		email: "",
	},
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload
			}

		default:
			return state;
	}
};

export default user;