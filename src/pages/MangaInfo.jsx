import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMangaInfo } from "../utils/apiCalls";
import Info from "../components/manga/Info";
import Sidebar from "../components/manga/Sidebar";
import "../styles/mangaInfo.css";
import { useHeading } from "../context/HeadingContext";

export default function MangaInfo() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);

    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading(manga?.title || "");
    }, [manga]);

    useEffect(() => {
        async function getInfo() {
            try {
                const info = await getMangaInfo(id);
                setManga(info);
            } catch (err) {
                console.log(err);
                setManga({});
            }
        }
        getInfo();
    }, [])

    const loaded = () => Object.keys(manga).length > 0 ?
        <div className="manga-info">
            <Info manga={manga} />
            <Sidebar manga={manga} />
        </div> : <h2 className="message">No manga info.</h2>

    return (
        <>
            {manga ? loaded() : <h2 className="message">Loading manga info...</h2>}
        </>
    );
}