import { useEffect } from "react";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../context/useDocumentTitle";

export default function Home() {
    useDocumentTitle();
    const {setHeading} = useHeading();

    useEffect(() => {
        setHeading("Welcome to MangaDB!");
    }, []);

    return (
        <>
            
            <p>Browse a massive library of manga, from the biggest hits to hidden gems. Get all the detailed info you need on any series, right at your fingertips.</p>
            <p>Log in or create an account to start your collection. Save your favorites and build a personal manga library with a single click.</p>
        </>
    );
}