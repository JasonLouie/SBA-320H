import { Link } from "react-router";

export default function Button({classList, children, path, disabled, type}) {
    return (
        <>
            {disabled || type ? <button className={classList} type={type || "button"}disabled={disabled}>{children}</button> : <Link className={classList} to={path}>{children}</Link>}
        </>
    );
}