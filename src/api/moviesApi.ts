import { API_KEY, BASE_URL } from "@/constants/constants";
import { fetchApi } from "@/api/api";
import type { Movies, MovieDetails } from "@/types/types";

export const searchMovies = (
  userQuery: string,
  page: number = 1,
): Promise<Movies> => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(userQuery)}&page=${page}`;

  return fetchApi<Movies>(url, "Failed to fetch movies");
};

export const getTrendingMovies = (
  selectedPeriod: "week" | "day",
  page: number = 1,
): Promise<Movies> => {
  const url = `${BASE_URL}/trending/movie/${selectedPeriod}?api_key=${API_KEY}&page=${page}`;

  return fetchApi<Movies>(url, "Failed to fetch trending movies");
};

export const getTopRatedMovies = (page: number = 1): Promise<Movies> => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;

  return fetchApi<Movies>(url, "Failed to fetch top rated movies");
};

export const getDiscoverMovies = (
  genres: string,
  sort: string,
  page: number = 1,
): Promise<Movies> => {
  const today = new Date().toISOString().split("T")[0];

  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres}&sort_by=${sort}&primary_release_date.lte=${today}&page=${page}`;

  return fetchApi<Movies>(url, "Failed to fetch discover movies");
};

export const getMovieDetails = (id: number): Promise<MovieDetails> => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,reviews,recommendations,videos`;

  return fetchApi<MovieDetails>(url, "Failed to fetch movie details");
};

export const getNowPlayingMovies = (): Promise<Movies> => {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;

  return fetchApi<Movies>(url, "Failed to fetch now playing movies");
};

export const getPopularMovies = (): Promise<Movies> => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  return fetchApi<Movies>(url, "Failed to fetch popular movies");
};
