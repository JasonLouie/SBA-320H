import { useEffect } from "react";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../context/useDocumentTitle";

export default function NoMatch() {
    useDocumentTitle("404 Not Found");
    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("");
    }, []);

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2 className="message">Page not found</h2>
        </div>
    );
}