import { Link } from "react-router";

export default function Button({classList, children, path, disabled}) {
    return (
        <>
            {disabled ? <button className={classList} disabled={disabled}>{children}</button> : <Link className={classList} to={path}>{children}</Link>}
        </>
    );
}