import Details from "./Details";

export default function Info({ manga }) {
    return (
        <div className="main-info">
            <Details title="Summary">
                <p className="main-detail">{manga.summary}</p>
            </Details>
            <Details title="Background">
                <p className="main-detail">{manga.background}</p>
            </Details>
        </div>
    );
}