import { Link } from "react-router";
import "../../styles/authForm.css";

export default function AuthForm({ children, title, type, handleSubmit }) {
    return (
        <>
            <h1 className={`${type} form-name`}>{title}</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate={true}>
                    {children}
                    <button type="submit" className="form-submit">{title}</button>
                    {type === "login" ? <p className="form-text">Not signed up yet? Sign up <span className="form-span"><Link to="/signup" className="signup">here</Link></span></p> : <p className="form-text">Already signed up? Login <span className="form-span"><Link to="/login" className="login">here</Link></span></p>}
                </form>
            </div>
        </>
    );
}