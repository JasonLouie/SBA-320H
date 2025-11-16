import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../utils/auth";
import { validateSignUp } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import Field from "../components/forms/Field";
import AuthForm from "../components/forms/AuthForm";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../context/useDocumentTitle";

export default function Signup() {
    useDocumentTitle("Sign Up");
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    const { dispatch } = useAuth();
    const { setHeading } = useHeading();
    const navigate = useNavigate();

    useEffect(() => {
        setHeading("");
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();

        // Form validation
        const validationErrors = validateSignUp(formData);
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        // Register user
        const { name, username, email, password } = formData;
        const result = registerUser({ name, username, email, password });
        if ("id" in result) { // Registration successful
            dispatch({ type: "LOGIN", payload: result });
            navigate("/profile");
        } else { // Registration failed because username and/or email is not unique
            setFormErrors(result);
        }
    }

    return (
        <>
            <AuthForm type="signup" title="Sign Up" handleSubmit={handleSubmit}>
                <Field fieldName="Name" name="name" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                <Field fieldName="Username" name="username" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                <Field fieldName="Email" name="email" type="email" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                <Field fieldName="Password" name="password" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                <Field fieldName="Confirm Password" name="confirmPassword" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
            </AuthForm>
        </>
    );
}