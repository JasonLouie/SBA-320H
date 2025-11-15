export default function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN": // Successful login or signup
            return action.payload;
        case "LOGOUT":
            return null;
        case "ADD_FAVORITE": {
            const {manga} = action.payload;
            return {...state, favorites: {...state.favorites, [manga.id]: manga}};
        }
        case "REMOVE_FAVORITE": {
            const {manga} = action.payload;
            const newState = {...state};
            delete newState.favorites[manga.id];
            return newState;
        }
        default:
            return state;
    }
}