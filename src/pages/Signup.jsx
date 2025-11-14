import { useContext, useEffect, useState } from "react";
import "../styles/user-form.css";
import { Link, useNavigate } from "react-router";
import { checkUnique, registerUser } from "../utils/auth";
import { validateSignUp } from "../utils/validate";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const { dispatch } = useAuth();

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);

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

    const showError = (field) => {
        return <div className="errors">{formErrors[field].map((err, i) => <p key={`${field}-${i}`} className={`signup error ${field}`}>{err}</p>)}</div>;
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            <h1 className="signup form-name">Sign Up</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="name">
                        Name
                        <input className="signup field" type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                    </label>
                    {formErrors.name?.length > 0 && showError("name")}
                    <label htmlFor="username">
                        Username
                        <input className="signup field" type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
                    </label>
                    {formErrors.username?.length > 0 && showError("username")}
                    <label htmlFor="email">
                        Email
                        <input className="signup field" type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                    </label>
                    {formErrors.email?.length > 0 && showError("email")}
                    <label htmlFor="password" className="password">
                        Password
                        <input className="signup field password" type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
                        <button className={`password-icon ${showPassword ? "" : "hide"}`} type="button" onClick={() => setShowPassword(!showPassword)}><img src="/images/password-icon.png" alt="" /></button>
                    </label>
                    {formErrors.password?.length > 0 && showError("password")}
                    <label htmlFor="confirmPassword">
                        Confirm Password
                        <input className="signup field" type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </label>
                    <button type="submit" className="form-submit">Sign Up</button>
                </form>
            </div>
            <p className="form-text">Already signed up? Login <span className="form-span"><Link to="/login" className="login">here</Link></span></p>
        </>
    );
}