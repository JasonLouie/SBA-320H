import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import defaultPicture from "/images/profile.png";

export default function UserMenu() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);
    const divRef = useRef(null);

    function handleLogout() {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    const closeMenu = (e) => {
        if (divRef.current && !divRef.current.contains(e.target)) setHidden(true);
    }

    useEffect(() => {
        if (!hidden && divRef.current) document.body.addEventListener("click", closeMenu);
        else document.body.removeEventListener("click", closeMenu);
        // Clean up for logging out
        return () => document.body.removeEventListener("click", closeMenu);
    }, [hidden]);

    return (
        <>
            <p>Hello, {state.username}</p>
            <div onClick={() => setHidden(!hidden) } ref={divRef} className="menu-container">
                <Button className="show-menu-btn" ><img src={defaultPicture} className="profile-pic" alt="Default picture" /></Button>
                <div inert={hidden} className={`user-menu ${hidden ? "hidden" : ""}`} >
                    <Button className="user-menu-element" path="/favorites">Favorite Manga</Button>
                    <Button className="user-menu-element" path="/profile">Profile</Button>
                    <Button className="user-menu-element logout-btn" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </>
    );
}