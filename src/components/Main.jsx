import { useHeading } from "../context/HeadingContext";

export default function Main({ children }) {
    const {heading} = useHeading();
    return (
        <main>
            {heading && <h1 className="page-heading">{heading}</h1>}
            <div className="content">{children}</div>
        </main>
    );
}