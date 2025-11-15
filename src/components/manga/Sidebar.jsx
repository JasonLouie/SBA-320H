import { useAuth } from "../../context/AuthContext";
import Button from "../Button";
import Details from "./Details";

export default function Sidebar({ manga }) {
    const { state, dispatch } = useAuth();

    return (
        <div className="sidebar">
            <img src={manga.img} alt="" />
            {state && <Button className="info-favorite-btn" onClick={() => dispatch({ type: !state.favorites[manga.id] ? "ADD_FAVORITE" : "REMOVE_FAVORITE", payload: { id: manga.id, title: manga.title, img: manga.img } })}>{`${state.favorites[manga.id] ? "Remove from" : "Add to"} Favorites`}</Button>}
            <Details title="Information">
                {["score", "status", "published", "type", "chapters", "volumes"].map(key => <p key={key} className="detail">{`${key[0].toUpperCase() + key.slice(1)}: ${manga[key]}`}</p>)}
            </Details>
            <Details title="Genres">
                <div className="sub-details">
                    {manga.genres.map(g => <span key={g} className="sub-detail">{g}</span>)}
                </div>
            </Details>
            <Details title="Authors">
                <div className="sub-details">
                    {manga.authors.map(a => <span key={a} className="sub-detail">{a}</span>)}
                </div>
            </Details>
        </div>
    );
}