import { useState } from "react";
import "../styles/user-form.css";
import { Link } from "react-router";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <h1 className="login form-name">Login</h1>
                <label htmlFor="username">
                    Username
                    <input className="login field" type="text" name="username" id="username" onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    Password
                    <input className="login field" type="password" name="password" id="password" onChange={handleChange} />
                </label>
                <button type="submit" className="form-submit">Login</button>
            </form>
            <p className="form-text">Not signed up yet? Sign up <span className="form-span"><Link to="/signup" className="signup">here</Link></span></p>
        </div>
    );
}