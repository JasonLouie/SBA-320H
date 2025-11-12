// Functions to filter out data from API calls

// Filters API response for the top 25 anime to display for the /manga route
export function filterMangaList(data) {
    return data.map(m => {
        const mangaInfo = {
            id: m.mal_id,
            title: m.title_english || m.title,
            img: m.images.jpg.image_url,
            status: m.status,
            published: m.published.string,
            chapters: m.chapters,
            volumes: m.volumes,
            score: m.score,
            genres: m.genres.map(g => g.name)
        };
        return mangaInfo;
    });
}

// Filters API response for the particular anime to display for the /manga/:id route
export function filterMangaInfo(data) {

}


// Filters API response for ...