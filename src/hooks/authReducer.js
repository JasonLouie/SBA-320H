export default function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN": // Successful login or signup
            return action.payload;
        case "LOGOUT":
            return null;
        case "ADD_FAVORITE": {
            const {id, title, img} = action.payload;
            return {...state, favorites: {...state.favorites, [id]: {id, title, img}}};
        }
        case "REMOVE_FAVORITE": {
            const newState = {...state};
            delete newState.favorites[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}