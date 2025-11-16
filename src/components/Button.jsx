import { Link } from "react-router";

export default function Button({className, children, path, disabled, type, onClick, toggle}) {
    if (disabled || type || !path) {
        return <button className={`button ${className ? className : ""}`} type={type || "button"} disabled={disabled} onClick={onClick}>{children}</button>;
    } else if (toggle && path) { // Handles links with showing/hiding elements based on mouse location
        return <Link className={`link ${className ? className : ""}`} to={path} onMouseEnter={toggle} onMouseLeave={toggle}>{children}</Link>
    } else if (path.includes("http")) {
        return <Link className={`link ${className ? className : ""}`} to={path} onClick={onClick} target="_blank" rel="noopener noreferrer">{children}</Link>;
    }
    
    // Default link
    return <Link className={`link ${className ? className : ""}`} to={path} onClick={onClick}>{children}</Link>;
}