import { createContext, useContext, useState } from "react";

const HeadingContext = createContext();
export const useHeading = () => useContext(HeadingContext);

export default function HeadingProvider({ children }) {
    const [heading, setHeading] = useState("");
    return (
        <HeadingContext.Provider value={{ heading, setHeading }}>
            {children}
        </HeadingContext.Provider>
    );
}
