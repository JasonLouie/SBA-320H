import mangaApi from "../config/mangaApi";
import { filterMangaInfo, filterMangaList } from "./manga";

// By default, show top manga
export async function getMangaList(page) {
    const response = await mangaApi.get(`/manga?min_score=8&order_by=favorites&sfw&sort=desc&limit=24&page=${page}`);
    return filterMangaList(response.data);
}

export async function searchManga(query, page) {
    const response = await mangaApi.get(`/manga?min_score=5&order_by=favorites&sfw&sort=desc&limit=24&q=${query}&page=${page}`);
    return filterMangaList(response.data);
}

export async function getMangaInfo(mangaId) {
    const response = await mangaApi.get(`/manga/${mangaId}/full`);
    return filterMangaInfo(response.data.data);
}

export async function getMangaCharacters(mangaId) {
    const response = await mangaApi.get(`/manga/${mangaId}/characters`);
    return response.data;
}

export async function getMangaRecommendations(mangaId) {
    const response = await mangaApi.get(`/manga/${mangaId}/recommendations?limit=5`);
    return filterMangaList(response.data);
}