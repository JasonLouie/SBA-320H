import { useState } from "react";
import "../styles/user-form.css";
import { Link } from "react-router";
import { validateCredentials } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { dispatch } = useAuth();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();
        const { username, password } = formData;
        if (username && password) {
            const result = validateCredentials(username, password);
            if (typeof result === "string") {
                setFormError(result);
            } else {
                dispatch({ type: "LOGIN", payload: result });
                navigate("/profile");
            }
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <h1 className="login form-name">Login</h1>
                <label htmlFor="username">
                    Username
                    <input className="login field" type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
                </label>
                {formError && <p className={`login error`}>{formError}</p>}
                <label htmlFor="password" className="password">
                    Password
                    <input className="login field" type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
                    <button className={`password-icon ${showPassword ? "" : "hide"}`} type="button" onClick={() => setShowPassword(!showPassword)}><img src="/images/password-icon.png" alt="" /></button>
                </label>
                <button type="submit" className="form-submit">Login</button>
            </form>
            <p className="form-text">Not signed up yet? Sign up <span className="form-span"><Link to="/signup" className="signup">here</Link></span></p>
        </div>
    );
}