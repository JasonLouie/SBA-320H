import InfoLabel from "./InfoLabel";

export default function Details({children, title}) {
    return (
        <div className="details">
            <InfoLabel>{title}</InfoLabel>
            {children}
        </div>
    );
}