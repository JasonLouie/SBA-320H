import { useState } from "react";
import Button from "../Button";

export default function MangaRecommend({ id, title, img }) {

    const [hidden, setHidden] = useState(true);

    function toggleMangaInfo(e) {
        e.stopPropagation();
        if (e.currentTarget.contains(e.target)) {
            setHidden(e.type === "mouseleave");
        }
    }

    return (
        <div className="manga-recommendation">
            <Button path={`/manga/${id}`} toggle={toggleMangaInfo} className="img-link">
                <img className="manga-img small" src={img} alt={`Image of ${title}`} />
                <div className={`title-container ${hidden ? "hidden" : ""}`} inert={hidden}>
                    <p className="recommendation-title">{title}</p>
                </div>
            </Button>
        </div>
    );
}