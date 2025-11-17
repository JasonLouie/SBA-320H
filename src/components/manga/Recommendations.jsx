import { useEffect, useState } from "react";
import Details from "./Details";
import { getMangaRecommendations } from "../../utils/apiCalls";
import Carousel from "../Carousel";

export default function Recommendations({ id }) {
    const [mangaList, setMangaList] = useState(null);

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

    const loaded = () => mangaList.length > 0 ? <Carousel mangaList={mangaList} size="small"/> : <h2 className="message">No recommendations found.</h2>;

    return (
        <Details title="Recommended Manga" className="recommended">
            {mangaList ? loaded() : <h2 className="message">Finding recommendations...</h2>}
        </Details>
    );
}