import { useEffect, useState } from "react";
import { searchManga } from "../apicalls";
import { useSearchParams } from "react-router";
import "../styles/search.css";
import MangaResult from "../components/MangaResult";
import PageController from "../components/PageController";
import Button from "../components/Button";

export default function MangaSearch() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const page = Number(searchParams.get("page")) || 1;

    const [maxPages, setMaxPages] = useState(null);
    const [mangaList, setMangaList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState(query);

    async function handleSubmit(e) {
        e.preventDefault();
        if (input) setSearchParams({ q: input, page: 1 });
        await handleSearch();
    }

    async function handleSearch() {
        if (input) {
            setLoading(true);
            const [results, max] = await searchManga(input, page);
            if (max < page) {
                setLoading(false);
                return;
            }
            setMangaList(results);
            setMaxPages(max);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (query) {
            handleSearch();
        }
    }, [page]);

    function loaded() {
        if (!mangaList) {
            return <h2 className="message">Type something into the search bar to start searching!</h2>
        } else if (mangaList.length === 0) {
            return <h2 className="message">No manga found.</h2>;
        }
        return (
            <div className="manga-results">
                {mangaList.map(m => <MangaResult key={m.id} {...m} />)}
                <PageController page={page} maxPages={maxPages} route={`/manga/search?q=${input}`} />
            </div>
        );
    }

    return (
        <>
            <h1>Manga Search Page</h1>
            <form className="manga-search" onSubmit={handleSubmit}>
                <input type="text" className="search" name="search" id="search" placeholder="Search Manga" value={input} onChange={(e) => setInput(e.target.value)} />
                <Button type="submit" className="search-btn">Search</Button>
            </form>
            {loading ? <h2>Retrieving manga...</h2> : loaded()}
        </>
    );
}