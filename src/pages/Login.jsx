import { useState } from "react";
import "../styles/user-form.css";
import { Link, useNavigate } from "react-router";
import { validateCredentials } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import Field from "../components/forms/Field";
import { validateLogin } from "../utils/validate";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();
        const { username, password } = formData;

        const validationErrors = validateLogin(username, password);
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        const result = validateCredentials(username, password);
        if ("id" in result) {
            dispatch({ type: "LOGIN", payload: result });
            navigate("/profile");
        } else {
            setFormErrors(result);
        }
    }

    return (
        <>
            <h1 className="login form-name">Login</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <Field fieldName="Username" name="username" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <Field fieldName="Password" name="password" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <button type="submit" className="form-submit">Login</button>
                </form>
                <p className="form-text">Not signed up yet? Sign up <span className="form-span"><Link to="/signup" className="signup">here</Link></span></p>
            </div>
        </>
    );
}