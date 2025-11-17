import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateCredentials } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import Field from "../components/forms/Field";
import { validateLogin } from "../utils/validate";
import AuthForm from "../components/forms/AuthForm";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Login() {
    useDocumentTitle("Login");
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("");
    }, []);

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
            <AuthForm type="login" title="Login" handleSubmit={handleSubmit}>
                <Field fieldName="Username" name="username" type="text" formData={formData} formErrors={formErrors} handleChange={handleChange} />
                <Field fieldName="Password" name="password" type="password" formData={formData} formErrors={formErrors} handleChange={handleChange} />
            </AuthForm>
        </>
    );
}