import InfoLabel from "./InfoLabel";

export default function Details({children, title, className}) {
    return (
        <div className={`details ${className ? className : ""}`}>
            <InfoLabel>{title}</InfoLabel>
            {children}
        </div>
    );
}