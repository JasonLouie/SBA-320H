import { Link } from "react-router";

export default function Button({className, children, path, disabled, type, onClick}) {
    return (
        <>
            {disabled || type || !path ? <button className={`button ${className}`} type={type || "button"} disabled={disabled} onClick={onClick}>{children}</button> : <Link className={`link ${className}`} to={path} onClick={onClick}>{children}</Link>}
        </>
    );
}