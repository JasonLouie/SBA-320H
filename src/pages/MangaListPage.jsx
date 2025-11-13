import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getMangaList } from "../apicalls";
import MangaResult from "../components/MangaResult";
import PageController from "../components/PageController";

export default function MangaListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get("page")) || 1;

    const [maxPages, setMaxPages] = useState(null);
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            setLoading(true);
            const [list, max] = await getMangaList(page);
            if (max < page) {
                setLoading(false);
                return;
            }
            setMangaList(list);
            setMaxPages(max);
            setLoading(false);
        }

        try {
            initialize();

        } catch (err) {
            console.error(err);

        }
    }, [page]);

    const loaded = () => mangaList.length > 0 ?
        <div className="manga-results">
            {mangaList.map(m => <MangaResult key={m.id} {...m} />)}
            <PageController page={page} maxPages={maxPages} route="/manga" />
        </div>
        : <h2>No manga found.</h2>

    return (
        <>
            <h1>List of Popular Manga</h1>
            {loading ? <h2>Retrieving manga...</h2> : loaded()}
            <Outlet />
        </>
    );
}