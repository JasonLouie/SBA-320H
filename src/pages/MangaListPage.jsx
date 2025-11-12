import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getMangaList } from "../apicalls";
import MangaResult from "../components/MangaResult";
import Button from "../components/Button";

export default function MangaListPage() {
    const [page, setPage] = useState(1);
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            const list = await getMangaList();
            setMangaList(list);
            setLoading(false);
        }

        try {
            initialize();
            
        } catch (err) {
            console.error(err);

        }
    }, [])

    const loaded = () => mangaList.length > 0 ? 
        <div className="manga-results">
            {mangaList.map(m => <MangaResult key={m.id} {...m}/>)}
            <div className="page-control">
                <Button classList="page-prev" path={`/manga?page=${page-1}`}>Previous</Button>
                <Button classList={`page-num ${page%3 === 0 ? "current" : ""}`} path="/manga">1</Button>
                <Button classList={`page-num ${page%3 === 1 ? "current" : ""}`} path="/manga?page=2">2</Button>
                <Button classList={`page-num ${page%3 === 2 ? "current" : ""}`} path="/manga?page=3">3</Button>
                <Button classList="page-next" path={`/manga?page=${page+1}`}>Next</Button>
            </div>
        </div>
        : <h2>No manga found.</h2>

    return (
        <>
            <h1>List of Manga</h1>
            {loading ? <h2>Retrieving manga...</h2> : loaded()}
            <Outlet />
        </>
    );
}