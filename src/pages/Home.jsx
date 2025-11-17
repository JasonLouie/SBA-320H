import { useEffect, useState } from "react";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Carousel from "../components/Carousel";
import { getTopFive } from "../utils/apiCalls";

export default function Home() {
    useDocumentTitle("Home");
    const { setHeading } = useHeading();
    const [mangaList, setMangaList] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const list = await getTopFive();
                setMangaList(list);
            } catch (err) {
                console.log(err);
                setMangaList([]);
            }
        }
        setHeading("Welcome to MangaDB!");
        getData();
    }, []);

    const loaded = () => mangaList.length > 0 ? <Carousel mangaList={mangaList} size="large"/> : <h2 className="message">No manga found.</h2>;

    return (
        <>
            {mangaList ? loaded() : <h2 className="message">Finding top 5 manga...</h2>}
            <div className="home-text">
                <p>Browse a massive library of manga, from the biggest hits to hidden gems. Get all the detailed info you need on any series, right at your fingertips.</p>
                <p>Log in or create an account to start your collection. Save your favorites and build a personal manga library with a single click.</p>
            </div>
        </>
    );
}