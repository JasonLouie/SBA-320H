import { useState } from "react";
import "../../styles/mangaResult.css";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";

export default function MangaResult({ id, title, img }) {

    const {state, dispatch} = useAuth();
    const [hidden, setHidden] = useState(true);

    function toggleHeart(e) {
        e.stopPropagation();
        if (e.currentTarget.contains(e.target)) {
            setHidden(e.type === "mouseleave");
        }
    }

    function handleFavorite(e) {
        e.stopPropagation();
        e.preventDefault();
        dispatch({type: !state.favorites[id] ? "ADD_FAVORITE" : "REMOVE_FAVORITE", payload: {id, title, img}});
    }

    // Manga that is not complete have null chapters and volumes
    return (
        <div className="manga">
            <Button path={`/manga/${id}`} toggle={toggleHeart} >
                <img className="manga-img" src={img} alt={`Image of ${title}`} />
                {state && <img className={`heart ${hidden ? "hidden" : ""}`} src={`/images/${!state.favorites[id] ? "not-" : ""}favorite.png`} alt="heart" onClick={handleFavorite}/>}
            </Button>
            <p className="title">{title}</p>
        </div>
    );
}