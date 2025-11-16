import { useEffect, useRef, useState } from "react";
import Details from "./Details";
import MangaRecommend from "./MangaRecommend";
import { getMangaRecommendations } from "../../utils/apiCalls";
import Button from "../Button";

export default function Recommendations({ id }) {
    const [mangaList, setMangaList] = useState(null);
    const containerRef = useRef(null);
    const scrollLength = 600;

    function slide(isLeft) {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: isLeft ? -1 * scrollLength : scrollLength,
                behavior: "smooth"
            });
        }
    }

    useEffect(() => {
        async function getRecommendations() {
            try {
                const recommendations = await getMangaRecommendations(id);
                setMangaList(recommendations);
            } catch (err) {
                console.log(err);
                setMangaList([]);
            }
        }

        if (id) {
            getRecommendations();
        }
    }, [id]);

    const loaded = () => mangaList.length > 0 ? mangaList.map(m => <MangaRecommend key={m.id} {...m} />) : <h2 className="message">No recommendations found.</h2>;

    return (
        <Details title="Recommended Manga" className="recommended">
            <Button className="carousel-btn carousel-next" onClick={() => slide(true)}><span className="arrow arrow-next"></span></Button>
            <Button className="carousel-btn carousel-prev" onClick={() => slide(false)}><span className="arrow arrow-prev"></span></Button>
            <div className="manga-container" ref={containerRef}>
                {mangaList ? loaded() : <h2 className="message">Finding recommendations...</h2>}
            </div>
        </Details>
    )
}