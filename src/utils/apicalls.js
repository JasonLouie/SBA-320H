import mangaApi from "../config/mangaApi";
import { filterMangaInfo, filterMangaList, filterRecommendedManga } from "./manga";

export async function getTopFive() {
    const response = await mangaApi.get(`/manga?min_score=8&order_by=popularity&sfw&limit=5`);
    return filterMangaList(response.data);
}

export async function getTopManga(page) {
    const response = await mangaApi.get(`/manga?min_score=8&order_by=popularity&sfw&limit=24&page=${page}`);
    return filterMangaList(response.data);
}

export async function searchManga(query, page) {
    const response = await mangaApi.get(`/manga?order_by=title&sfw&sort=desc&limit=24&q=${query}&page=${page}`);
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
    const response = await mangaApi.get(`/manga/${mangaId}/recommendations`);
    return filterRecommendedManga(response.data.data);
}