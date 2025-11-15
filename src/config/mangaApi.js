import axios from "axios";

const mangaApi = axios.create({
    baseURL: "https://api.jikan.moe/v4",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor
mangaApi.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.start_time = new Date();
    document.body.style.cursor = "progress";
    return request;
});

// Response interceptor
mangaApi.interceptors.response.use(function onFullfilled(response) {
    document.body.style.removeProperty("cursor");

    // Calculate how long the request took
    const timeElapsed = new Date().getTime() - response.config.metadata.start_time.getTime();
    console.log(`Request took ${timeElapsed} ms.`);
    return response;
});

export default mangaApi;