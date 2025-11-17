import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getTopManga } from "../utils/apiCalls";
import MangaResult from "../components/manga/MangaResult";
import PageController from "../components/PageController";
import { useHeading } from "../context/HeadingContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function TopManga() {
    useDocumentTitle("Top Manga");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get("page")) || 1;

    const [maxPages, setMaxPages] = useState(null);
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("Top Manga");
    }, []);

    useEffect(() => {
        async function getPopularManga() {
            setLoading(true);
            try {
                const [list, max] = await getTopManga(page);
                setMangaList(list);
                setMaxPages(max);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getPopularManga();
    }, [page]);

    const loaded = () => mangaList.length > 0 ?
        <div className="manga-results">
            {mangaList.map(m => <MangaResult key={m.id} {...m} />)}
            <PageController page={page} maxPages={maxPages} route="/manga" />
        </div>
        : <h2>No manga found.</h2>

    return (
        <>
            {loading ? <h2>Retrieving manga...</h2> : loaded()}
            <Outlet />
        </>
    );
}