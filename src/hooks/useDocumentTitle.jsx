import {useEffect } from "react";

const defaultTitle = "MangaDB";

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
    }, [title])
}