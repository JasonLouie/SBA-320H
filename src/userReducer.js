import { registerUser, removeFavorite, validateCredentials } from "./utils/auth";

export default function userReducer(state, action) {
    switch (action.type) {
        case "SIGNUP":
            // Returns errors if user's username and/or email aren't unique. Otherwise the new user object
            const result = registerUser(action.user);
            return result.errors ? result.errors : action.user;
        case "LOGIN":
            // Returns either the errors for logging in or the user itself if success
            return validateCredentials(action.username, action.password);
        case "ADD_FAVORITE":
            return addFavorite(action.userId, action.manga);
        case "REMOVE_FAVORITE":
            return removeFavorite(action.userId, action.mangaId);
        default:
            return state;
    }
}