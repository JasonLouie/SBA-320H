import { useEffect, useState } from "react";
import { searchManga } from "../utils/apiCalls";
import { useSearchParams } from "react-router";
import "../styles/search.css";
import MangaResult from "../components/manga/MangaResult";
import PageController from "../components/PageController";
import Button from "../components/Button";
import { useHeading } from "../context/HeadingContext";

export default function MangaSearch() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const page = Number(searchParams.get("page")) || 1;

    const [input, setInput] = useState(query);
    const [maxPages, setMaxPages] = useState(null);
    const [mangaList, setMangaList] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (input) setSearchParams({ q: input, page: 1 });
    }

    async function handleSearch() {
        setLoading(true);
        try {
            const [results, max] = await searchManga(query, page);
            setMangaList(results);
            setMaxPages(max);
        } catch (err) {
            setMangaList([]);
            setMaxPages(0);
        } finally {
            setLoading(false);
        }

    }

    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("");
    }, []);

    useEffect(() => {
        if (query) {
            handleSearch();
        } else {
            setInput("");
            setMangaList(null);
        }
    }, [query, page]);

    function loaded() {
        if (!mangaList) {
            return <h2 className="message">Type something into the search bar to start searching!</h2>
        } else if (mangaList.length === 0) {
            return <h2 className="message">No manga found.</h2>;
        }
        return (
            <div className="manga-results">
                {mangaList.map(m => <MangaResult key={m.id} {...m} />)}
                <PageController page={page} maxPages={maxPages} route={`/manga/search?q=${query}`} />
            </div>
        );
    }

    return (
        <>
            <h1>Search for Manga</h1>
            <form className="manga-search" onSubmit={handleSubmit}>
                <input type="text" className="search" name="search" id="search" placeholder="Search Manga" value={input} onChange={(e) => setInput(e.target.value)} />
                <Button type="submit" className="search-btn" disabled={loading || !input}>Search</Button>
            </form>
            {loading ? <h2>Retrieving manga...</h2> : loaded()}
        </>
    );
}