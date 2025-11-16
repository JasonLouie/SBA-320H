import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import UserMenu from "./UserMenu";
import "../styles/navbar.css";

export default function Navbar({ top }) {

    const { state } = useAuth();

    const showLoginSignUp = () =>
        <div className="nav-container">
            {!state ?
                <>
                    <Button path="/login" className="login auth-btn">Login</Button>
                    <Button path="/signup" className="signup auth-btn">Sign Up</Button>
                </>
                :
                <UserMenu />
            }
        </div>

    return (
        <nav className={`${top ? "top" : "bottom"}-nav`}>
            <Button path="/" className={`${top ? "top" : "bottom"}-nav-link`}>MangaDB</Button>
            <Button path="/manga" className={`${top ? "top" : "bottom"}-nav-link`}>Top Manga</Button>
            <Button path="/manga/search" className={`${top ? "top" : "bottom"}-nav-link`}>Search</Button>
            {top && showLoginSignUp()}
        </nav>
    );
}