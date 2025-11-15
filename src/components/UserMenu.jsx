import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Button from "./Button";
import defaultPicture from "/images/profile.png";

export default function UserMenu() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);

    function handleLogout() {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    return (
        <>
            <p>{state.username}</p>
            <Button onClick={() => setHidden(!hidden)} className="show-menu-btn" ><img src={defaultPicture} className="profile-pic" alt="Default picture" /></Button>
            <div inert={hidden} className={`user-menu ${hidden ? "hidden" : ""}`}>
                <Button onClick={() => setHidden(!hidden)} className="user-menu-element" path="/favorites">Favorite Manga</Button>
                <Button onClick={() => setHidden(!hidden)} className="user-menu-element" path="/profile">Profile</Button>
                <Button className="user-menu-element logout-btn" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    );
}