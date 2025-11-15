import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getMangaInfo } from "../utils/apicalls";

export default function MangaInfo() {

    const { state, dispatch } = useAuth();
    const { id } = useParams();
    const [manga, setManga] = useState(null);

    useEffect(() => {
        async function getInfo() {
            const info = await getMangaInfo(id);
            setManga(info);
        }
        getInfo();
    }, [])

    const loaded = () => {}

    return (
        <>
            <h1>{manga ? manga.title : "Info on Manga"}</h1>
            {state && <Button onClick={() => dispatch({type: !state.favorites[id] ? "ADD_FAVORITE" : "REMOVE_FAVORITE", payload: {manga: {id: manga.id, title: manga.title, img: manga.img}}})}>{`${state.favorites[id] ? "Remove from" : "Add to"} Favorites`}</Button>}
            {manga ? loaded() : <h2 className="message">Loading manga info...</h2>}
        </>
    );
}