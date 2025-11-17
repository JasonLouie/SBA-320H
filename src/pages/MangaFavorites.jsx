import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import MangaResult from "../components/manga/MangaResult";
import PageController from "../components/PageController";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function MangaFavorites() {
    const { setHeading } = useHeading();
    const { state } = useAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get("page")) || 1;
    const getMangaIds = () => Object.keys(state.favorites).slice(24 * (page - 1), 24 * page);
    const [mangaIds, setMangaIds] = useState(getMangaIds());
    useDocumentTitle(`${state.username}'s Favorites`);


    const loaded = () => mangaIds.length > 0 ?
        <div className="manga-results">
            {mangaIds.map(m => <MangaResult key={m} {...state.favorites[m]} />)}
            <PageController page={page} maxPages={Math.ceil(Object.keys(state.favorites).length / 24)} route="/favorites" />
        </div>
        : <h2 className="message">You don't have any favorites yet. Start exploring and click the heart on any manga to favorite it!</h2>

    useEffect(() => {
        setHeading("Favorite Manga");
    }, []);

    useEffect(() => {
        if (state) {
            setMangaIds(getMangaIds());
        }
    }, [state, page]);

    return (
        <>
            {loaded()}
        </>
    );
}