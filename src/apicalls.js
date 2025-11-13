import axios from "axios";
import { filterMangaList } from "./utils/manga";

// Using axios to do calls
axios.defaults.headers.common['Content-Type'] = "application/json";

axios.defaults.baseURL = "https://api.jikan.moe/v4";

// Request interceptor
axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.start_time = new Date();

    console.log(`Request sent at: ${request.metadata.start_time.toLocaleTimeString("en-US")}`);
    document.body.style.cursor = "progress";
    return request;
});

// Response interceptor
axios.interceptors.response.use(function onFullfilled(response) {
    document.body.style.removeProperty("cursor");

    // Calculate how long the request took
    const timeElapsed = new Date().getTime() - response.config.metadata.start_time.getTime();
    console.log(`Request took ${timeElapsed} ms.`);
    return response;
});

// By default, show top manga
export async function getMangaList(page) {
    const response = await axios.get(`/manga?type=manga&min_score=8&order_by=favorites&sfw&sort=desc&limit=24&page=${page}`);
    return filterMangaList(response.data);
}

export async function searchManga(query, page) {
    const response = await axios.get(`/manga?type=manga&order_by=favorites&sfw&sort=desc&limit=24&q=${query}&page=${page}`);
    return filterMangaList(response.data);
}

export async function getMangaInfo(mangaId) {
    const response = await axios.get(`/manga/${mangaId}`);
    return response.data;
}

export async function getMangaCharacters(mangaId) {
    const response = await axios.get(`/manga/${mangaId}/characters`);
    return response.data;
}

export async function getMangaCharacterFullInfo(characterId) {
    const response = await axios.get(`/characters/${characterId}/full`);
    return response.data;
}