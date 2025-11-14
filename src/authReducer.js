export default function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN": // Successful login or signup
            return action.payload;
        case "LOGOUT":
            return null;
        case "ADD_FAVORITE": {
            const {userId, manga} = action.payload;
            return state.map(s => {
                if (s.id === userId) {
                    s.favorites[manga.id] = manga;
                }
                return s;
            });
        }
        case "REMOVE_FAVORITE": {
            const {userId, mangaId} = action.payload;
            return state.map(s => {
                if (s.id === userId) {
                    delete s.favorites[mangaId];
                }
                return s;
            });
        }
        default:
            return state;
    }
}