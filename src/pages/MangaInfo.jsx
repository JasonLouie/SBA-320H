import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMangaInfo } from "../utils/apicalls";

export default function MangaInfo() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);

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
            <h1>{manga ? manga.title : "Info on Manga"}</h1>
            {manga ? loaded() : <h2 className="message">Loading manga info...</h2>}
        </>
    );
}