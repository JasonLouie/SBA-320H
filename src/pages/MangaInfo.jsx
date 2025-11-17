import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMangaInfo } from "../utils/apiCalls";
import Info from "../components/manga/Info";
import Sidebar from "../components/manga/Sidebar";
import "../styles/mangaInfo.css";
import { useHeading } from "../context/HeadingContext";
import Recommended from "../components/manga/Recommendations";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function MangaInfo() {
    const { id } = useParams();
    const [manga, setManga] = useState({});
    const [loading, setLoading] = useState(true);
    const { setHeading } = useHeading();

    useDocumentTitle(`${manga.title}`);

    useEffect(() => {
        setHeading(manga?.title || "");
    }, [manga]);

    useEffect(() => {
        async function getInfo() {
            try {
                setLoading(true);
                const info = await getMangaInfo(id);
                setManga(info);
            } catch (err) {
                console.log(err);
                setManga({});
            } finally {
                setLoading(false);
            }
        }
        getInfo();
    }, [id]);

    const loaded = () => Object.keys(manga).length > 0 ?
        <>
            <div className="manga-info">
                <Info manga={manga} />
                <Sidebar manga={manga} />
            </div>
            <Recommended id={manga.id} />
        </>
        : <h2 className="message">No manga info.</h2>

    return (
        <>
            {!loading ? loaded() : <h2 className="message">Loading manga info...</h2>}
        </>
    );
}