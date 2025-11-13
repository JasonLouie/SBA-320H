import { useContext, useEffect, useRef } from "react";
import "../styles/user-form.css";
import { Link } from "react-router";
import UserContext from "../context/UserContext";

export default function Signup() {
    const {userState, dispatch} = useContext(UserContext);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (emailRef.current.value && usernameRef.current.value && passwordRef.current.value) {
            dispatch({type: "SIGNUP", user: {email: emailRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value, favorites: {} }});
            if (userState.errors) {
                if (userState.errors.email) {
                    emailRef.current.setCustomValidity(userState.errors.email);
                    emailRef.current.showValidity();
                } else if (userState.errors.username) {
                    usernameRef.current.setCustomValidity(userState.errors.username);
                    usernameRef.current.showValidity();
                }
            }
        }
    }

    return (
        <>
            <h1 className="signup form-name">Sign Up</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email
                        <input className="signup field" type="email" name="email" id="email" ref={emailRef} />
                    </label>
                    <label htmlFor="username">
                        Username
                        <input className="signup field" type="text" name="username" id="username" ref={usernameRef} />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input className="signup field" type="password" name="password" id="password" ref={passwordRef} />
                    </label>
                    <button type="submit" className="form-submit">Sign Up</button>
                </form>
            </div>
            <p className="form-text">Already signed up? Login <span className="form-span"><Link to="/login" className="login">here</Link></span></p>
        </>
    );
}