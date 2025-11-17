import { useState } from "react";
import Button from "./Button";
import Overlay from "./Overlay";

const terms = "This Service is a non-commercial portfolio project created for demonstration purposes. It allows users to browse manga-related information provided by the public Jikan API. All data, images, and synopses are provided by the Jikan API. The Service does not own and is not responsible for the accuracy, availability, or content of this third-party data. All content belongs to its respective copyright holders.";
const privacy = "This application is a front-end-only project. There is no backend server or database. Personal information is not collectd, stored, or shared on any server. When you create an account, your username, email, and list of favorited manga are stored in a file in your web browser's storage on your own device. For your safety, please do not use a real-world password that you use for any other service.";

export default function Legal() {

    const [hidden, setHidden] = useState(true);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function showOverlay(e) {
        const btnText = e.target.textContent;
        setTitle(btnText);
        setText(btnText === "Terms of Use" ? terms : privacy);
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