import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ top }) {

    const {state, dispatch} = useAuth();

    const showLoginSignUp = () => !state ?
        <>
            <Link to="/signup" className="signup">Sign Up</Link> 
            <Link to="/login" className="login">Login</Link> 
        </> : 
        <div>
            <button className="logout-btn" onClick={() => dispatch({type: "LOGOUT"})}>Log Out</button> 
        </div>;

    return (
        <nav className={`${top ? "top" : "bottom"}-nav`}>
            <Link to="/" className={`${top ? "top" : "bottom"}-nav-link`}>MangaDB</Link>
            <Link to="/manga" className={`${top ? "top" : "bottom"}-nav-link`}>View Manga</Link>
            <Link to="/manga/search" className={`${top ? "top" : "bottom"}-nav-link`}>Search</Link>
            {top && showLoginSignUp()}
        </nav>
    );
}