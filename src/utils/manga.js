// Functions to filter out data from API calls

// Filters API response for the top 25 anime to display for the /manga route
export function filterMangaList(mangaList) {
    return [mangaList.data.map(m => ({
        id: m.mal_id,
        title: m.title_english || m.title,
        img: m.images.jpg.image_url
    })), mangaList.pagination.last_visible_page];
}

// Filters API response for the particular anime to display for the /manga/:id route
export function filterMangaInfo(manga) {
    return {
        id: manga.mal_id,
        title: manga.title_english || manga.title,
        img: manga.images.jpg.image_url,
        status: manga.status,
        summary: manga.synopsis,
        authors: manga.authors.map(a => a.name),
        background: manga.background,
        published: manga.published.string,
        chapters: manga.chapters || "?",
        volumes: manga.volumes || "?",
        score: manga.score,
        genres: manga.genres.map(g => g.name),
        type: manga.type
    }
}


// Filters API response for ...