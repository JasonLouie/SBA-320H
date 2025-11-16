import { useEffect } from "react";
import { useHeading } from "../context/HeadingContext";
import { useAuth } from "../context/AuthContext";
import defaultPicture from "/images/profile.png";
import "../styles/profile.css";

export default function Profile() {
    const { setHeading } = useHeading();
    const { state } = useAuth();

    useEffect(() => {
        setHeading("Profile");
    }, []);
    return (
        <div className="profile">
            <div className="profile-pic-container">
                <img className="profile-pic large" src={defaultPicture} alt="Default Profile Picture" />
            </div>
            <h2>Name: <span className="profile-field">{state.name}</span></h2>
            <h2>Username: <span className="profile-field">{state.username}</span></h2>
            <h2>Email: <span className="profile-field">{state.email}</span></h2>
            <h2>Number of Favorite Manga: <span className="profile-field">{Object.keys(state.favorites).length}</span></h2>
        </div>
    );
}