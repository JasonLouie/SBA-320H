import { useState } from "react";
import Button from "./Button";
import Overlay from "./Overlay";

export default function Legal() {

    const [hidden, setHidden] = useState(true);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function showOverlay(e) {
        const btnText = e.target.textContent;
        setTitle(btnText);
        if (btnText === "Terms of Use") {
            setText("Some terms stuff");
        } else {
            setText("Some privacy stuff");
        }
        setHidden(false);
    }

    const closeOverlay = (e) => e.target === e.currentTarget && setHidden(true);

    return (
        <>
            <div className="bottom-nav">
                <Button onClick={showOverlay} className="nav-btn bottom-nav-link">Terms of Use</Button>
                <Button onClick={showOverlay} className="nav-btn bottom-nav-link">Privacy Policy</Button>
                <Button path="https://docs.api.jikan.moe/" className="bottom-nav-link">Jikan API Docs</Button>
            </div>
            <Overlay hidden={hidden} text={text} title={title} closeOverlay={closeOverlay} />
        </>
    );
}