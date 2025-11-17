import { useEffect } from "react";
import { useHeading } from "../../context/HeadingContext";
import "../../styles/authForm.css";
import Button from "../Button";

export default function AuthForm({ children, title, type, handleSubmit }) {
    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("");
    }, []);
    return (
        <>
            <h1 className={`${type} form-name`}>{title}</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate={true}>
                    {children}
                    <Button type="submit" className="form-submit">{title}</Button>
                    <p className="form-text"><Button path={type === "login" ? "/signup" : "/login"} className={type === "login" ? "signup" : "login"}>{type === "login" ? "Already have an account?" : "Create new account"}</Button></p>
                </form>
            </div>
        </>
    );
}