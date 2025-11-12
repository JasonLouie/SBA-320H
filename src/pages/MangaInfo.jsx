import { useParams } from "react-router";

export default function MangaInfo() {

    const { id } = useParams();

    return (
        <>
            <h1>Info on Specific Manga</h1>
        </>
    );
}