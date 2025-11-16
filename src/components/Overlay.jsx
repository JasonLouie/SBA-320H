export default function Overlay({ hidden, text, title, closeOverlay }) {
    return (
        <div inert={hidden} className={`overlay ${hidden ? "hidden" : ""}`} onClick={closeOverlay}>
            <div className="message-container">
                <h2 className="message-title">{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}