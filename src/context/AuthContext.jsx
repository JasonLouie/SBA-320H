import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer from "../authReducer";
import { updateUser } from "../utils/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    function getInitialUser(initialValue) {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : initialValue;
    }

    const [state, dispatch] = useReducer(authReducer, null, getInitialUser);

    // Update the user item in localStorage whenever the state changes
    useEffect(() => {
        if (state) {
            localStorage.setItem("user", JSON.stringify(state));
        } else {
            // Update that user in the users key for localStorage
            updateUser(state);
            localStorage.removeItem("user");
        }
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}