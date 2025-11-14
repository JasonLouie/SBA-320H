import { useState } from "react";
import "../styles/manga-result.css";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function MangaResult({ id, title, img }) {

    const {state, dispatch} = useAuth();
    const [hidden, setHidden] = useState(true);

    function handleMangaInfo(e, value) {
        e.stopPropagation();
        if (e.currentTarget.contains(e.target)) {
            setHidden(value);
        }
    }

    function handleFavorite(e) {
        e.stopPropagation();
        e.preventDefault();
        dispatch({type: !state.favorites[id] ? "ADD_FAVORITE" : "REMOVE_FAVORITE", payload: {manga: {id, title, img}}})
    }

    // Manga that is not complete have null chapters and volumes
    return (
        <div className="manga">
            <Link to={`/manga/${id}`} onMouseEnter={(e) => handleMangaInfo(e, false)} onMouseLeave={(e) => handleMangaInfo(e, true)}>
                <img className="manga-img" src={img} alt={`Image of ${title}`} />
                {state && <img className={`heart ${hidden ? "hidden" : ""}`} src={`/images/${!state.favorites[id] ? "not-" : ""}favorite.png`} alt="heart" onClick={handleFavorite}/>}
            </Link>
            <p className="title">{title}</p>
        </div>
    );
}