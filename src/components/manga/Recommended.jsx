import { useEffect, useState } from "react";
import Details from "./Details";

export default function Recommended({id}) {
    const [mangaList, setMangaList] = useState(null);

    useEffect(() => {


        if (id) {

        }
    }, [id])

    return (
        <Details title="Recommended Manga">
            
        </Details>
    )
}