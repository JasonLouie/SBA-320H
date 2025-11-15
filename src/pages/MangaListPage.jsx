import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getMangaList } from "../utils/apiCalls";
import MangaResult from "../components/manga/MangaResult";
import PageController from "../components/PageController";
import { useHeading } from "../context/HeadingContext";

export default function MangaListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get("page")) || 1;

    const [maxPages, setMaxPages] = useState(null);
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("List of Popular Manga");
    }, []);

    useEffect(() => {
        async function getPopularManga() {
            setLoading(true);
            try {
                const [list, max] = await getMangaList(page);
                setMangaList(list);
                setMaxPages(max);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
                setMaxPages(0);
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