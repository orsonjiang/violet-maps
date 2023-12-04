
const initialState = {
    map: null,
    maps: []
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                map: action.payload.map
            }
        case SET_MAPS:
            return {
                ...state,
                maps: action.payload.maps
            }

        default:
            return state;
    }
};

export default map;