import { useEffect, useState } from "react";
import Button from "./Button";

export default function Legal() {

    const [hidden, setHidden] = useState(true);

    function showOverlay(isTerms) {
        setHidden(true);
    }

    useEffect(() => {
        const closeOverlay = (e) => {
            if (e.target === e.currentTarget) {
                setHidden(false);
            }
        }

        if (!hidden) {
            document.addEventListener("click", closeOverlay);
        }

        return () => document.removeEventListener("click", closeOverlay);
    }, [hidden])

    return (
        <>
            <div className="bottom-nav">
                <Button onClick={() => showOverlay(true)} className="nav-btn bottom-nav-link">Terms of Use</Button>
                <Button onClick={() => showOverlay(false)} className="nav-btn bottom-nav-link">Privacy Policy</Button>
                <Button path="https://docs.api.jikan.moe/" className="bottom-nav-link">Jikan API Docs</Button>
            </div>
            <div className="overlay">
                
            </div>
        </>
    );
}