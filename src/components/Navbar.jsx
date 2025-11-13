import { Link } from "react-router";

export default function Navbar({ top }) {
    return (
        <nav className={`${top ? "top" : "bottom"}-nav`}>
            <Link to="/" className={`${top ? "top" : "bottom"}-nav-link`}>MangaDB</Link>
            <Link to="/manga" className={`${top ? "top" : "bottom"}-nav-link`}>View Manga</Link>
            <Link to="/manga/search" className={`${top ? "top" : "bottom"}-nav-link`}>Search</Link>

        </nav>
    );
}