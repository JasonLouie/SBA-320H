// Functions to filter out data from API calls

// Filters API response for general manga queries (homepage top 5, top manga, and search) and returns the filtered list and max pages
export function filterMangaList(mangaList, pages=true) {
    const filteredMangaList = mangaList.data.map(m => ({
        id: m.mal_id,
        title: m.title_english || m.title,
        img: m.images.jpg.image_url
    }))
    return pages ? [filteredMangaList, mangaList.pagination.last_visible_page] : filteredMangaList;
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

// Filters out at most 30 manga from the recommended list
export function filterRecommendedManga(mangaList) {
    const length = mangaList.length > 30 ? 30 : mangaList.length;
    return mangaList.slice(0, length).map(m => ({
        id: m.entry.mal_id,
        title: m.entry.title,
        img: m.entry.images.jpg.image_url
    }));
}