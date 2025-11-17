import { useState } from "react";
import Button from "../Button";

export default function MangaCarouselItem({ id, title, img, size }) {

    const [hidden, setHidden] = useState(true);

    function toggleMangaInfo(e) {
        e.stopPropagation();
        if (e.currentTarget.contains(e.target)) {
            setHidden(e.type === "mouseleave");
        }
    }

    return (
        <div className={`carousel-item ${size}`}>
            <Button path={`/manga/${id}`} toggle={toggleMangaInfo} className="img-link">
                <img className={`manga-img-carousel`} src={img} alt={`Image of ${title}`} />
                <div className={`title-container ${hidden ? "hidden" : ""}`} inert={hidden}>
                    <p className={`recommendation-title ${size === "large" && size}`}>{title}</p>
                </div>
            </Button>
        </div>
    );
}