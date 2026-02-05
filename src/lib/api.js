
// export const ENDPOINT = {
//     // auth (Backend: app.use("/api/auth", AuthRouter))
//     login: "/api/auth/login",
//     signup: "/api/auth/signup",
//     logout: "/api/auth/logout",
//     forgetpassword: "/api/auth/forgetpassword",
//     resetPassword: "/api/auth/resetPassword",

//     // discover (Backend: app.use("/api/discover", DiscoverRouter))
//     discoverNowPlaying: "/api/discover/now-playing",
//     discoverTrending: "/api/discover/trending",
//     discoverTopRated: "/api/discover/top-rated",
//     discoverUpcoming: "/api/discover/upcoming",

//     // movies (Backend: app.use("/api/movies", MovieRouter)) - YE SAHI HAI
//     fetchActionMovies: `/api/movies/action`,
//     fetchComedyMovies: `/api/movies/comedy`,
//     fetchHorrorMovies: `/api/movies/horror`,
//     fetchRomanceMovies: `/api/movies/romance`,
//     fetchAnimeMovies: `/api/movies/anime`,

//     // tv shows (Backend: app.use("/api/tv", TvShowsRouter)) - YE SAHI HAI
//     fetchActionTvShows: `/api/tv/action`,
//     fetchComedyTvShows: `/api/tv/comedy`,
//     fetchCrimeTvShows: `/api/tv/crime`,
//     fetchDramaTvShows: `/api/tv/drama`,
//     fetchMysteryTvShows: `/api/tv/mystery`,

//     // extra data 
//     getMovieDetails: (id) => `/api/movies/details?id=${id}`,
//     getTvShowsDetails: (id) => `/api/tv/details?id=${id}`,

//     // user (Backend: app.use("/api/user", UserRouter))
//     user: "/api/user",
//     addToWishlist: "/api/user/wishlist",
//     getWishlist: "/api/user/wishlist",

//     // payment (Backend: app.use("/api/payment", PaymentRouter))
//     payment: "/api/payment/order",
//     updatePremium: "/api/payment/update-premium-access",

//     // streaming urls (Backend: app.use("/api/video", VideoRouter))
//     fetchAllStreamingVideos: `/api/video`,
//     fetchStreamingVideo: (id) => `/api/video?id=${id}`,
//     fetchVideoThumbnail: (id) => `/api/video/thumbnail?videoId=${id}`,
// }

// export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

// // export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// // Is line ko aise badal dein
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://jio-cinema-backend-9.onrender.com";
// export const api = axios.create({
//     baseURL:  process.env.NEXT_PUBLIC_API_URL || "https://jio-cinema-backend-9.onrender.com",
//     // credentials
//     withCredentials: true,
// });

// export function getWatchUrl(vidId, mediaType, poster_path) {
//     const prefix = mediaType === "tv" ? "tv" : "movies";
//     return `${prefix}/watch?id=${vidId}&poster_path=${poster_path}`;
// }

// export const getStreamingVideoThumbnail = (id) =>
//     API_BASE_URL + ENDPOINT.fetchVideoThumbnail(id);
import axios from "axios";

// 1. Base URL ko ek hi jagah define karein taaki confusion na ho
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jio-cinema-backend-9.onrender.com";

export const ENDPOINT = {
    // auth
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    user: "/api/user",
    logout: "/api/auth/logout",
    forgetpassword: "/api/auth/forgetpassword",
    resetPassword: "/api/auth/resetPassword",

    //discover
    discoverNowPlaying: "/api/discover/now-playing",
    discoverTrending: "/api/discover/trending",
    discoverTopRated: "/api/discover/top-rated",
    discoverUpcoming: "/api/discover/upcoming",

    // movies
    fetchActionMovies: `/api/movies/action`,
    fetchComedyMovies: `/api/movies/comedy`,
    fetchHorrorMovies: `/api/movies/horror`,
    fetchRomanceMovies: `/api/movies/romance`,
    fetchAnimeMovies: `/api/movies/anime`,

    //tv shows
    fetchActionTvShows: `/api/tv/action`,
    fetchComedyTvShows: `/api/tv/comedy`,
    fetchCrimeTvShows: `/api/tv/crime`,
    fetchDramaTvShows: `/api/tv/drama`,
    fetchMysteryTvShows: `/api/tv/mystery`,

    //extra data 
    getMovieDetails: (id) => `/api/movies/details?id=${id}`,
    getTvShowsDetails: (id) => `/api/tv/details?id=${id}`,

    //user functionality
    addToWishlist: "/api/user/wishlist",
    getWishlist: "/api/user/wishlist",

    //payment
    payment: "/api/payment/order",
    updatePremium: "/api/payment/update-premium-access",

    // streaming
    fetchAllStreamingVideos: `/api/video`,
    fetchStreamingVideo: (id) => `/api/video?id=${id}`,
    fetchVideoThumbnail: (id) => `/api/video/thumbnail?videoId=${id}`,
}

export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

// Thumbnail ke liye direct BASE_URL use karein
export const getStreamingVideoThumbnail = (id) => BASE_URL + ENDPOINT.fetchVideoThumbnail(id);

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export function getWatchUrl(vidId, mediaType, poster_path) {
    const prefix = mediaType === "tv" ? "tv" : "movies";
    return `${prefix}/watch?id=${vidId}&poster_path=${poster_path}`;
}