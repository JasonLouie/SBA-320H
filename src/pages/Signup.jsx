import { useState } from "react";
import "../styles/user-form.css";
import { Link, useNavigate } from "react-router";
import { checkUnique, registerUser } from "../utils/auth";
import { validateSignUp } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import Field from "../components/forms/Field";

export default function Signup() {
    const { dispatch } = useAuth();

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();

        const { name, username, email, password } = formData;

        // Form validation
        const validationErrors = validateSignUp(formData);
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        // Unique checks
        const uniqueErrors = checkUnique(username, email);
        if (Object.keys(uniqueErrors).length > 0) {
            setFormErrors(uniqueErrors);
            return;
        }

        // Register user
        console.log("Registering user...");
        const user = registerUser({ name, username, email, password });
        dispatch({type: "LOGIN", payload: user});
        navigate("/profile");
    }

    return (
        <>
            <h1 className="signup form-name">Sign Up</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate={true}>
                    <Field fieldName="Name" name="name" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <Field fieldName="Username" name="username" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <Field fieldName="Email" name="email" type="email" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <Field fieldName="Password" name="password" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <Field fieldName="Confirm Password" name="confirmPassword" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                    <button type="submit" className="form-submit">Sign Up</button>
                </form>
            </div>
            <p className="form-text">Already signed up? Login <span className="form-span"><Link to="/login" className="login">here</Link></span></p>
        </>
    );
}