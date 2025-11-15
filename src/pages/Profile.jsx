import { useEffect } from "react";
import { useHeading } from "../context/HeadingContext";

export default function Profile() {
    const { setHeading } = useHeading();

    useEffect(() => {
        setHeading("Profile");
    }, []);
    return (
        <>
            <p>Details</p>
        </>
    );
}