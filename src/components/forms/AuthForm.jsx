import "../../styles/authForm.css";
import Button from "../Button";

export default function AuthForm({ children, title, type, handleSubmit }) {
    return (
        <>
            <h1 className={`${type} form-name`}>{title}</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate={true}>
                    {children}
                    <Button type="submit" className="form-submit">{title}</Button>
                    <p className="form-text">{type === "login" ? "Not signed up yet? Sign up " : "Already signed up? Login "}<span className="form-span"><Button path={type === "login" ? "/signup" : "/login"} className={type === "login" ? "signup" : "login"}>here</Button></span></p>
                </form>
            </div>
        </>
    );
}