import { useState } from "react";
import "../styles/manga-result.css";
import { Link } from "react-router";

export default function MangaResult({ id, title, img, status, published, score, genres }) {

    const [hidden, setHidden] = useState(true);

    function handleMangaInfo(e, value) {
        e.stopPropagation();
        if (e.currentTarget.contains(e.target)) {
            console.log(!value ? "Hovering over image" : "Exited image");
            setHidden(value);
        }
    }

    // Manga that is not complete have null chapters and volumes
    return (
        <div className="manga">
            <Link to={`/manga/${id}`} onMouseEnter={(e) => handleMangaInfo(e, false)} onMouseLeave={(e) => handleMangaInfo(e, true)}>
                <img className="manga-img" src={img} alt={`Image of ${title}`} />
                
                <div className={`manga-info ${hidden ? "hidden" : ""}`}>
                    <p className="info">Hello</p>
                </div>
            </Link>
            <p className="title">{title}</p>
        </div>
    );
}