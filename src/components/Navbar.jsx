import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import defaultPicture from "/images/profile.png";
import Button from "./Button";

export default function Navbar({ top }) {

    const { state, dispatch } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    function showUserMenu() {

    }

    const loggedIn = () =>
        <div>
            <Button onClick={showUserMenu} classList="user-menu"><img src={defaultPicture} className="profile-pic" alt="Default picture" /></Button>
            <Button classList="logout-btn" onClick={handleLogout}>Log Out</Button>
            <Button path="/favorites">Favorite Manga</Button>
            <Button path="/profile">Profile</Button>
        </div>;

    const showLoginSignUp = () => !state ?
        <>
            <Button path="/signup" classList="signup">Sign Up</Button>
            <Button path="/login" classList="login">Login</Button>
        </> :
        loggedIn();

    return (
        <nav className={`${top ? "top" : "bottom"}-nav`}>
            <Button path="/" classList={`${top ? "top" : "bottom"}-nav-link`}>MangaDB</Button>
            <Button path="/manga" classList={`${top ? "top" : "bottom"}-nav-link`}>View Manga</Button>
            <Button path="/manga/search" classList={`${top ? "top" : "bottom"}-nav-link`}>Search</Button>
            {top && showLoginSignUp()}
        </nav>
    );
}