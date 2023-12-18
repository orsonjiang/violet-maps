import { userTypes } from '../actionTypes';

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
        case userTypes.SET_USER:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};

export default user;