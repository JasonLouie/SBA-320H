import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer from "../authReducer";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    function getInitialUser(initialValue) {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : initialValue;
    }

    const [state, dispatch] = useReducer(authReducer, null, getInitialUser);

    useEffect(() => {
        if (state) {
            localStorage.setItem("user", JSON.stringify(newUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}